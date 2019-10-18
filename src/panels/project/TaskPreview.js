import React from 'react';
import Icon20UserOutline from '@vkontakte/icons/dist/20/user_outline';
import Icon24CommentOutline from '@vkontakte/icons/dist/24/comment_outline';
import Icon24BrowserForward from '@vkontakte/icons/dist/24/browser_forward';

import ava from '../../img/ava.jpg';

import './TaskPreview.css';

const TaskPreview = ({go, hashtag, startDate, endDate, description, arrowVisibility}) => (
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
                <div className="forward-button" onClick={go} data-to="task" hidden={arrowVisibility}><Icon24BrowserForward/></div>
            </div>
            <div className="task-counters">
                <Icon20UserOutline width={20} height={20}/> <p className="counter-item">8</p>
                <Icon24CommentOutline width={20} height={20}/> <p className="counter-item">0</p>
            </div>
        {console.log(arrowVisibility)}


    </section>

);

export default TaskPreview;