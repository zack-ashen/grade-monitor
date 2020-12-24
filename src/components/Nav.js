import React from "react";
import "./Nav.css";
import "./Button.css";
import Logout from "./Logout";

export default class Nav extends React.Component {

    addClass() {

    }

    render(){
        return (
            <div className="Nav">
                <h1 id="nav_header">Grade Teller</h1>
                <div id="button-container">
                    <button type="button" id="add_class" onClick={this.addClass}>Add Class</button>
                    <Logout />
                </div>
            </div>

        );
    }
}

