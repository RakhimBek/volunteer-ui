import React from 'react';
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import SearchComponent from "../../common/SearchComponent";
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

import AddTask from "./AddTask";
import TaskPreview from "./TaskPreview";

import eg from '../../img/play_24.png'
import MenuTabs from "../../common/MenuTabs";

const Project = ({id, go}) => (
    <Panel id={id}>
        <Div>
            <p>Задачи</p>
            <SearchComponent/>
            <AddTask go={go}/>
            <TaskPreview go={go} image={eg} description="Задача №1" startDate="10.11.1993" endDate="11.11.1993" hashtag="task11"/>
            <TaskPreview go={go} image={eg} description="Задача №2" startDate="11.11.1993" endDate="11.11.1993" hashtag="task12"/>
            <TaskPreview go={go} image={eg} description="Задача №3" startDate="12.11.1993" endDate="12.11.1993" hashtag="task13"/>
        </Div>

        <MenuTabs go={go}/>
    </Panel>
);

export default Project;