import React from 'react';
import Button from '../Buttons/index';

const largeColumn = {
    width: '40%',
  }
  
const midColumn = {
width: '30%',
}

const smallColumn = {
width: '10%'
}


const Table = ({ list, onDismiss }) => (
<div className="table">
    {list.map(item =>
    <div key={item.objectID} className="table-row">
        <span style={{width: '40%' }}>
        <a href={item.url}>{item.title}</a>
        </span>
        <span style={largeColumn}>{item.author}</span>
        <span style={midColumn}>{item.num_comments}</span>
        <span style={smallColumn}>{item.points}</span>
        <span style={smallColumn}>
        <Button
            onClick={() => onDismiss(item.objectID)} className="button-inline">
            Dismiss
        </Button>
        </span>
    </div>
    )}
</div>
)

export default Table