import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { sortBy } from 'lodash';
import classNames from 'classnames';
import Button from '../Buttons/index';


library.add(faSpinner)
//faSpinner.icon("50px")
export const DEFAULT_QUERY = 'React';
export const PATH_BASE = 'https://hn.algolia.com/api/v1';
export const PATH_SEARCH = '/search';
export const PARAM_SEARCH = 'query=';
export const PARAM_PAGE = 'page=';
export const PARAM_HPP = 'hitsPerPage=';
export const DEFAULT_HPP = '10';


export const Loading = () => (
    <div>
      loading... <FontAwesomeIcon size="2x" icon="spinner" />
    </div>
  )

// High order component
export const withLoading = (Component) => ({ isLoading, ...rest }) =>
isLoading
  ? <Loading/>
  : <Component {...rest} />

export const ButtonWithLoading = withLoading(Button);


// Search constants for loDash
export const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
};

//Search

export const Sort =({
  sortKey,
  activeSortKey,
  onSort,
  children 
  }) => {
  
  const sortClass = classNames( 'button-inline', {'button-active': sortKey === activeSortKey});

  // if (sortKey === activeSortKey) {
  //   sortClass.push('button-active');
  // }

  return (
  <Button
    onClick={() => onSort(sortKey)}
    className={sortClass}
  >
    {children}
  </Button>
  );
}