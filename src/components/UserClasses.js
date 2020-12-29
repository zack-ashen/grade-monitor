import React from "react";
import Nav from "./Nav.js";
import CourseNav from "./CourseNav";

import {auth, db} from "../firebase";

import "./Blurb.css";
import "./UserClasses.css";

var userdb;

export default class UserClasses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasClasses: true,
            addClassModal: false,
            classes: [],
            curClass: ''
        };

        this.setHasClasses = this.setHasClasses.bind(this);
    }

    componentDidMount() {
        this.setHasClasses();
    }

    setHasClasses() {
        userdb = db.collection('users').doc(auth.currentUser.uid);

        userdb.collection('classes').get().then(snap => {
            if (snap.size > 0) {
                this.setState({hasClasses: true});
                var curClasses = [];
                snap.forEach(function(doc) {
                    curClasses.push(doc.id);
                });
                this.setState({classes: curClasses});
                this.setState({curClass: curClasses[0]});
            } else {
                this.setState({hasClasses: false});
            }
        });
    }

    render() {
        // console.log("state: " + this.state.hasClasses);
        // console.log("classes: " + this.state.classes + " /// curClass: " + this.state.curClass);
        return (
            <div className="UserClasses">
                <Nav setHasClasses={this.setHasClasses} showAddClassModal={this.showAddClassModal}/>

                {!this.state.hasClasses && <div id="container">
                    <div className="blurb" id="message-blurb">
                        <p className="blurb-text">It looks like you don’t have any classes yet! Let’s add one to get started.</p>
                    </div>
                </div>
                }
                {this.state.hasClasses && <div id="container">
                    {/* {this.state.classes.map(course => {
                        return (
                            <h1>{course}</h1>
                        );
                    })} */}
                    <CourseNav classes={this.state.classes} curClass={this.state.curClass}/>

                    {/* Current Course Grade Pill */}

                    {/* Add Course Weight Button */}

                    {/* Map tables of assignments */}
                    

                </div>}
            </div>
        );
    }
}
