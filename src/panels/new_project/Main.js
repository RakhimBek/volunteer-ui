import React from "react";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import MenuTabs from "../../common/MenuTabs";

const NewProject = ({id, go}) => (
    <Panel id={id}>

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

        <MenuTabs go={go}/>
    </Panel>
);

export default NewProject;