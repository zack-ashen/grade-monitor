import React from 'react';
import Modal from './Modal';
import "./ModalContainer.css";
import "../Button.css";

export class ModalContainer extends React.Component {

  state = { isShown: false };

  showModal = () => {
    this.setState({ isShown: true });
    this.toggleScrollLock();
  };

  closeModal = () => {
    this.setState({ isShown: false });
    this.TriggerButton.focus();
    this.toggleScrollLock();
  };

  onKeyDown = (event) => {
    if (event.keyCode === 27) {
      this.closeModal();
    }
  };

  onClickOutside = (event) => {
    if (this.modal && this.modal.contains(event.target)) return;
    this.closeModal();
  };

  toggleScrollLock = () => {
    document.querySelector('html').classList.toggle('scroll-lock');
  };

  render() {
    return (
      <React.Fragment>
        <button className={this.props.buttonStyle} ref={(n) => (this.TriggerButton = n)} onClick={this.showModal}>{this.props.triggerText}</button>
        {this.state.isShown ? (
          <Modal
            onSubmit={this.props.onSubmit}
            modalRef={(n) => (this.modal = n)}
            buttonRef={(n) => (this.closeButton = n)}
            closeModal={this.closeModal}
            onKeyDown={this.onKeyDown}
            onClickOutside={this.onClickOutside}
            children={this.props.children}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default ModalContainer;