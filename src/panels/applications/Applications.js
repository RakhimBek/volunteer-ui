import React, {useState, useEffect} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import MenuTabs from "../../common/MenuTabs";
import MenuHeader from "../../common/MenuHeader";
import UserCard from "../../common/UserCard";
import {Button, Cell, List, Tabs, TabsItem} from "@vkontakte/vkui";
import SearchComponent from "../../common/SearchComponent";
import Icon24BrowserForward from "@vkontakte/icons/dist/24/browser_forward"
import axios from 'axios/dist/axios'

import './Applications.css';
import Utils from "../../utils/utils";
import Debug from "../../Debug";

const Applications = ({id, go, role, activePanel, userInfo, projectId}) => {
    const [tab, setTab] = useState(0);
    const [requestsData, setRequestsData] = useState([]);

    const Request = ({go, applicant}) => (
        <div className="application-item">
            <div className="user-card-wrapper">
                <UserCard userInfo={applicant}/>
                <div className="forward-button" onClick={go} data-to="volunteer_profile_preview">
                    <Icon24BrowserForward/>
                </div>
            </div>
            <div className="buttons">
                <Button className="button accept" onClick={go} data-to="projects">Принять</Button>
                <Button className="button decline" onClick={go} data-to="projects">Отклонить</Button>
            </div>
        </div>
    );

    const ApprovedApplications = ({go}) => (
        <div className="messages">
            <div className="message-item">
                <p className="message-text">Одобренных заявок нет </p>
            </div>
        </div>
    );

    useEffect(() => {
        axios
            .get(Utils.path('project/' + projectId +'/request'))
            .then((response) => {
                setRequestsData(response.data);
            })
            .catch((reason) => {
                Debug(reason);
            });
    }, []);

    const ProjectRequests = ({accepted}) => {
        console.log(requestsData);
        return requestsData
            .filter((el) => {
                return el.accepted === accepted;
            })
            .map((el, index) => {
            return (
                <Request key={index} go={go} applicant={el.id.volunteer}/>
            );
        });
    };

    const tabs = [
        <ProjectRequests accepted={false}/>,
        <ProjectRequests accepted={true}/>
    ];

    return (
        <Panel id={id} theme="white">
            <MenuHeader headerTitle="Заявки"/>

            <SearchComponent/>

            <List>
                <Cell>
                    <Tabs type="buttons">
                        <TabsItem data-name={0} onClick={() => setTab(0)} selected={tab === 0}>
                            Новые заявки
                        </TabsItem>
                        <TabsItem data-name={1} onClick={() => setTab(1)} selected={tab === 1}>
                            Одобренные заявки
                        </TabsItem>
                    </Tabs>
                </Cell>
            </List>

            {tabs[tab]}

            <MenuTabs go={go} role={role} activePanel={activePanel}/>
        </Panel>
    );
};

export default Applications;