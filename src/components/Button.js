import React from "react";
import "./Button.css"

class Button extends React.Component {
    render() {
        return (<button type="button" id={this.props.buttonType}>{this.props.text}</button>);
    }
}

export default Button;