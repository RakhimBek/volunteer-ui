import React from 'react';
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import TaskPreview from "../project/TaskPreview";
import eg from "../../img/play_24.png";
import {IOS, platform} from "@vkontakte/vkui";

const osName = platform();

const Task = ({id, hashtag, go}) => (
    <Panel id={id}>
        <PanelHeader
            left={<HeaderButton onClick={go} data-to="project">
                {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
            </HeaderButton>}
        >
            Task Page Header
        </PanelHeader>

        <Div>
            <p>Задача {hashtag}</p>
            <TaskPreview go={go} image={eg} description="Задача №1" startDate="10.11.1993" endDate="11.11.1993" hashtag="task11"/>
        </Div>
    </Panel>
);

export default Task;