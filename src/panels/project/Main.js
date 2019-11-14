import React, {useState, useEffect} from 'react';
import SearchComponent from "../../common/SearchComponent";
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

import MenuTabs from "../../common/MenuTabs";
import MenuHeader from "../../common/MenuHeader";
import {Button, Tabs, TabsItem, Cell, List} from "@vkontakte/vkui";
import Icon16Add from '@vkontakte/icons/dist/16/add';

import axios from 'axios/dist/axios'
import Utils from "../../utils/utils"

import './Main.css';
import TabFix from "../../common/TabFix";
import TaskPreview from "./TaskPreview";
import CheckList from "./CheckList";
import eg from "../../img/play_24.png";
import Debug from "../../Debug";

const Project = ({id, go, role, activePanel, projectId, setState}) => {
    const [tab, setTab] = useState("tasks");
    const [tasks, setTasks] = useState([]);

    const MyTasks = ({go}) => (
        <div>
            {role === "organizer" &&
            <div className="add-task">
                <Button className="add-task-to-project-button" before={<Icon16Add/>} onClick={go}
                        data-to="new_task">ДОБАВИТЬ</Button>
            </div>
            }
            {tasks}
        </div>
    );

    const ArchieveTasks = () => (
        <h1 style={{padding: "20px"}}>Ты классный, как сыр колбасный ;)</h1>
    );

    useEffect(() => {
        axios
            .get(Utils.path('project/' + projectId + '/task'))
            .then((response) => {
                console.log(response.data);
                // todo: paging
                setTasks(response.data.map((el, index) => {
                    console.log(el);
                    return <TaskPreview taskInfo={el}
                                        go={go}
                                        key={index}
                                        role={role}
                                        image={eg}
                                        description={el.description}
                                        startDate="10.11.1993"
                                        endDate="11.11.1993"
                                        hashtag={el.title}
                                        setState={setState}
                                        arrowButton/>
                }));
            })
            .catch((reason) => {
                Debug(reason);
            });

    }, [projectId, go, role, setState]);

    const tabs = {
        "tasks": <MyTasks go={go}/>,
        "checklist": <CheckList go={go} projectId={projectId}/>,
        "archive": <ArchieveTasks go={go}/>,
    };

    const chooseTab = (e) => {
        setTab(e.currentTarget.dataset.name);
        e.preventDefault();
    };

    return (
        <Panel id={id} theme="white">
            <div>
                <MenuHeader headerTitle="Задачи"/>
                <SearchComponent role={role}/>
                {role === "organizer" &&
                <List>
                    <Cell>
                        <Tabs type="buttons">
                            <TabsItem data-name="tasks" onClick={chooseTab} selected={tab === "tasks"}>
                                Мои задачи
                            </TabsItem>
                            <TabsItem data-name="checklist" onClick={chooseTab} selected={tab === "checklist"}>
                                Чек-лист
                            </TabsItem>
                            <TabsItem data-name="archive" onClick={chooseTab} selected={tab === "archive"}>
                                Архив
                            </TabsItem>
                        </Tabs>
                    </Cell>
                </List>
                }

                {tabs[tab]}
            </div>
            <TabFix height="50px"/>
            <MenuTabs go={go} role={role} activePanel={activePanel}/>
        </Panel>
    )
};

export default Project;