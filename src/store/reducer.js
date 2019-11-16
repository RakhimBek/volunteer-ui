const initialState = {
    organizerProjects: new Map()
};

const reducer = (state = initialState, action) => {
    if (action.type === 'ORGANIZER_PROJECTS') {

        return Object.assign({}, state, {
            organizerProjects: action.organizerProjects
        });

    } else if (action.type === 'DELETE_PROJECT') {
        const organizerProjects = new Map(state.organizerProjects);
        organizerProjects.delete(action.projectId);

        return Object.assign({}, state, {
            organizerProjects: organizerProjects
        });
    }

    return state;
};

export default reducer;