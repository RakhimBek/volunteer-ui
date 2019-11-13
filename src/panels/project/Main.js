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

const CheckList = ({projectId}) => {
    const [noteText, setNoteText] = useState();
    const [noteType, setNoteType] = useState(1);
    const [noteStates, setNoteStates] = useState([]);
    const [noteList, setNoteList] = useState([]);

    const addNote = (e) => {
        axios
            .post(Utils.path('project/' + projectId + '/note'), {
                "text": noteText,
                "category": noteType,
                "completed": false,
            })
            .then((response) => {
                console.log('add note. good: ' + response);
                setNoteList([response.data, ...response.data]);
            })
            .catch((reason) => {
                console.log('add note.  bad: ' + reason)
            });

        e.preventDefault();
    };

    useEffect(() => {
        axios
            .get(Utils.path('project/' + projectId + '/note'))
            .then((response) => {
                setNoteStates(response.data.reduce((x, y) => x.concat([y.completed]), []));
                setNoteList(response.data);
            });

    }, [projectId]);

    const handleCheck = (e) => {
        console.log(e.currentTarget.dataset.index);
        const index = e.currentTarget.dataset.index;
        const stateCopy = [...noteStates];
        stateCopy[index] = !stateCopy[index];
        setNoteStates(stateCopy);

        const info = e.currentTarget.dataset.info;
        const note_edit = {
            "completed": stateCopy[index]
        };

        /*
            почти все ок но тут добавляется новая запись. Надо бэк поправить.
            Долго мучился. Ничего больше не сделал :(
        */
        axios
            .post(Utils.path('project/' + projectId + '/note/' + info.id), note_edit)
            .then((response) => {
                console.log('handle check.good: ' + response);
            })
            .catch((reason) => {
                console.log('handle check.bad: ' + reason);
            });

        e.preventDefault();
    };

    const Notes = ({noteDescriptions}) => {
        return noteDescriptions.map((el, index) => {
            return <Note noteDescription={el} index={index} state={noteStates[index]}/>
        });
    };

    const Note = ({noteDescription, index, state}) => {
        console.log('Note: ' + state);

        return (
            <Checkbox onChange={handleCheck}
                      data-info={noteDescription}
                      data-index={index}
                      checked={state}>{noteDescription.text}</Checkbox>
        );
    };

    return (
        <div>
            <form className="check-list-form">
                <input type="text"
                       name="check-list-input"
                       placeholder="Введите новую задачу сюда"
                       onChange={e => setNoteText(e.target.value)}
                       className="check-list-input"/>

                <select className="note-category-selection" onChange={e => setNoteType(e.target.value)}>
                    <option value="1" selected>До начала проекта</option>
                    <option value="2">Во время проекта</option>
                    <option value="3">Во время проекта</option>
                </select>
                <button className="add-task-to-list-btn" onClick={addNote}>
                    <Icon24Add/>
                </button>
            </form>
            <div className="check-list-items">
                <Notes noteDescriptions={noteList}/>
            </div>
        </div>
    );
};

const Project = ({id, go, role, activePanel, projectId, setState}) => {
    const [tab, setTab] = useState(1);
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

    }, [projectId, go, role, setState]);

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
                {tab === 2 && <CheckList go={go} projectId={projectId}/>}
                {tab === 3 && <ArchieveTasks go={go}/>}

            </div>
            <TabFix height="50px"/>
            <MenuTabs go={go} role={role} activePanel={activePanel}/>
        </Panel>
    )
};

export default Project;