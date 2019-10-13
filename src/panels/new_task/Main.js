import React from "react";
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import MenuTabs from "../../common/MenuTabs";
import LongButton from "../../common/LongButton";

const NewTask = ({id, go}) => (
    <Panel id={id}>

        <p>Название проекта</p>
        <input/>

        <p>Количество волонтеров</p>
        <input/>

        <p>Время начала</p>
        <select>
            <option value="10.10.11">10.10.11</option>
            <option value="11.10.11">11.10.11</option>
            <option value="12.10.11">12.10.11</option>
        </select>

        <p>Время окончания</p>
        <select>
            <option value="10.10.11">10.10.11</option>
            <option value="11.10.11">11.10.11</option>
            <option value="12.10.11">12.10.11</option>
        </select>

        <p>Описание </p>
        <textarea placeholder="группы,исполнители,композиторы"/>

        <LongButton/>
        <MenuTabs go={go}/>
    </Panel>
);

export default NewTask;