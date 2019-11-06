import React, {useState, useEffect} from 'react';
import SearchComponent from "../../common/SearchComponent";
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

/*import TaskPreview from "./TaskPreview";
import eg from '../../img/play_24.png'*/

import MenuTabs from "../../common/MenuTabs";
import MenuHeader from "../../common/MenuHeader";
import {Button, Tabs, TabsItem, Cell, List, Checkbox} from "@vkontakte/vkui";
import Icon16Add from '@vkontakte/icons/dist/16/add';
import Icon24Add from '@vkontakte/icons/dist/24/add';

import axios from 'axios/dist/axios'
import Utils from "../../utils/utils"

import './Main.css';
import TabFix from "../../common/TabFix";


const Project = ({id, go, role, activePanel, tasks}) => {
    const [tab,setTab] = useState(1);
    const [checklist,setChecklist] = useState(1);

    const MyTasks = ({go}) => (
        <div>
            {role === "organizer" &&
                <div className="add-task">
                    <Button before={<Icon16Add/>} onClick={go} data-to="new_task">ДОБАВИТЬ</Button>
                </div>
            }
            {tasks}
        </div>
    );


    const ArchieveTasks = () =>(
        <h1 style={{padding:"20px"}}>Ты классный, как сыр колбасный ;)</h1>
    );

    useEffect(()=>{
        axios
            .get(Utils.path('project'))
            .then((response) => {

                setChecklist(response.data.map(function (array_element) {
                    return <Checkbox>{array_element.title}</Checkbox>
                }));
            })
    }, []);

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
                            Чек-лист
                        </TabsItem>
                        <TabsItem data-name={3} onClick={() => setTab(3)} selected={tab === 3}>
                            Архив
                        </TabsItem>
                    </Tabs>
                </Cell>
            </List>
            }

            {tab === 1 && <MyTasks go={go} />}
            {tab === 2 &&
            <div>
                <form className="check-list-form">
                    <input type="text" name="check-list-input" placeholder="Введите новую задачу сюда" className="check-list-input" />

                    <button type="submit" className="add-task-to-list-btn" onClick={console.log("click!")}> <Icon24Add /> </button>
                </form>
                <div className="check-list-items">
                    {checklist}
                </div>
            </div>}
            {tab === 3 && <ArchieveTasks go={go}/>}

        </div>
        <TabFix height="50px"/>
        <MenuTabs go={go} role={role} activePanel={activePanel}/>
    </Panel>
)};

export default Project;