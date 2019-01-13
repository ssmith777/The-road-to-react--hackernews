import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'React';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';
const DEFAULT_HPP = '100';

  
class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,

    };

    //this.onSearchChange = this.onSearchChange.bind(this);
    //this.onDismiss = this.onDismiss.bind(this);

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);

  } 

  setSearchTopStories(result) {
    const { hits, page } = result;

    const oldHits = page !== 0
      ? this.state.result.hits
      : [];

      const updatedHits = [
        ...oldHits,
        ...hits
      ];

    this.setState({
      result: { hits: updatedHits, page }
    });
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    console.log(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`);
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  onSearchChange(event) {
    this.setState({searchTerm: event.target.value})
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  
  }


  onDismiss(id) {
    // on client side ondismiss
    //---------------------------------------------------------------------------------
    // const updatedList = this.state.list.filter(item => item.objectID !== id);
    // this.setState({list: updatedList});

    // on server side
    const isNotId = item => item.objectID !== id;
    
    const updatedHits = this.state.result.hits.filter(isNotId);
    // on Server Side
    //---------------------------------------------------------------------------------
    // set state with Object.assign method - combinds objects and creates a new one
    // also works with arrays,lists..keyvalue pairs...etc
    //---------------------------------------------------------------------------------
    // this.setState({
    //   result: Object.assign({}, this.state.result, {hits: updatedHits})
    // });

    // object spread operator
    this.setState({
      result: { ...this.state.result, hits: updatedHits }
    });

  }
  
  render() {
    const { searchTerm, result} = this.state;
    const page = (result && result.page) || 0;
    return (
      <div className="page">
        <div className="interactions">
          <Search 
            value={searchTerm} 
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        { result &&
          <Table 
            list={result.hits} 
            onDismiss={this.onDismiss} 
          />
        }
        <div className="interactions">
          <Button onClick={() => 
            this.fetchSearchTopStories(searchTerm, page +1)}>
            More
          </Button>
        </div>
      </div>
    );
  }
}

const Button = ({ onClick,className = '',children }) => 
  <button
    onClick={onClick}
    className={className}
    type="button">{children}
  </button>



const Search = ({value, onChange, onSubmit, children }) =>
  <form onSubmit={onSubmit}>
    <input
      type="text"
      value={value}
      onChange={onChange}
      />
      <button type="submit">
        {children}
      </button>
  </form>

const largeColumn = {
  width: '40%',
}

const midColumn = {
  width: '30%',
}

const smallColumn = {
  width: '10%'
}


const Table = ({ list, onDismiss }) =>
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

export default App; 