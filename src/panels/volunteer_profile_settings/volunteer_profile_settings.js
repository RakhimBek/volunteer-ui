import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import MenuHeader from "../../common/MenuHeader";
import UserCard from "../../common/UserCard";

import './volunteer_profile_settings.css';
import {FormLayout, Input, Select, Textarea, Button} from "@vkontakte/vkui";

const VolunteerProfileSettings = ({id, go, role, activePanel, userInfo}) => {

    return (
        <Panel id={id} theme="white">
            <MenuHeader headerTitle="Настройки"/>
            <div className="volunteer-profile-settings">
                <UserCard userInfo={userInfo} size="80px"/>
                <FormLayout>
                    <Input top="Город" onChange=""/>
                    <Input className="date-input" top="Дата рождения" type="date"/>
                    <Select top="Пол">
                        <option value="m">Мужской</option>
                        <option value="f">Женский</option>
                    </Select>
                    <Input top="Телефон" onChange=""/>
                    <Input top="E-mail" onChange=""/>
                    <Input top="Ссылка на книжку волонтёра" onChange=""/>
                    <Input top="Место работы" onChange=""/>
                    <Select top="Размер одежды">
                        <option value="s">S</option>
                        <option value="m">M</option>
                        <option value="l">L</option>
                    </Select>
                    <Select top="Размер обуви">
                        <option value="s">S</option>
                        <option value="m">M</option>
                        <option value="l">L</option>
                    </Select>
                    <Textarea top="О себе"/>
                    <Button className="volunteer-profile-save-button" size="xl">Сохранить</Button>
                </FormLayout>
            </div>
        </Panel>
    )
};

export default VolunteerProfileSettings;