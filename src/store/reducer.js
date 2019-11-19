import {DB_TASKS, DELETE_PROJECT, NEW_PROJECT, NEW_TASK, ORGANIZER_PROJECTS, TASKS} from "./constants";

const initialState = {
    organizerProjects: [],
    tasks: new Map()
};

const reducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {
        case ORGANIZER_PROJECTS:

            return Object.assign({}, state, {
                organizerProjects: [...action.data]
            });

        case DELETE_PROJECT: {
            const projects = state
                .organizerProjects
                .filter((el) =>
                    el.id !== action.projectId
                );

            return Object.assign({}, state, {
                organizerProjects: projects
            });
        }

        case NEW_PROJECT: {
            const projects = [action.data, ...state.organizerProjects];
            return Object.assign({}, state, {
                organizerProjects: projects
            });
        }

        case DB_TASKS: {
            const tasksCopy = new Map();
            tasksCopy.set(action.projectId, [...action.taskData]);

            return Object.assign({}, state, {
                tasks: tasksCopy
            });
        }

        case NEW_TASK: {
            console.log('RED:');
            console.log(action.taskData)

            const tasksCopy = new Map();
            const tasks = state.tasks.get((action.projectId));
            if (tasks) {
                console.log('TTT');
                tasksCopy.set(action.projectId, [action.taskData, ...tasks]);
            } else {
                console.log('RRR');
                tasksCopy.set(action.projectId, [action.taskData]);
            }

            console.log('======###$$');
            console.log(tasksCopy.get(action.projectId));
            return Object.assign({}, state, {
                tasks: tasksCopy
            });
        }

        default:
            return {...state};
    }
};

export default reducer;