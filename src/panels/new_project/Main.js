import React, {useState} from "react";
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import MenuTabs from "../../common/MenuTabs";
import MenuHeader from "../../common/MenuHeader";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import Textarea from "@vkontakte/vkui/dist/components/Textarea/Textarea";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import BackButton from "../../common/BackButton";
import axios from 'axios/dist/axios'
import Div from "@vkontakte/vkui/dist/components/Div/Div";

const NewProject = ({id, go}) => {
    const [projectTitle, setProjectTitle] = useState("");
    const [city, setCity] = useState("");

    const send = (e) => {
        let currentDate = new Date()
        axios
            .post('https://raimbek-rakhimbekov.ru:8080/zz/test-api/project', {
                title: projectTitle,
                "startDate": {
                    "year": currentDate.getFullYear(),
                    "month": currentDate.getMonth(),
                    "dayOfMonth": currentDate.getDate(),
                    "hourOfDay": currentDate.getHours(),
                    "minute": currentDate.getMinutes(),
                    "second": currentDate.getMinutes()
                },
                "city": city
            })
            .then((response) => {
                console.log('Good');
            })
            .catch(() => {
                console.log('Not Good.');
            });

        go(e);
    };

    return (
        <Panel id={id} theme="white">
            <main>
                <MenuHeader headerTitle="Новый проект"/>
                <BackButton go={go} to="projects"/>
                <FormLayout>
                    <Input top="Название проекта" onChange={e => setProjectTitle(e.target.value)}/>
                    <Input top="Город проведения" onChange={e => setCity(e.target.value)}/>
                    <Input top="Дата начала" type="date"/>
                    <Input top="Дата окончания" type="date"/>
                    <Textarea top="Описание мироприятия" placeholder="Группы,исполнители,композиторы"/>
                    <Button size="xl" onClick={send} data-to="projects">Создать</Button>
                    <Div/>
                </FormLayout>
            </main>
            <MenuTabs go={go}/>
        </Panel>
    );
};

export default NewProject;