import React from "react";
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import MenuTabs from "../../common/MenuTabs";
import MenuHeader from "../../common/MenuHeader";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import Textarea from "@vkontakte/vkui/dist/components/Textarea/Textarea";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import BackButton from "../../common/BackButton";


const NewProject = ({id, go}) => (
    <Panel id={id} theme="white">
        <MenuHeader headerTitle="Новый проект"/>
        <BackButton go={go} to="projects"/>
        <FormLayout>
            <Input top="Название проекта" />
            <Input top="Город проведения" />



            <Input top="Дата начала" type="date"/>
            <Input top="Дата окончания" type="date"/>


            <Textarea top="Описание мироприятия" placeholder="Группы,исполнители,композиторы"/>
            <Button size="xl">Создать</Button>
        </FormLayout>


        <MenuTabs go={go}/>
    </Panel>
);

export default NewProject;