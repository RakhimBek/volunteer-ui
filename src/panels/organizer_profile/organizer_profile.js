import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import MenuTabs from "../../common/MenuTabs";
import MenuHeader from "../../common/MenuHeader";
import UserCard from "../../common/UserCard";
import {Button} from "@vkontakte/vkui";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import Textarea from "@vkontakte/vkui/dist/components/Textarea/Textarea";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";

import './organizer_profile.css';
import Accordeon from "../../common/Accordion";
import TabFix from "../../common/TabFix";

const OrganizerProfile = ({id, go, role, activePanel, userInfo}) => {
    console.log('Org:');
    console.log(userInfo);

    return(
        <Panel id={id} theme="white">
            <MenuHeader headerTitle="Организатор"/>
            <div className="organizer-profile">
                <UserCard userInfo={userInfo}/>
                <Button className="organizer-profile-settings-button">Настройки</Button>
            </div>
            <Accordeon title="Настройки проекта">
            <FormLayout>
                <Input top="Название проекта"/>
                <Input top="Город проведения" />
                <div className="project-duration">
                    <Input top="Дата начала" type="date"/>
                    <Input top="Дата окончания" type="date"/>
                </div>
                <Textarea top="Описание мироприятия" placeholder=""/>
                <Button size="xl" className="project-save-edits-button" data-to="projects">Сохранить</Button>
            </FormLayout>
            </Accordeon>
            <TabFix height="60px"/>
            <MenuTabs go={go} role={role} activePanel={activePanel}/>
        </Panel>
    )
}

export default OrganizerProfile;