import React, { Component } from "react";
import PropTypes from "prop-types";
class Searchbar extends Component {
  state = {
    myImage: "",
  };
  handleNameChange = (e) => {
    this.setState({ myImage: e.currentTarget.value.toLowerCase() });
  };
  handlerSubmit = (event) => {
    event.preventDefault();
    if (this.state.myImage.trim() === "") {
      return;
    }
    this.props.onSubmit(this.state.myImage);
    this.setState({ myImage: "" });
  };
  // debounce = (fn, ms) => {
  //   let timeout;
  //   return function () {
  //     const fnCall = () => {
  //       fn.apply(this, arguments);
  //     };
  //     clearTimeout(timeout);
  //     timeout = setTimeout(fnCall, ms);
  //   };
  // };
  // onChange = this.debounce(this.handlerSubmit, 500);
  render() {
    return (
      <header className="Searchbar">
        <form onSubmit={this.handlerSubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            name="bar"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
            value={this.state.myImage}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
