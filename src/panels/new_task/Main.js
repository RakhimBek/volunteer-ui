import React, {useState} from "react";
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import MenuTabs from "../../common/MenuTabs";
import MenuHeader from "../../common/MenuHeader";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import Textarea from "@vkontakte/vkui/dist/components/Textarea/Textarea";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import BackButton from "../../common/BackButton";
import TabFix from "../../common/TabFix";
import Utils from "../../utils/utils";
import axios from 'axios/dist/axios';

const NewTask = ({id, go, projectId}) => {
    const [taskName, setTaskName] = useState("");

    const handleTaskName = (e) => {
        setTaskName(e.target.value);
        e.preventDefault();
    };

    const save = (e) => {
        const task = {
            "title": taskName,
            "description": "desc",
            "startDate": {
                "year": 2019,
                "month": 10,
                "dayOfMonth": 4,
                "hourOfDay": 0,
                "minute": 13,
                "second": 15
            }
        };

        axios
            .post(Utils.path('project/' + projectId + '/task'), task)
            .then(() => {
                console.log('Task.GOOD');
            })
            .catch((reason) => {
                console.log('Task.BAD');
            });

        e.preventDefault();
    };

    return (
        <Panel id={id} theme="white">
            <MenuHeader headerTitle="Новая задача"/>
            <BackButton go={go} to="project"/>
            <FormLayout>
                <Input top="Название проекта" onChange={handleTaskName}/>

                <Input top="Дата начала" type="date"/>
                <Input top="Дата окончания" type="date"/>

                <Textarea top="Описание мироприятия" placeholder="Группы,исполнители,композиторы"/>
                <Button size="xl" onClick={save}>Создать</Button>
            </FormLayout>
            <TabFix height="80px"/>
            <MenuTabs go={go}/>
        </Panel>
    );
};

export default NewTask;