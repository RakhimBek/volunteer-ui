import React, {useState, useEffect} from 'react';
import "./ProjectDescription.css"
import MenuHeader from "../../common/MenuHeader";
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import TaskCounters from "../../common/TaskCounters";
import {Alert} from "@vkontakte/vkui";
import ShareButton from "../../common/ShareButton";
import Utils from "../../utils/utils";
import Debug from "../../Debug";
import axios from 'axios/dist/axios';


const ProjectDescription = ({id, go, UpdatePopout, projectId, volunteerId}) => {
    const [applyStatus, setApplyStatus] = useState(true);
    const [projectData, setProjectData] = useState({});

    const makeRequest = () => {
        axios
            .post(Utils.path('volunteer/' + volunteerId + '/project/' + projectId + '/request'), {
                accepted: false
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((reason) => {
                Debug(reason);
            });
    };

    const Apply = (e) => {
        const actions = [{
            title: 'Ок',
            autoclose: true,
            style: 'cancel'
        }];

        UpdatePopout(
            <Alert actions={actions} onClose={() => UpdatePopout(null)}>
                <p className="alert-header">Заявка отправлена</p>
                <p className="alert-message">Спасибо за проявленное желание поучаствовать в нашем мероприятии! Мы
                    рассмотрим вашу заявку в ближайшее время</p>
            </Alert>
        );
        setApplyStatus(!applyStatus);

        makeRequest();
    };

    const Withdraw = () => {
        setApplyStatus(false);
    };

    useEffect(() => {
        axios
            .get(Utils.path('project/' + projectId))
            .then((response) => {
                setProjectData(response.data);
            })
            .catch((reason) => {
                Debug(reason);
            });

    }, [projectId]);

    return (
        <Panel id={id} theme="white">
            <MenuHeader headerTitle="Описание проекта" closeButton/>
            <div className="project-description-wrapper">
                <p className="project-description-text">{projectData.description}</p>

                <div className="project-description-buttons">
                    {applyStatus === true &&
                    <button className="apply-project-button" onClick={Apply}>Подать заявку</button>
                    }
                    {applyStatus === false &&
                    <button className="withdraw-project-button" onClick={() => Withdraw()}>Отменить заявку</button>
                    }
                    <ShareButton/>
                </div>
                <TaskCounters className="counters"/>
                <button onClick={go} data-to="project">[если одобрили (это временная кнопока)]</button>
            </div>
        </Panel>
    );
};

export default ProjectDescription;