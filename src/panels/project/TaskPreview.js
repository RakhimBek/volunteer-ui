import React from 'react';
import Icon24BrowserForward from '@vkontakte/icons/dist/24/browser_forward';

import ava from '../../img/ava.jpg';

import './TaskPreview.css';
import axios from 'axios/dist/axios'
import TaskCounters from "../../common/TaskCounters";
import ShareButton from "../../common/ShareButton";
import Utils from "../../utils/utils";
import Debug from "../../Debug";
import {useSelector} from "react-redux";

const TaskPreview = ({taskInfo, go, hashtag, arrowButton, role, setState,}) => {

    const volunteerId = useSelector((state) => state.currentUser.id);
    const dateString = (date) => {
        const year = date.year;
        const month = date.month;
        const dayOfMonth = date.dayOfMonth;
        return dayOfMonth + '/' + month + '/' + year;
    };

    const bindVolunteerTask = (e) => {
        axios
            .get(Utils.path('task/' + taskInfo.id + '/volunteer/' + volunteerId))
            .then((response) => {
                console.log(response.data);
            })
            .catch((reason) => {
                Debug(reason);
            });
    };

    const imageUrl = Utils.path('attachment/' + taskInfo.project.author.image.id);
    return (
        <section className="task">
            <div className="task-header">
                <div className="avatar-wrapper">
                    <img className="ava" src={imageUrl ? imageUrl : ava} alt="user"/>
                </div>

                <div className="task-info">
                    <p className="hashtag">{taskInfo.title}</p>
                    <p className="name">
                        <p>{taskInfo.project.author.firstName}&nbsp;{taskInfo.project.author.lastName}</p>
                    </p>
                    <p className="elapsed-time">5 дней назад</p>
                </div>

                <div className="task-timetable">
                    {dateString(taskInfo.startDate)}-{dateString(taskInfo.endDate)}
                </div>
            </div>

            <div className="task-description">
                <p className="description-text">{taskInfo.description}</p>
                {arrowButton &&
                <div className="forward-button" onClick={(e) => {
                    setState({taskInfo: taskInfo});
                    go(e);
                }} data-to="task"><Icon24BrowserForward/></div>
                }
            </div>
            {role === "volunteer" &&
            <div className="volunteer-actions">
                <button className="apply-task-button" onChange={bindVolunteerTask}>Откликнуться</button>
                <ShareButton/>
            </div>
            }
            <TaskCounters/>
        </section>
    );
};

export default TaskPreview;