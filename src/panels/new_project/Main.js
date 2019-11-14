import React, {useState} from "react";
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import MenuTabs from "../../common/MenuTabs";
import MenuHeader from "../../common/MenuHeader";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import Textarea from "@vkontakte/vkui/dist/components/Textarea/Textarea";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import axios from 'axios/dist/axios'
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import moment from "moment";
import Utils from "../../utils/utils"

import './Main.css';
import Debug from "../../Debug";

const NewProject = ({id, go, role, userInfo}) => {
    const [projectTitle, setProjectTitle] = useState("");
    const [city, setCity] = useState("");

    const send = (e) => {
        // todo: вытаскивать из полей
        let now = moment();
        axios
            .post(Utils.path('volunteer/' + userInfo.id + '/project'), {
                title: projectTitle,
                "startDate": {
                    "year": now.year(),
                    "month": now.month(),
                    "dayOfMonth": now.day(),
                    "hourOfDay": now.hour(),
                    "minute": now.minute(),
                    "second": now.second()
                },
            })
            .then((response) => {
                console.log(response.data);
                console.log('volunteer/' + userInfo.id + '/project/' + response.data.id);
            })
            .catch((reason) => {
                Debug(reason);
            });

        go(e);
    };


    console.log(city);
    return (
        <Panel id={id} theme="white">
            <main>
                <MenuHeader headerTitle="Новый проект" closeButton={true}/>

                <FormLayout className="project-create-settings">
                    <Input top="Название проекта" onChange={e => setProjectTitle(e.target.value)}/>
                    <Input top="Город проведения" onChange={e => setCity(e.target.value)}/>
                    <div className="project-duration">
                        <Input className="date-input" top="Дата начала" type="date"/>
                        <Input className="date-input" top="Дата окончания" type="date"/>
                    </div>
                    <Textarea top="Описание мироприятия" placeholder="Группы,исполнители,композиторы"/>
                    <Input type="file"/>
                    <Button size="xl" className="project-create-button" onClick={send} data-to="projects">Создать</Button>
                    <Div/>
                </FormLayout>
            </main>
            <MenuTabs go={go} role={role}/>
        </Panel>
    );
};

export default NewProject;