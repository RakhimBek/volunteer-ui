import React, {useState} from "react";
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import MenuTabs from "../../common/MenuTabs";
import MenuHeader from "../../common/MenuHeader";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import Textarea from "@vkontakte/vkui/dist/components/Textarea/Textarea";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import TabFix from "../../common/TabFix";
import Utils from "../../utils/utils";
import axios from 'axios/dist/axios';

import './Main.css';

const NewTask = ({id, go, projectId, setState, role}) => {
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

        go(e);
        e.preventDefault();
    };

    return (
        <Panel id={id} theme="white">
            <MenuHeader headerTitle="Новая задача" closeButton/>
            <FormLayout className="project-create-settings">
                <Input top="Название задачи" onChange={handleTaskName}/>
                <div className="project-duration">
                    <Input className="date-input" top="Дата начала" type="date"/>
                    <Input className="date-input" top="Дата окончания" type="date"/>
                </div>
                <Textarea top="Описание мироприятия" placeholder="Группы,исполнители,композиторы"/>
                <Button size="xl" onClick={save} data-to="project">Создать</Button>
            </FormLayout>
            <TabFix height="80px"/>
            <MenuTabs go={go} role={role}/>
        </Panel>
    );
};

export default NewTask;