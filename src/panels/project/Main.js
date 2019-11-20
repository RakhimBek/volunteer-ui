import React, {useState} from 'react';
import SearchComponent from "../../common/SearchComponent";
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

import MenuTabs from "../../common/MenuTabs";
import MenuHeader from "../../common/MenuHeader";
import {Tabs, TabsItem, Cell, HorizontalScroll} from "@vkontakte/vkui";

import './Main.css';
import TabFix from "../../common/TabFix";
import CheckList from "./CheckList";
import TaskPreviewList from "./TaskPreviewList";

const Project = ({id, go, role, activePanel, projectId, setState}) => {
    const [tab, setTab] = useState("tasks");

    const ArchieveTasks = () => (
        <h1 style={{padding: "20px"}}> Скоро будет :)</h1>
    );

    const tabs = {
        "tasks": <TaskPreviewList go={go} role={role} setState={setState} projectId={projectId}/>,
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
                    <Cell className="tabs-header-wrapper">
                        <HorizontalScroll>
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
                        </HorizontalScroll>
                    </Cell>
                }

                {tabs[tab]}
            </div>
            <TabFix height="50px"/>
            <MenuTabs go={go} role={role} activePanel={activePanel}/>
        </Panel>
    )
};

export default Project;