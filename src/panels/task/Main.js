import React from 'react';
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import TaskPreview from "../project/TaskPreview";
import eg from "../../img/play_24.png";
import MenuTabs from "../../common/MenuTabs";
import MenuHeader from "../../common/MenuHeader";
import BackButton from "../../common/BackButton";

const Task = ({id, hashtag, go}) => (
    <Panel id={id} theme="white">
        <MenuHeader headerTitle="Задача"/>
        <BackButton go={go} to="project"/>
        <Div>
            <TaskPreview go={go} image={eg} description="Задача №1" startDate="10.11.1993" endDate="11.11.1993" hashtag="task11" arrowVisibility="false"/>
        </Div>

        <MenuTabs go={go}/>
    </Panel>
);

export default Task;