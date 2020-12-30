import React from "react";
import Nav from "./Nav";
import CourseNav from "./CourseNav";
import GradeDisplay from "./GradeDisplay";
import TableView from "./TableView";
import AddClassWeight from "./AddClassWeight";

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
            curClassGrade: 0,
            weightGroups: []
        };

        this.setHasClasses = this.setHasClasses.bind(this);
        this.setCurCourse = this.setCurCourse.bind(this);
        this.updateGrade = this.updateGrade.bind(this);
    }

    componentDidMount() {
        this.setHasClasses();
    }

    /**
     * Save data. App saves data here and when user switches to a different course.
     */
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
                    var curClass = doc.data();
                    currentComponent.setState({curClassGrade: curClass.grade});
                    currentComponent.setState({weightGroups: doc.data().weight_groups});
                });
            } else {
                this.setState({hasClasses: false});
            }
        });

    }

    addClassWeight(newWeightGroup) {
        let newWeightGroups = this.state.weightGroups;
        newWeightGroups.push(newWeightGroup);

        let updatedGrade = 0;
        for (let i = 0; i < newWeightGroups.length; i++) {
            updatedGrade += newWeightGroups[i].grade * (newWeightGroups[i].weight / 100);
        }

        this.setState({weightGroups: newWeightGroups,
            curClassGrade: updatedGrade});
    }

    updateGrade (editedWeightGroup, id) {
        let weightGroups = this.state.weightGroups;
        weightGroups[id] = editedWeightGroup;

        var updatedGrade = 0;
        // compute weighted average
        for (var i = 0; i < weightGroups.length; i++) {
            updatedGrade += weightGroups[i].grade * (weightGroups[i].weight / 100);
        }

        this.setState({weightGroups: weightGroups,
                       curClassGrade: updatedGrade});

    }

    setCurCourse (event) {
        // console.log(event.target.value);
        this.setState({curClassName: event.target.value});
        event.preventDefault();
    }

    render() {
        const weightGroups = this.state.weightGroups;
        const thisComponent = this;
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
                    <GradeDisplay grade={this.state.curClassGrade} />

                    <AddClassWeight addWeight={this.addClassWeight} weightGroups={this.state.weightGroups}/>

                    {/* <button id="add_class_weight" onClick={this.addClassWeight}>Add Class Weight</button> */}

                    {/* Map tables of assignments */}
                    <div className="tableViewContainer">
                        {this.state.weightGroups.map(function(weightGroup, key) {
                            return <TableView weightGroup={weightGroup} key={key} id={weightGroups.indexOf(weightGroup)} updateTotalGrade={thisComponent.updateGrade}/>;
                        })}
                    </div>

                </div>}
            </div>
        );
    }
}
