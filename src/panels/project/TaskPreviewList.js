import React, {useEffect, useCallback} from 'react';
import {Button} from "@vkontakte/vkui";
import TaskPreview from "./TaskPreview";
import Utils from "../../utils/utils";
import Debug from "../../Debug";
import axios from 'axios/dist/axios'

import eg from "../../img/play_24.png";
import Icon16Add from '@vkontakte/icons/dist/16/add';
import {DB_TASKS} from "../../store/constants";
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
    const addTask = useCallback((data) => {
        dispatch({
            type: DB_TASKS,
            projectId: projectId,
            taskData: data
        });
    }, [dispatch, projectId]);

    useEffect(() => {

        axios
            .get(Utils.path('project/' + projectId + '/task'))
            .then((response) => {
                addTask(response.data);
            })
            .catch((reason) => {
                Debug(reason);
            });

    }, [projectId, addTask]);

    const TaskPreviews = () => {
        return tasksData.map((el, index) => {
            return <TaskPreview taskInfo={el}
                                go={go}
                                key={index}
                                role={role}
                                image={eg}
                                description={el.description}
                                startDate={el.startDate}
                                endDate={el.endDate}
                                hashtag={el.title}
                                setState={setState}
                                arrowButton
                                />
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