import React from 'react';
import ReactDOM from 'react-dom';
import FocusTrap from 'focus-trap-react';

export const Modal = ({
  onClickOutside,
  onKeyDown,
  modalRef,
  children
}) => {
  return ReactDOM.createPortal(
    <FocusTrap>
      <aside
        tag="aside"
        role="dialog"
        tabIndex="-1"
        aria-modal="true"
        className="modal-cover"
        onClick={onClickOutside}
        onKeyDown={onKeyDown}
      >
        <div className="modal-area" ref={modalRef}>
          <div className="modal-body">
              {children}
          </div>
        </div>
      </aside>
    </FocusTrap>,
    document.body
  );
};

export default Modal;