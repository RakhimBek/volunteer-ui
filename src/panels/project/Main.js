import React, {useState} from 'react';
import SearchComponent from "../../common/SearchComponent";
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

import TaskPreview from "./TaskPreview";

import eg from '../../img/play_24.png'
import MenuTabs from "../../common/MenuTabs";
import MenuHeader from "../../common/MenuHeader";
import {Button, Tabs, TabsItem, Cell, List} from "@vkontakte/vkui";
import Icon16Add from '@vkontakte/icons/dist/16/add';

import './Main.css';
import TabFix from "../../common/TabFix";


const Project = ({id, go, role}) => {
    const [tab,setTab] = useState(1);
    const MyTasks = ({go}) => (
        <div>
            {role === "organizer" &&
                <div className="add-task">
                    <Button before={<Icon16Add/>} onClick={go} data-to="new_task">ДОБАВИТЬ</Button>
                </div>
            }
            <TaskPreview go={go} role={role} image={eg} description="Уважаемые волонтёры! Нам нужно 3 человека в гардероб. Работа с 9:00." startDate="10.11.1993" endDate="11.11.1993" hashtag="#гардероб" arrowVisibility=""/>
            <TaskPreview go={go} role={role} image={eg} description="Задача №2" startDate="11.11.1993" endDate="11.11.1993" hashtag="task12"/>
            <TaskPreview go={go} role={role} image={eg} description="Задача №3" startDate="12.11.1993" endDate="12.11.1993" hashtag="task13"/>
        </div>
    );

    const ArchieveTasks = () =>(
        <h1 style={{padding:"20px"}}>Ты классный, как сыр колбасный ;)</h1>
    );

    return(
    <Panel id={id} theme="white">
        <div>
            <MenuHeader headerTitle="Задачи"/>
            <SearchComponent role={role}/>
            {role === "organizer" &&
            <List>
                <Cell>
                    <Tabs type="buttons">
                        <TabsItem data-name={1} onClick={() => setTab(1)} selected={tab === 1}>
                            Мои задачи
                        </TabsItem>
                        <TabsItem data-name={2} onClick={() => setTab(2)} selected={tab === 2}>
                            Архив
                        </TabsItem>
                    </Tabs>
                </Cell>
            </List>
            }

            {tab === 1 && <MyTasks go={go} />}
            {tab === 2 && <ArchieveTasks go={go}/>}

        </div>
        <TabFix height="50px"/>
        <MenuTabs go={go}/>
    </Panel>
)};

export default Project;