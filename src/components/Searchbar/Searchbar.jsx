import { useState } from "react";
import PropTypes from "prop-types";
const Searchbar = (props) => {
  const [myImage, setMyImage] = useState("");
  const handleNameChange = (e) => {
    setMyImage(e.currentTarget.value.toLowerCase());
  };
  const handlerSubmit = (event) => {
    event.preventDefault();
    if (myImage.trim() === "") {
      return;
    }
    props.onSubmit(myImage);
    setMyImage("");
  };
  return (
    <header className="Searchbar">
      <form onSubmit={handlerSubmit} className="SearchForm">
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
          value={myImage}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
