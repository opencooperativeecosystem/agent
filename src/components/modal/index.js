import React from "react";
import ReactDOM from "react-dom";
import Modal from "./modal";
const modalRoot = document.getElementById('modal');

class Portal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }
}

export default (props) => <Portal><Modal {...props} /></Portal>;