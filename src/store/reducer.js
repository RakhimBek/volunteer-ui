const initialState = {
    organizerProjects: new Map()
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ORGANIZER_PROJECTS':

            return Object.assign({}, state, {
                organizerProjects: action.organizerProjects
            });

        case 'DELETE_PROJECT':
            const organizerProjects = new Map(state.organizerProjects);
            organizerProjects.delete(action.projectId);

            return Object.assign({}, state, {
                organizerProjects: organizerProjects
            });
    }

    return state;
};

export default reducer;