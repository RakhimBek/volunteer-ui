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

const Task = ({id, hashtag, go, role, taskId}) => {

    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        axios
            .get(Utils.path('task/' + taskId + '/volunteer'))
            .then((response) => {
                let list = [];
                response.data.forEach((el, index) => {
                    list.push(<UserCard userInfo={el}/>);
                });
                setParticipants(list);
            })
            .catch((reason) => {
                Debug(reason);
            });
    }, [setParticipants, taskId]);

    return (
        <Panel id={id} theme="white">
            <MenuHeader headerTitle="Задача" closeButton/>

            <TaskPreview taskInfo={{title: "Ohhh"}} role={role} go={go} image={eg} description="Задача №1" startDate="10.11.1993"
                         endDate="11.11.1993" hashtag="task11"/>

            {role === "organizer" &&
            <Button className="chat-create" onClick={go} data-to="chat">Создать чат</Button>
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