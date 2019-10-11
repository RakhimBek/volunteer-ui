import React from 'react';
import Div from "@vkontakte/vkui/dist/components/Div/Div";

const Task = ({go, hashtag, image, startDate, endDate, description}) => (
    <Div>
        <img src={image} alt="A"/>
        <p>{hashtag}</p>
        <p>{startDate}</p>
        <p>{endDate}</p>
        <p> 5 дней назад</p>
        <p>{description}</p>
        <p>8</p>
        <p>3</p>
        <p onClick={go} date-to="project">&gt;</p>
    </Div>
);

export default Task;