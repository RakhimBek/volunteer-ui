import React, {useState, useEffect, useCallback} from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/new_user/Home';
import ProjectsVolunteer from './panels/new_volunteer/ProjectsVolunteer';
import ProjectDescription from './panels/ProjectDescription/ProjectDescription';

import Projects from "./panels/projects/Main";
import Project from "./panels/project/Main";
import NewProject from "./panels/new_project/Main";
import Task from "./panels/task/Main";
import NewTask from "./panels/new_task/Main";
import Chat from "./panels/chat/Chat";
import Applications from "./panels/applications/Applications";
import VolunteerProfile from "./panels/volunteer_profile/volunteer_profile";
import VolunteerProfileSettings from "./panels/volunteer_profile_settings/volunteer_profile_settings";
import VolunteerProfilePreview from "./panels/volunteer_profile_preview/volunteer_profile_preview";
import OrganizerProfile from "./panels/organizer_profile/organizer_profile";
import MenuTabs from "./common/MenuTabs";
import Utils from "./utils/utils";
import axios from 'axios/dist/axios';
import Debug from "./Debug";
import {useDispatch} from "react-redux";
import {GET_USER} from "./store/constants";


const App = () => {

    const [state, setState] = useState({
        taskId: -1,
    });
    const [activePanel, setActivePanel] = useState('home');
    const [extendedUserData, setExtendedUserData] = useState({
        firstName: "Erzhan",
        lastName: "Erzhanov",
        patrName: "Erzhanovich"
    });
    const [popout, setPopout] = useState();
    const [role, setRole] = useState("organizer");
    const [projectId, setProjectId] = useState(-1);
    const dispatch = useDispatch();
    const getUser = useCallback((userData) => dispatch({
        type: GET_USER,
        data: userData
    }), [dispatch]);

    useEffect(() => {

        const saveUser = (user, imageId) => {
            axios
                .post(Utils.path('volunteer/vk'), {
                    firstName: user.first_name,
                    lastName: user.last_name,
                    patrName: "Erzhanovich",
                    vkid: user.id,
                    imageId: imageId
                })
                .then((response) => {
                    console.log(response.data.volunteer);
                    getUser(response.data);
                    setExtendedUserData(response.data.volunteer);
                    setPopout(null);
                })
                .catch((reason) => {
                    Debug({
                        "message": reason.message,
                        "url": reason.config.url,
                        "data": JSON.parse(reason.config.data)
                    });
                });
        };

        const saveUserImage = (user, imageData) => {
            const formData = new FormData();
            formData.append("file", imageData);
            axios
                .post(Utils.path('attachment'), formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data;',
                    }
                })
                .then((response) => {
                    saveUser(user, response.data.id);
                })
                .catch((e) => {
                    Debug(e);
                });
        };

        const saveUserInfo = (user) => {
            UpdatePopout(<ScreenSpinner size='large'/>);
            axios
                .get(String(user.photo_200), {responseType: 'blob'})
                .then((response) => {
                    saveUserImage(user, response.data)
                });
        };

        connect.subscribe(({detail: {type, data}}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }
        });

        async function fetchData() {
            const user = await connect.sendPromise('VKWebAppGetUserInfo');
            console.log(user);
            console.log(JSON.stringify(user));

            saveUserInfo(user);
        }

        fetchData();
        window.addEventListener('popstate', e => e.preventDefault() & goToPrevPanel());
        window.history.pushState({panel: 'home'}, 'home')
    }, [getUser]);

    const go = (e) => {
        window.history.pushState({panel: e.currentTarget.dataset.to}, `${e.currentTarget.dataset.to}`);
        setActivePanel(e.currentTarget.dataset.to);
    };

    const goToPrevPanel = () => {
        setActivePanel(window.history.state.panel);
    };
    const UpdatePopout = (popout) => {
        setPopout(popout);
    };
    const GoToTasks = (project_id) => {
        window.history.pushState({panel: 'project'}, 'project');
        setActivePanel('project');

        setProjectId(project_id);
    };

    return (
        <View activePanel={activePanel} popout={popout} header={false}>
            <Home id='home' go={go} setRole={setRole}/>
            <ProjectsVolunteer id='ProjectsVolunteer' setProjectId={setProjectId} GoToTasks={GoToTasks} role="volunteer"
                               go={go}/>
            <ProjectDescription id='project_description' role={role} UpdatePopout={UpdatePopout} go={go}
                                projectId={projectId} volunteerId={extendedUserData.id} setState={setState}/>
            <Projects id='projects' role={role} go={go} userInfo={extendedUserData} GoToTasks={GoToTasks}
                      setProjectId={setProjectId}/>
            <NewProject id="new_project" role={role} go={go} userInfo={extendedUserData} UpdatePopout={UpdatePopout}/>
            <Project id="project" activePanel={activePanel} role={role} go={go} projectId={projectId}
                     setState={setState}/>
            <Task id="task" role={role} go={go} taskId={state.taskId} setState={setState} state={state}
                  projectId={projectId}/>
            <NewTask id="new_task" role={role} go={go} projectId={projectId}/>
            <Chat id="chat" activePanel={activePanel} role={role} go={go} userInfo={extendedUserData}/>
            <Applications id="applications" activePanel={activePanel} role={role} go={go} userInfo={extendedUserData}
                          projectId={projectId}/>
            <VolunteerProfile id="volunteer_profile" role={role} go={go} userInfo={extendedUserData}/>
            <VolunteerProfileSettings id="volunteer_profile_settings" role={role} go={go} userInfo={extendedUserData}/>
            <VolunteerProfilePreview id="volunteer_profile_preview" activePanel={activePanel} role={role} go={go}
                                     userInfo={extendedUserData}/>
            <OrganizerProfile id="organizer_profile" activePanel={activePanel} role={role} go={go}
                              userInfo={extendedUserData}/>
            <MenuTabs activePanel={activePanel} role={role} go={go}/>
        </View>
    );
};

export default App;

