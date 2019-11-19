import React, {useState, useEffect} from 'react';
import {Button} from "@vkontakte/vkui";
import TaskPreview from "./TaskPreview";
import Utils from "../../utils/utils";
import Debug from "../../Debug";
import axios from 'axios/dist/axios'

import eg from "../../img/play_24.png";
import Icon16Add from '@vkontakte/icons/dist/16/add';
import {DB_TASKS, NEW_TASK} from "../../store/constants";
import {useDispatch, useSelector} from "react-redux";

const TaskPreviewList = ({go, role, projectId, setState}) => {
//    const [tasksData, setTasksData] = useState([]);
    const tasksData = useSelector(state => {
        const tasks = state.tasks.get(projectId);
        if (tasks) {
            return tasks;
        }

        return [];
    });
    const dispatch = useDispatch();

    useEffect(() => {

        axios
            .get(Utils.path('project/' + projectId + '/task'))
            .then((response) => {
                console.log('--->');
                console.log(response.data);

                dispatch({
                    type: DB_TASKS,
                    projectId: projectId,
                    taskData: response.data
                });
            })
            .catch((reason) => {
                Debug(reason);
            });

    }, [projectId]);

    const TaskPreviews = () => {
        return tasksData.map((el, index) => {
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
        });
    };

    return (
        <div>
            {role === "organizer" &&
            <div className="add-task">
                <Button className="add-task-to-project-button" before={<Icon16Add/>} onClick={go}
                        data-to="new_task">ДОБАВИТЬ</Button>
            </div>
            }
            <TaskPreviews/>
        </div>
    );
};

export default TaskPreviewList;