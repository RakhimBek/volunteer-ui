import React from 'react';
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import SearchComponent from "../../common/SearchComponent";
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import {IOS, platform} from "@vkontakte/vkui";

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import AddTask from "./AddTask";
import TaskPreview from "./TaskPreview";

import eg from '../../img/play_24.png'

const osName = platform();

const Project = ({id, go}) => (
    <Panel id={id}>
        <PanelHeader
            left={<HeaderButton onClick={go} data-to="projects">
                {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
            </HeaderButton>}
        >
            Project Page Header
        </PanelHeader>

        <Div>
            <p>Задачи</p>
            <SearchComponent/>
            <AddTask/>
            <TaskPreview go={go} image={eg} description="Задача №1" startDate="10.11.1993" endDate="11.11.1993" hashtag="task11"/>
            <TaskPreview go={go} image={eg} description="Задача №2" startDate="11.11.1993" endDate="11.11.1993" hashtag="task12"/>
            <TaskPreview go={go} image={eg} description="Задача №3" startDate="12.11.1993" endDate="12.11.1993" hashtag="task13"/>
        </Div>
    </Panel>
);

export default Project;