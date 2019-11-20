import React, {useState} from "react";
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import MenuTabs from "../../common/MenuTabs";
import MenuHeader from "../../common/MenuHeader";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import File from '@vkontakte/vkui/dist/components/File/File';
import Textarea from "@vkontakte/vkui/dist/components/Textarea/Textarea";
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';

import axios from 'axios/dist/axios'
import Div from "@vkontakte/vkui/dist/components/Div/Div";
//import moment from "moment";
import Utils from "../../utils/utils"

import './Main.css';
import Debug from "../../Debug";
import ChooseCity from "./ChooseCity";

import Icon24Gallery from '@vkontakte/icons/dist/24/gallery';
import {useDispatch} from "react-redux";
import {NEW_PROJECT} from "../../store/constants";
import FormData from 'form-data'
import {Alert} from "@vkontakte/vkui";

const NewProject = ({id, go, role, userInfo, UpdatePopout}) => {
    const [projectTitle, setProjectTitle] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [cityId, setCityId] = useState(1);
    const [fileId, setFileId] = useState(0);
    const [startDateString, setStartDate] = useState("");
    const [endDateString, setEndDate] = useState("");
    const [downloadLabel, setDownloadLabel] = useState('Загрузить логотип');
    const actions = [{
        title: 'Ок',
        autoclose: true,
        style: 'cancel'
    }];

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

    const handleStartDate = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDate = (e) => {
        setEndDate(e.target.value);
    };

    const handleAttachment = (e) => {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);

        UpdatePopout(<ScreenSpinner size='large'/>);
        axios
            .post(Utils.path('attachment'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data;',
                }
            })
            .then((response) => {
                UpdatePopout(null);
                setFileId(response.data.id);
                setDownloadLabel(response.data.fileName);
            })
            .catch((e) => {

                UpdatePopout(
                    <Alert actions={actions} onClose={() => UpdatePopout(null)}>
                        <p className="alert-header">Внимение</p>
                        <p className="alert-message">Файл должен быть менее 2 Мб.</p>
                    </Alert>
                );
            });
    };

    const send = (e) => {
        // todo: вытаскивать из полей
        const startDate = startDateString.split("-").map(el => parseInt(el));
        const endDate = endDateString.split("-").map(el => parseInt(el));
        axios
            .post(Utils.path('volunteer/' + userInfo.id + '/project'), {
                title: projectTitle,
                description: projectDescription,
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

                <FormLayout className="project-create-settings" onSubmit={send}>
                    <Input top="Название проекта" onChange={handleProjectTitle} required/>
                    <ChooseCity onChange={handleCity}/>
                    <div className="project-duration">
                        <Input className="date-input" top="Дата начала" type="date" onChange={handleStartDate} required/>
                        <Input className="date-input" top="Дата окончания" type="date" onChange={handleEndDate} required/>
                    </div>
                    <Textarea top="Описание мироприятия" placeholder="" onChange={handleDescription} required />
                    <File className="pick-bg-image" before={<Icon24Gallery/>} size="xl" onChange={handleAttachment}>
                        {downloadLabel}
                    </File>

                    <input type="submit" className="project-create-button" data-to="projects"/>
                    <Div/>
                </FormLayout>
            </main>
            <MenuTabs go={go} role={role}/>
        </Panel>
    );
};

export default NewProject;