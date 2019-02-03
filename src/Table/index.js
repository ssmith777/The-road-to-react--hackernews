import React, {Component} from 'react';
import Button from '../Buttons/index';
import './index.css';
import PropTypes from 'prop-types';
import {Sort, SORTS, smallColumn, midColumn, largeColumn} from '../constants'
import { sortBy } from 'lodash';
//import { renderer } from 'react-test-renderer';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortKey: 'NONE',
            isSortReverse: false,
        };
        this.onSort = this.onSort.bind(this);
    }

     // sort class method to set local component state
    onSort(sortKey) {
        const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
        this.setState({sortKey,isSortReverse});
    }

    render() {
        const {
        list,
        onDismiss
        } = this.props;

        const {
        sortKey,
        isSortReverse
        } = this.State;

        const sortedList = SORTS[sortKey](list);
        const reverseSortedList = isSortReverse
            ? sortedList.reverse()
            : sortedList;
            
        return (
            <div className="table">
                <div className="table-header">
                    <span style={largeColumn}>
                        <Sort 
                            sortKey={'TITLE'}
                            onSort={this.onSort}
                            activeSortKey={sortKey}
                        >
                        Title
                        </Sort>
                    </span>
                    <span style={midColumn}>
                        <Sort 
                            sortKey={'AUTHOR'}
                            onSort={this.onSort}
                            activeSortKey={sortKey}
                        >
                        Author
                        </Sort>
                    </span>
                    <span style={smallColumn}>
                        <Sort 
                            sortKey={'COMMENTS'}
                            onSort={this.onSort}
                            activeSortKey={sortKey}
                        >
                        Comments
                        </Sort>
                    </span>
                    <span style={smallColumn}>
                        <Sort 
                            sortKey={'POINTS'}
                            onSort={this.onSort}
                            activeSortKey={sortKey}
                        >
                        Points
                        </Sort>
                    </span>
                    <span style={smallColumn}>
                        Archive
                    </span>
                </div>
                {reverseSortedList.map(item =>
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
        );
    }
}

// Table.prototype = {
//     list: PropTypes.arrayOf(
//         PropTypes.shape({
//             objectID: PropTypes.string.isRequired,
//             author: PropTypes.string,
//             url: PropTypes.string,
//             num_comments: PropTypes.number,
//             points: PropTypes.number,
//         })
//     ).isRequired,
//     onDismiss: PropTypes.func.isRequired,
// };

export default Table;