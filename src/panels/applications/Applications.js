import React, {useState} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import MenuTabs from "../../common/MenuTabs";
import MenuHeader from "../../common/MenuHeader";
import BackButton from "../../common/BackButton";
import UserCard from "../../common/UserCard";
import './Applications.css';
import {Button, Cell, List, Tabs, TabsItem} from "@vkontakte/vkui";
import SearchComponent from "../../common/SearchComponent";

const Applications = ({id, go}) => {
    const [tab,setTab] = useState(1);

    const NewApplications = ({go}) => (
        <div>
            <UserCard />
            <Button className="accept" onClick={go} data-to="projects">Принять</Button>
            <Button className="decline" onClick={go} data-to="projects">Отклонить</Button>
        </div>
    );

    const ApprovedApplications = ({go}) => (
        <div className="messages">
            <div className="message-item">
                <p className="message-author">Валерий Петрович</p>
                <p className="message-text">Превеееееед, медвед! </p>
            </div>
        </div>
    );

    return(
        <Panel id={id} theme="white">
            <MenuHeader headerTitle="Заявки"/>
            <BackButton go={go} to="project"/>

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


            <MenuTabs go={go}/>
        </Panel>
);
}
export default Applications;