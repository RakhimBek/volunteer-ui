import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import TaskPreview from "../project/TaskPreview";
import eg from "../../img/play_24.png";
import MenuTabs from "../../common/MenuTabs";
import MenuHeader from "../../common/MenuHeader";
import BackButton from "../../common/BackButton";
import TabFix from "../../common/TabFix";
import UserCard from "../../common/UserCard";
import {Button} from "@vkontakte/vkui";

import './Main.css';

const Task = ({id, hashtag, go}) => (
    <Panel id={id} theme="white">
        <MenuHeader headerTitle="Задача"/>
        <BackButton go={go} to="project"/>

        <TaskPreview go={go} image={eg} description="Задача №1" startDate="10.11.1993" endDate="11.11.1993" hashtag="task11" arrowVisibility="false"/>

        <Button className="chat-create" onClick={go} data-to="chat">Создать чат</Button>

        <p className="volunteer-list-header">Волонтёрский состав</p>
        <div className="volunteer-item">
            <UserCard />
        </div>
        <TabFix height="40px"/>
        <MenuTabs go={go}/>
    </Panel>
);

export default Task;