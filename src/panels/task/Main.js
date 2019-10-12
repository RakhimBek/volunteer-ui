import React from 'react';
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import TaskPreview from "../project/TaskPreview";
import eg from "../../img/play_24.png";

const Task = ({id, hashtag, go}) => (
    <Panel id={id}>

        <Div>
            <p>Задача {hashtag}</p>
            <TaskPreview go={go} image={eg} description="Задача №1" startDate="10.11.1993" endDate="11.11.1993" hashtag="task11"/>
        </Div>
    </Panel>
);

export default Task;