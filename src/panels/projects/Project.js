import React from 'react';
import Div from "@vkontakte/vkui/dist/components/Div/Div";

const Project = ({date, label}) => (
    <Div>
        <p>{date}</p>
        <p>{label} </p>
        <button>Открыть</button>
    </Div>
);

export default Project;