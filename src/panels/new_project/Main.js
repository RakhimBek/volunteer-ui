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
                "city":  {"name": city }
            })
            .then((response) => {
                console.log(response.data);
                console.log('volunteer/' + userInfo.id + '/project/' + response.data.id);
            })
            .catch((reason) => {
                console.log('New Project. Bad: ' + reason);
            });

        go(e);
    };

    return (
        <Panel id={id} theme="white">
            <main>
                <MenuHeader headerTitle="Новый проект" closeButton={true}/>

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
            <MenuTabs go={go} role={role}/>
        </Panel>
    );
};

export default NewProject;