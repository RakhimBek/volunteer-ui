import React from 'react';
import Icon24BrowserForward from '@vkontakte/icons/dist/24/browser_forward';

import ava from '../../img/ava.jpg';

import './TaskPreview.css';
import TaskCounters from "../../common/TaskCounters";
import ShareButton from "../../common/ShareButton";

const TaskPreview = ({go, hashtag, startDate, endDate, description, arrowButton, role}) => (
    <section className="task">
            <div className="task-header">
                <div className="avatar-wrapper">
                    <img className="ava" src={ava} alt="user" />
                </div>

                <div className="task-info">
                        <p className="hashtag">{hashtag}</p>
                        <p className="name">Алексей Иванов</p>
                        <p className="elapsed-time">5 дней назад</p>
                </div>

                <div className="task-timetable">
                    9:00-16:00
                </div>
            </div>

            <div className="task-description">
                <p className="description-text">{description}</p>
                {arrowButton &&
                <div className="forward-button" onClick={go} data-to="task"><Icon24BrowserForward/></div>
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