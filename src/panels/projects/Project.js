import React from 'react';
import Div from "@vkontakte/vkui/dist/components/Div/Div";

const Project = ({date, label, go}) => (
    <Div>
        <p>{date}</p>
        <p>{label} </p>
        <button onClick={go} data-to="project">Открыть</button>
    </Div>
);

export default Project;