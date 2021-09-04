import React, { Component } from "react";
// import PropTypes from "prop-types";
import { createPortal } from "react-dom";
const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  state = {};
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }
  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };
  handleBlackDropClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleBlackDropClick}>
        <div className="Modal">{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
Modal.propTypes = {
  // onClick: PropTypes.func.isRequired,
};
export default Modal;
