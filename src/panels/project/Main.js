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
import TaskPreview from "./TaskPreview";
import eg from "../../img/play_24.png";


const Project = ({id, go, role, activePanel, projectId, setState}) => {
    const [tab, setTab] = useState(1);
    const [checklist, setChecklist] = useState(1);
    const [tasks, setTasks] = useState([]);
    const [checked, setChecked] = useState([]);
    const MyTasks = ({go}) => (
        <div>
            {role === "organizer" &&
            <div className="add-task">
                <Button className="add-task-to-project-button" before={<Icon16Add/>} onClick={go} data-to="new_task">ДОБАВИТЬ</Button>
            </div>
            }
            {tasks}
        </div>
    );

    let status_list = [];
    const handleCheck = (e) => {
        let note_status = true;
        if (e.currentTarget.dataset.completed === "false"){
            note_status = false;
        }
        const note_edit = {
            "id": e.currentTarget.dataset.id,
            "text": e.currentTarget.dataset.text,
            "category": { "id": e.currentTarget.dataset.id, "name": e.currentTarget.dataset.category },
            "completed": !note_status,
        };
        status_list[e.currentTarget.dataset.i] = note_edit.completed;
        setChecked(status_list);
        axios
            .post(Utils.path('project/' + projectId + '/note'), note_edit)
            .then(() => {
            })
            .catch((reason) => {
            });
    };

    const ArchieveTasks = () => (
        <h1 style={{padding: "20px"}}>Ты классный, как сыр колбасный ;)</h1>
    );

    useEffect(() => {
        axios
            .get(Utils.path('project/' + projectId + '/task'))
            .then((response) => {
                console.log(response.data);
                // todo: paging
                let list = [];
                response.data.forEach((el, index) => {
                    /*let toDate = [el.startDate.dayOfMonth, el.startDate.month, el.startDate.year].reduce((l, r) => l + "." + r);*/

                    console.log(el);
                    list.push(<TaskPreview taskInfo={el}
                                           go={go}
                                           key={index}
                                           role={role}
                                           image={eg}
                                           description={el.description}
                                           startDate="10.11.1993"
                                           endDate="11.11.1993"
                                           hashtag={el.title}
                                           setState={setState}
                                           arrowButton/>);
                });
                setTasks(list);
            })
            .catch((e) => {
                console.log('fail: project/' + projectId + '/task');
                console.log(e);
            });

        axios
            .get(Utils.path('project/' + projectId + '/note'))
            .then((response) => {
                setChecklist(response.data.map(function (array_element, i) {
                    status_list.push(array_element.completed);

                    return <Checkbox onChange={handleCheck}
                                     data-id={array_element.id}
                                     data-text={array_element.text}
                                     data-category={array_element.category.name}
                                     data-completed={array_element.completed}
                                     data-i={i}
                                     checked={checked[i]}>
                        {array_element.text}</Checkbox>
                }));
                setChecked(status_list);
            });
    }, [checked] );

    return (
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

                {tab === 1 && <MyTasks go={go}/>}
                {tab === 2 &&
                <div>
                    <form className="check-list-form">
                        <input type="text" name="check-list-input" placeholder="Введите новую задачу сюда"
                               className="check-list-input"/>

                        <button type="submit" className="add-task-to-list-btn">
                            <Icon24Add/></button>
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
    )
};

export default Project;