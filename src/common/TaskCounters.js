import React from 'react';
import Icon20UserOutline from '@vkontakte/icons/dist/20/user_outline';

import './TaskCounters.css'

const TaskCounters = () => (
    <div className="task-counters">
        <Icon20UserOutline width={20} height={20}/> <p className="counter-item">8</p>
    </div>
);

export default TaskCounters;