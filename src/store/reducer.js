import {DELETE_PROJECT, NEW_PROJECT, ORGANIZER_PROJECTS} from "./constants";

const initialState = {
    organizerProjects: []
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

        default:
            return state;
    }
};

export default reducer;