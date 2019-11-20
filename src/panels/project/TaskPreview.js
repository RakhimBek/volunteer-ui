import React from 'react';
import Icon24BrowserForward from '@vkontakte/icons/dist/24/browser_forward';

import ava from '../../img/ava.jpg';

import './TaskPreview.css';
import TaskCounters from "../../common/TaskCounters";
import ShareButton from "../../common/ShareButton";

const TaskPreview = ({taskInfo, go, hashtag, arrowButton, role, setState,}) => {

    const dateString = (date) => {
        const year = date.year;
        const month = date.month;
        const dayOfMonth = date.dayOfMonth;
        return dayOfMonth + '/' + month + '/' + year;
    };

    return (
        <section className="task">
            <div className="task-header">
                <div className="avatar-wrapper">
                    <img className="ava" src={ava} alt="user"/>
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
                <button className="apply-task-button">Откликнуться</button>
                <ShareButton/>
            </div>
            }
            <TaskCounters/>
        </section>
    );
};

export default TaskPreview;