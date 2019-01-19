import React, { Component } from 'react';
import './index.css';
//import PropTypes from 'prop-types';

// ES6 class component
class Search extends Component {
  componentDidMount() {
    if (this.input){
      this.input.focus();       
    }
  }
  render() {
    const {
      value,
      onChange,
      onSubmit,
      children 
    } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          ref={el => this.input =el}
          />
          <button type="submit">
            {children}
          </button>
      </form>
      );
  }
}


export default Search;

// functional stateless component 
// Example: with ref example
// note: no lifecycle method so we can not trigger the focus
//------------------------------------
// const Search = ({
//     value,
//     onChange,
//     onSubmit,
//     children 
//   }) => {
//   let input;
//   return (
//     <form onSubmit={onSubmit}>
//       <input
//         type="text"
//         value={value}
//         onChange={onChange}
//         ref={el => input = el}
//         />
//         <button type="submit">
//           {children}
//         </button>
//     </form>
//   );
// }


// used for Proptypes but commited out because we changed to a class to focus on input field 
// Search.prototype = {
//   value: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
//   onSubmit: PropTypes.func.isRequired,
//   children: PropTypes.node.isRequired,
// };
