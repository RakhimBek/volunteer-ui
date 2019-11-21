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
import Debug from "../../Debug";
import {useDispatch} from "react-redux";
import {NEW_TASK} from "../../store/constants";

const NewTask = ({id, go, projectId, setState, role}) => {
    const dispatch = useDispatch();
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [startDateString, setStartDate] = useState("");
    const [endDateString, setEndDate] = useState("");

    const handleTaskName = (e) => {
        setTaskName(e.target.value);
    };

    const handleTaskDescription = (e) => {
        setTaskDescription(e.target.value);
    };

    const handleStartDate = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDate = (e) => {
        setEndDate(e.target.value);
    };

    const save = (e) => {
        const startDate = startDateString.split("-").map(el => parseInt(el));
        const endDate = endDateString.split("-").map(el => parseInt(el));
        const task = {
            title: taskName,
            description: taskDescription,
            startDate: {
                year: startDate[0],
                month: startDate[1],
                dayOfMonth: startDate[2],
                hourOfDay: 0,
                minute: 0,
                second: 0
            },
            endDate: {
                year: endDate[0],
                month: endDate[1],
                dayOfMonth: endDate[2],
                hourOfDay: 0,
                minute: 0,
                second: 0
            }
        };

        axios
            .post(Utils.path('project/' + projectId + '/task'), task)
            .then((response) => {
                dispatch({
                    type: NEW_TASK,
                    projectId: projectId,
                    taskData: response.data
                });
            })
            .catch((reason) => {
                Debug(reason);
            });

        go(e);
        e.preventDefault();
    };

    return (
        <Panel id={id} theme="white">
            <MenuHeader headerTitle="Новая задача" closeButton/>
            <FormLayout className="project-create-settings">
                <Input top="Название задачи"
                       onChange={handleTaskName}
                       status={taskName ? "valid" : "error"}
                />

                <Input className="date-input"
                       top="Дата начала"
                       type="date"
                       onChange={handleStartDate}
                       status={startDateString ? "valid" : "error"}
                />
                <Input className="date-input"
                       top="Дата окончания" type="date"
                       onChange={handleEndDate}
                       status={endDateString ? "valid" : "error"}
                />

                <Textarea top="Описание мироприятия" placeholder="Группы,исполнители,композиторы"
                          onChange={handleTaskDescription}
                          status={taskDescription ? "valid" : "error"}/>
                <Button className="task-create-button" size="xl" onClick={save} data-to="project">Создать</Button>
            </FormLayout>
            <TabFix height="80px"/>
            <MenuTabs go={go} role={role}/>
        </Panel>
    );
};

export default NewTask;