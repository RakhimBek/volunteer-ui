import React from "react";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import {IOS, platform} from "@vkontakte/vkui";

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osName = platform();

const NewProject = ({id, go}) => (
    <Panel id={id}>
        <PanelHeader
            left={<HeaderButton onClick={go} data-to="projects">
                {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
            </HeaderButton>}
        >
            New Project Page Header
        </PanelHeader>

        <Div>
            <p>Название проекта</p>
            <input/>

            <p>Город проведения</p>
            <input/>

            <p>Дата начала</p>
            <select>
                <option value="10.10.11">10.10.11</option>
                <option value="11.10.11">11.10.11</option>
                <option value="12.10.11">12.10.11</option>
            </select>

            <p>Дата окончания</p>
            <select>
                <option value="10.10.11">10.10.11</option>
                <option value="11.10.11">11.10.11</option>
                <option value="12.10.11">12.10.11</option>
            </select>

            <p>Описание мироприятия</p>
            <textarea placeholder="группы,исполнители,композиторы"/>
        </Div>
    </Panel>
);

export default NewProject;