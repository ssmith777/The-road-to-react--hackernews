import React, { Component } from 'react';
import axios from 'axios';
import './index.css';
//import { sortBy } from 'lodash'
 
// import our stateless components
import Button from '../Buttons/index';
import Table from '../Table/index';
import Search from '../Search/index';

// default constants
import { 
  DEFAULT_QUERY,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP,
  ButtonWithLoading,
 } from '../constants';


const updateSearchTopStoriesState = (hits, page) => (prevState) => {
  const { searchKey, results} = prevState;

  const oldHits = results && results[searchKey]
    ? results[searchKey].hits
    : [];

  const updatedHits = [
    ...oldHits,
    ...hits
  ];
  return {
    results: {
      ...results,[searchKey]:{ hits: updatedHits, page }
    },
    isLoading: false
  };
}

  
class App extends Component {
  _isMounted = false;

  constructor(props){
    super(props);

    this.state = {
      results: null,  
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false,
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);

  } 
  

  // axios fetch
  fetchSearchTopStories(searchTerm, page = 0) {
    this.setState({ isLoading: true});

    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(result => this._isMounted && this.setSearchTopStories(result.data))
      .catch(error => this._isMounted && this.setState({ error }));
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    this.setState(updateSearchTopStoriesState(hits,page));
  }

 
  componentDidMount() {
    this._isMounted = true;
    const { searchTerm } = this.state;
    this.setState({searchKey: searchTerm});
    this.fetchSearchTopStories(searchTerm);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({searchKey: searchTerm});
   
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  }

  onSearchChange(event) {
    this.setState({searchTerm: event.target.value})
  }
  
  onDismiss(id) {

    const { searchKey, results } = this.state; 

    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
  
    const updatedHits = hits.filter(isNotId);
    
    this.setState({
      results: {
         ...results,
         [searchKey]:  {hits: updatedHits, page }
      }
    });

  }
  
  render() {
    
    const { 
      searchTerm,
      results,
      searchKey,
      error,
      isLoading
      } = this.state;

    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
      ) || 0;

    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
      ) || [];

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
        { error
          ? <div className="interactions">
              <p>Something went wrong.</p>
            </div>
          : <Table 
              list={list} 
              onDismiss={this.onDismiss} 
            />
        }
        <div className="interactions"> 
          <ButtonWithLoading
            isLoading = {isLoading}
            onClick={() => this.fetchSearchTopStories(searchKey, page +1)}
            >
             More
          </ButtonWithLoading>   
        </div>
      </div>
    );
  }
}



// added for jest testing
export {
  Button,
  Search,
  Table,
};

export default App; 