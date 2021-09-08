import { useEffect } from "react";
// import PropTypes from "prop-types";
import { createPortal } from "react-dom";
const modalRoot = document.querySelector("#modal-root");

const Modal = (props) => {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
  });
  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      props.onClose();
    }
  };
  const handleBlackDropClick = (e) => {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleBlackDropClick}>
      <div className="Modal">{props.children}</div>
    </div>,
    modalRoot
  );
};
Modal.propTypes = {
  // onClick: PropTypes.func.isRequired,
};
export default Modal;
