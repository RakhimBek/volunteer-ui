import React, {useState, useEffect} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import TaskPreview from "../project/TaskPreview";
import eg from "../../img/play_24.png";
import MenuTabs from "../../common/MenuTabs";
import MenuHeader from "../../common/MenuHeader";
import TabFix from "../../common/TabFix";
import UserCard from "../../common/UserCard";
import {Button} from "@vkontakte/vkui";

import './Main.css';
import Utils from "../../utils/utils";
import axios from 'axios/dist/axios'
import Debug from "../../Debug";

const Task = ({id, hashtag, go, role, projectId, state}) => {

    const [participants, setParticipants] = useState([]);

    const chat = (e) => {
        axios
            .get(Utils.path('project/' + projectId + '/chat'))
            .then((response) => {
                //проверка на существование чата, если нет - создаём
                if(response.data.filter(el => el.name === state.taskName).length === 0){
                    /*axios
                        .post(Utils.path('project/' + projectId + '/chat'), {
                            "name": state.taskName,
                            "notificationsEnabled": true
                        });*/
                }
            })
            .catch((reason) => {
                Debug(reason);
            });
        //переход к чату
        go(e);
    };

    useEffect(() => {
        axios
            .get(Utils.path('task/' + state.taskInfo.id + '/volunteer'))
            .then((response) => {
                setParticipants(response.map((el) => {
                    return (
                        <UserCard userInfo={el}/>
                    );
                }));
            })
            .catch((reason) => {
                Debug(reason);
            });
    }, [setParticipants, state.taskInfo.id]);

    return (
        <Panel id={id} theme="white">
            <MenuHeader headerTitle="Задача" closeButton/>
            <TaskPreview taskInfo={state.taskInfo} role={role} go={go} image={eg} hashtag="task11"/>

            {role === "organizer" &&
            <Button className="chat-create" onClick={chat} data-to="chat">Создать чат</Button>
            }

            <p className="volunteer-list-header">Волонтёрский состав</p>
            <div className="volunteer-item" onClick={go} data-to="volunteer_profile_preview">
                {participants}
            </div>

            <TabFix height="40px"/>
            <MenuTabs go={go} role={role}/>
        </Panel>
    );
};

export default Task;