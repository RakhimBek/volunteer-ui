import {DELETE_PROJECT, NEW_PROJECT, ORGANIZER_PROJECTS} from "./constants";

const initialState = {
    organizerProjects: new Map()
};

const reducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {
        case ORGANIZER_PROJECTS:

            return Object.assign({}, state, {
                organizerProjects: action.organizerProjects
            });

        case DELETE_PROJECT: {
            const organizerProjects = new Map(state.organizerProjects);
            organizerProjects.delete(action.projectId);

            return Object.assign({}, state, {
                organizerProjects: organizerProjects
            });
        }

        case NEW_PROJECT: {
            const organizerProjects = new Map(state.organizerProjects);
            organizerProjects.set(action.data.id, action.data);
            return Object.assign({}, state, {
                organizerProjects: organizerProjects
            });
        }

        default:
            return state;
    }
};

export default reducer;