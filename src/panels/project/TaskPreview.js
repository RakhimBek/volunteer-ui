import React from 'react';
import Icon24BrowserForward from '@vkontakte/icons/dist/24/browser_forward';

import ava from '../../img/ava.jpg';

import './TaskPreview.css';
import TaskCounters from "../../common/TaskCounters";
import ShareButton from "../../common/ShareButton";

const TaskPreview = ({taskInfo, go, hashtag, startDate, endDate, arrowButton, role, setState}) => (
    <section className="task">
            <div className="task-header">
                <div className="avatar-wrapper">
                    <img className="ava" src={ava} alt="user" />
                </div>

                <div className="task-info">
                        <p className="hashtag">{taskInfo.title}</p>
                        <p className="name">Алексей Иванов</p>
                        <p className="elapsed-time">5 дней назад</p>
                </div>

                <div className="task-timetable">
                    9:00-16:00
                </div>
            </div>

            <div className="task-description">
                <p className="description-text">{taskInfo.description}</p>
                {arrowButton &&
                <div className="forward-button" onClick={(e) => {setState({ taskId: taskInfo.id}); go(e); }} data-to="task"><Icon24BrowserForward/></div>
                }
            </div>
            {role==="volunteer"&&
            <div className="volunteer-actions">
                <button className="apply-task-button">Откликнуться</button>
                <ShareButton/>
            </div>
            }
            <TaskCounters/>


    </section>

);

export default TaskPreview;