import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
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