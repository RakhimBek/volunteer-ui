import React, {useState} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import MenuTabs from "../../common/MenuTabs";
import MenuHeader from "../../common/MenuHeader";
import UserCard from "../../common/UserCard";
import {Button, Cell, List, Tabs, TabsItem} from "@vkontakte/vkui";
import SearchComponent from "../../common/SearchComponent";
import Icon24BrowserForward from "@vkontakte/icons/dist/24/browser_forward"

import './Applications.css';

const Applications = ({id, go, role, activePanel}) => {
    const [tab,setTab] = useState(1);

    const NewApplications = ({go}) => (
        <div className="application-item">
            <div className="user-card-wrapper">
            <UserCard />
            <div className="forward-button" onClick={go} data-to="volunteer_profile_preview"><Icon24BrowserForward/></div>
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

    return(
        <Panel id={id} theme="white">
            <MenuHeader headerTitle="Заявки"/>

            <SearchComponent/>

            <List>
                <Cell>
                    <Tabs type="buttons">
                        <TabsItem data-name={1} onClick={()=>setTab(1)} selected={tab === 1}>
                                Новые заявки
                        </TabsItem >
                        <TabsItem data-name={2} onClick={()=>setTab(2)} selected={tab === 2}>
                                Одобренные заявки
                        </TabsItem>
                    </Tabs>
                </Cell>
            </List>
            {tab === 1 && <NewApplications go={go} />}
            {tab === 2 && <ApprovedApplications go={go}/>}


            <MenuTabs go={go} role={role} activePanel={activePanel}/>
        </Panel>
);
}
export default Applications;