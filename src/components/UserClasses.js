import React from "react";
import Nav from "./Nav";
import CourseNav from "./CourseNav";
import CourseView from "./CourseView";

import {auth, db} from "../firebase";

import "./Blurb.css";
import "./UserClasses.css";
import "./Button.css";

var userdb;

export default class UserClasses extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            uid: null,
            hasClasses: false,
            classes: [],
            course: {},
            cachedCourse: {},
            writes: 0
        };

        this.addClass = this.addClass.bind(this);
        this.setCurCourse = this.setCurCourse.bind(this);
        this.updateGrade = this.updateGrade.bind(this);
        this.deleteWeightGroup = this.deleteWeightGroup.bind(this);
        this.editClassName = this.editClassName.bind(this);
        this.deleteClass = this.deleteClass.bind(this);
        this.saveData = this.saveData.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;

        this.authSubscription = auth.onAuthStateChanged((user) => {
            if (user && this._isMounted) {
                this.setState({uid: user.uid});
                userdb = db.collection('users').doc(user.uid);

                userdb.collection('classes').get().then(snap => {
                    if (snap.size > 0) {
                        this.setState({hasClasses: true});
                        let curClasses = [];
                        snap.forEach(function(doc) {
                            curClasses.push(doc.id);
                        });
                        this.setState({classes: curClasses,
                                       curClassName: curClasses[0]});
                        var classId = curClasses[0];

                        let currentComponent = this;
                        userdb.collection('classes').doc(classId).get().then(function(doc) {
                            var curClass = doc.data();
                            currentComponent.setState({course: doc.data(),
                                                       cachedCourse: doc.data()});
                        });
                    } else {
                        this.setState({hasClasses: false});
                    }
                });
            }
        });
    }

    /**
     * Save data. App saves data here and when user switches to a different course.
     */
    componentWillUnmount () {
        this._isMounted = false;
    }

    saveData(courseName = this.state.course.name) {
        if (this.state.course !== this.state.cachedCourse && this.state.writes < 5000)
            this.setState({cachedCourse: this.state.course,
                           writes: this.state.writes + 1});

            db.collection('users').doc(this.state.uid).collection("classes").doc(courseName).set(this.state.course);
    }

    addClass (newClassName) {
        if (this.state.hasClasses === true)
            this.saveData();

        let newClasses = this.state.classes;
        newClasses.push(newClassName);

        this.setState({hasClasses: true,
                       curClassName: newClassName,
                       classes: newClasses,
                       course: {
                            name: newClassName,
                            grade: 100,
                            weight_groups: [
                                {   
                                    id: 0,
                                    name: "Homework",
                                    grade: 100,
                                    weight: 100,
                                    assignments: [
                                        { 
                                        name: "Example Assignment",
                                        points_earned: 20,
                                        points_possible: 20 },
                                    ]
                                },
                            ]
                       }}
        );
    }

    addClassWeight(newWeightGroup) {
        let newWeightGroups = this.state.course.weight_groups;
        newWeightGroups.push(newWeightGroup);

        let updatedGrade = 0;
        for (let i = 0; i < newWeightGroups.length; i++) {
            updatedGrade += newWeightGroups[i].grade * (newWeightGroups[i].weight / 100);
        }

        let course = this.state.course;
        course.weight_groups = newWeightGroups;
        course.grade = updatedGrade;

        this.setState({course: course});
    }

    updateGrade (editedWeightGroup, id) {
        let weightGroups = this.state.course.weight_groups;
        weightGroups[id] = editedWeightGroup;

        var updatedGrade = 0;
        // compute weighted average
        for (var i = 0; i < weightGroups.length; i++) {
            updatedGrade += weightGroups[i].grade * (weightGroups[i].weight / 100);
        }

        let course = this.state.course;
        course.weight_groups = weightGroups;
        course.grade = updatedGrade;

        console.log(JSON.stringify(course));

        this.setState({course: course});
    }

    async setCurCourse (event) {
        this.saveData();

        const newCourseRef = db.collection('users').doc(this.state.uid).collection('classes').doc(event.target.value);
        const newCourseDoc = await newCourseRef.get();
        const newCourseData = newCourseDoc.data();

        await this.setState({course: newCourseData});
    }

    deleteWeightGroup (weightGroupId) {
        let updatedWeightGroups = this.state.course.weight_groups;
        updatedWeightGroups.splice(weightGroupId, 1);

        let updatedCourse = this.state.course;
        updatedCourse.weight_groups = updatedWeightGroups;

        this.setState({course: updatedCourse});
        this.saveData();
    }

    async editClassName (oldName, newName) {
        let updatedClasses = this.state.classes;
        const courseIndex = updatedClasses.indexOf(oldName);
        updatedClasses[courseIndex] = newName;

        let updatedCourse = this.state.course;
        updatedCourse.name = newName;

        this.setState({classes: updatedClasses,
                       course: updatedCourse});

        const newDoc = await db.collection("users").doc(this.state.uid).collection("classes").doc(newName).set(updatedCourse);
        const deleteOldDoc = await db.collection("users").doc(this.state.uid).collection("classes").doc(oldName).delete();


    }

    async deleteClass (course) {
        const res = await db.collection('users').doc(this.state.uid).collection('classes').doc(course.name).delete();
        
        let updatedClasses = this.state.classes;
        updatedClasses.splice(updatedClasses.indexOf(course.name), 1);
        if (updatedClasses.length === 0) {
            this.setState({
                course: {},
                classes: updatedClasses,
                hasClasses: false,
                cachedCourse: {}
            });
        } else {
            const updatedCourseName = updatedClasses[0];
            const courseRef = db.collection('users').doc(this.state.uid).collection('classes').doc(updatedCourseName);
            const courseDoc = await courseRef.get();
            const updatedCourse = courseDoc.data();
            this.setState({
                course: updatedCourse,
                classes: updatedClasses,
                cachedCourse: updatedCourse
            });
        }

    }

    render() {
        return (
            <div className="UserClasses">
                <Nav addClass={this.addClass}/>

                {!this.state.hasClasses && <div id="container">
                    <div className="blurb" id="message-blurb">
                        <p className="blurb-text">It looks like you don’t have any classes yet! Let’s add one to get started.</p>
                    </div>
                </div>
                }

                {this.state.hasClasses && <div id="container">
                    <CourseNav classes={this.state.classes} curClass={this.state.course.name} setCurClass={this.setCurCourse}/>

                    <CourseView course={this.state.course} key={this.state.course} saveData={this.saveData} deleteWeightGroup={this.deleteWeightGroup} deleteClass={this.deleteClass} editClassName={this.editClassName}/>

                </div>}
            </div>
        );
    }
}
