import React, {useState} from "react";
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import MenuTabs from "../../common/MenuTabs";
import MenuHeader from "../../common/MenuHeader";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import File from '@vkontakte/vkui/dist/components/File/File';
import Textarea from "@vkontakte/vkui/dist/components/Textarea/Textarea";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import axios from 'axios/dist/axios'
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import moment from "moment";
import Utils from "../../utils/utils"

import './Main.css';
import Debug from "../../Debug";
import ChooseCity from "./ChooseCity";

import Icon24Gallery from '@vkontakte/icons/dist/24/gallery';
import {useDispatch} from "react-redux";
import {NEW_PROJECT} from "../../store/constants";
import FormData from 'form-data'

const NewProject = ({id, go, role, userInfo}) => {
    const [projectTitle, setProjectTitle] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [cityId, setCityId] = useState(1);
    const [fileId, setFileId] = useState(0);
    const [downloadLabel, setDownloadLabel] = useState('Загрузить логотип');

    const dispatch = useDispatch();

    const handleCity = (e) => {
        const cityId = parseInt(e.target.value);
        setCityId(cityId);
    };

    const handleProjectTitle = (e) => {
        setProjectTitle(e.target.value);
    };

    const handleDescription = (e) => {
        console.log(e.target.value);
        setProjectDescription(e.target.value);
    };

    const handleAttachment = (e) => {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);

        axios
            .post(Utils.path('attachment'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data;',
                }
            })
            .then((response) => {
                console.log(response.data);
                setFileId(response.data.id);
                setDownloadLabel(response.data.fileName);
            })
            .catch((e) => {
                console.log(e);
            })
    };

    const send = (e) => {
        // todo: вытаскивать из полей
        let now = moment();
        axios
            .post(Utils.path('volunteer/' + userInfo.id + '/project'), {
                title: projectTitle,
                description: projectDescription,
                startDate: {
                    year: now.year(),
                    month: now.month(),
                    dayOfMonth: now.day(),
                    hourOfDay: now.hour(),
                    minute: now.minute(),
                    second: now.second()
                },
                endDate: {
                    year: now.year(),
                    month: now.month(),
                    dayOfMonth: now.day(),
                    hourOfDay: now.hour(),
                    minute: now.minute(),
                    second: now.second()
                },
                cityId: cityId,
                fileId: fileId
            })
            .then((response) => {
                dispatch({
                    type: NEW_PROJECT,
                    data: response.data
                });
            })
            .catch((reason) => {
                Debug(reason);
            });

        go(e);
    };

    return (
        <Panel id={id} theme="white">
            <main>
                <MenuHeader headerTitle="Новый проект" closeButton={true}/>

                <FormLayout className="project-create-settings">
                    <Input top="Название проекта" onChange={handleProjectTitle}/>
                    <ChooseCity onChange={handleCity}/>
                    <div className="project-duration">
                        <Input className="date-input" top="Дата начала" type="date"/>
                        <Input className="date-input" top="Дата окончания" type="date"/>
                    </div>
                    <Textarea top="Описание мироприятия" placeholder="" onChange={handleDescription}/>
                    <File className="pick-bg-image" before={<Icon24Gallery/>} size="xl" onChange={handleAttachment}>
                        {downloadLabel}
                    </File>
                    <Button size="xl" className="project-create-button" onClick={send}
                            data-to="projects">Создать</Button>
                    <Div/>
                </FormLayout>
            </main>
            <MenuTabs go={go} role={role}/>
        </Panel>
    );
};

export default NewProject;