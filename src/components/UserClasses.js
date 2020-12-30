import React from "react";
import Nav from "./Nav";
import CourseNav from "./CourseNav";
import GradeDisplay from "./GradeDisplay";
import TableView from "./TableView";

import {auth, db} from "../firebase";

import "./Blurb.css";
import "./UserClasses.css";
import "./Button.css";

var userdb;

export default class UserClasses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasClasses: true,
            addClassModal: false,
            classes: [],
            curClassName: '',
            curClass: {},
            weightGroups: []
        };

        this.setHasClasses = this.setHasClasses.bind(this);
        this.setCurCourse = this.setCurCourse.bind(this);
    }

    componentDidMount() {
        console.log("type: " + (typeof this.state.curClass));
        this.setHasClasses();
    }

    componentWillUnmount () {

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
                this.setState({curClassName: curClasses[0]});
                var classId = curClasses[0];

                let currentComponent = this;
                userdb.collection('classes').doc(classId).get().then(function(doc) {
                    currentComponent.setState({curClass: doc.data()});
                    currentComponent.setState({weightGroups: doc.data().weight_groups});
                });
            } else {
                this.setState({hasClasses: false});
            }
        });

    }

    addClassWeight() {

    }

    setCurCourse (event) {
        // console.log(event.target.value);
        this.setState({curClassName: event.target.value});
        event.preventDefault();
    }

    render() {
        // console.log("state: " + this.state.hasClasses);
        // console.log("classes: " + this.state.classes + " /// curClass: " + this.state.curClass);
        // console.log("Current Class: " + JSON.stringify(this.state.curClass));
        // console.log("Current Class: " + this.state.weightGroups.length);
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
                    <CourseNav classes={this.state.classes} curClass={this.state.curClassName} setCurClass={this.setCurCourse}/>

                    {/* Current Course Grade Pill */}
                    <GradeDisplay grade={this.state.curClass.grade} />

                    <button id="add_class_weight" onClick={this.addClassWeight}>Add Class Weight</button>

                    {/* Map tables of assignments */}
                    <div className="tableViewContainer">
                        {this.state.weightGroups.map(function(weightGroup, key) {
                            return <TableView weightGroup={weightGroup} key={key} />;
                        })}
                    </div>

                </div>}
            </div>
        );
    }
}
