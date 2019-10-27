import React from 'react';
import Icon20UserOutline from '@vkontakte/icons/dist/20/user_outline';
import Icon24CommentOutline from '@vkontakte/icons/dist/24/comment_outline';

import './TaskCounters.css'

const TaskCounters = () => (
    <div className="task-counters">
        <Icon20UserOutline width={20} height={20}/> <p className="counter-item">8</p>
        <Icon24CommentOutline width={20} height={20}/> <p className="counter-item">0</p>
    </div>
);

export default TaskCounters;