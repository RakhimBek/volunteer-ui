import React from 'react';
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import SearchComponent from "../../common/SearchComponent";
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

import AddTask from "./AddTask";
import TaskPreview from "./TaskPreview";

import eg from '../../img/play_24.png'
import MenuTabs from "../../common/MenuTabs";
import MenuHeader from "../../common/MenuHeader";
import {Button} from "@vkontakte/vkui";
import Icon16Add from '@vkontakte/icons/dist/16/add'
const Project = ({id, go}) => (
    <Panel id={id} theme="white">
        <div>
            <MenuHeader headerTitle="Задачи"/>
            <SearchComponent/>

            <AddTask go={go}/>
            <Div>
            <Button before={<Icon16Add/>} onClick={go} data-to="new_task">ДОБАВИТЬ</Button>
            </Div>
            <TaskPreview go={go} image={eg} description="Задача №1" startDate="10.11.1993" endDate="11.11.1993" hashtag="task11"/>
            <TaskPreview go={go} image={eg} description="Задача №2" startDate="11.11.1993" endDate="11.11.1993" hashtag="task12"/>
            <TaskPreview go={go} image={eg} description="Задача №3" startDate="12.11.1993" endDate="12.11.1993" hashtag="task13"/>
        </div>

        <MenuTabs go={go}/>
    </Panel>
);

export default Project;