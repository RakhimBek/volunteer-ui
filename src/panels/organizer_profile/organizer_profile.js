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

const OrganizerProfile = ({id, go, role}) => {
    return(
        <Panel id={id} theme="white">
            <MenuHeader headerTitle="Организатор"/>
            <div className="organizer-profile">
                <UserCard/>
                <Button>Настройки</Button>
            </div>
            <Accordeon title="Настройки проекта">
            <FormLayout>
                <Input top="Название проекта"/>
                <Input top="Город проведения" />
                <Input top="Дата начала" type="date"/>
                <Input top="Дата окончания" type="date"/>
                <Textarea top="Описание мироприятия" placeholder="Группы,исполнители,композиторы"/>
                <Button size="xl" data-to="projects">Создать</Button>
            </FormLayout>
            </Accordeon>
            <MenuTabs go={go} role={role}/>
        </Panel>
    )
}

export default OrganizerProfile;