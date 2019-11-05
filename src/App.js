import React, { useState, useEffect } from 'react';
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
import VolunteerProfilePreview from "./panels/volunteer_profile_preview/volunteer_profile_preview";
import OrganizerProfile from "./panels/organizer_profile/organizer_profile";
import MenuTabs from "./common/MenuTabs";
import Utils from "./utils/utils";
import axios from 'axios/dist/axios';


const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [extendedUserData, setExtendedUserData] = useState({
		firstName: "Erzhan",
		lastName: "Erzhanov",
		patrName: "Erzhanovich"
	});
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [role, setRole] = useState();
	const [currentProject, setCurrentProject] = useState();



	useEffect(() => {
		connect.subscribe(({ detail: { type, data }}) => {
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

			axios
				.post(Utils.path('volunteer/vk'), {
					firstName: user.first_name,
					lastName: user.last_name,
					patrName: "Erzhanovich",
					vkid: 'íd'.concat(user.id)
				})
				.then((response) => {
					console.log(response.data.volunteer);
					setExtendedUserData(response.data.volunteer);
				});

			setUser(user);
			setPopout(null);
		}
		fetchData();
		window.addEventListener('popstate', e => e.preventDefault() & goToPrevPanel());
		window.history.pushState({panel:'home'}, 'home')
	}, []);

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
	const SetCurrentProject = (project_id) => {
		setCurrentProject(project_id);
		setCurrentProject('43');
		console.log(currentProject);
	};

	return (
		<View activePanel={activePanel} popout={popout} header={false}>
			<Home id='home' fetchedUser={fetchedUser} go={go} />
			<ProjectsVolunteer id='ProjectsVolunteer' SetCurrentProject={SetCurrentProject} fetchedUser={fetchedUser} setRole={setRole} role="volunteer" go={go} setActivePanel={setActivePanel}/>
			<ProjectDescription id='project_description' role={role} UpdatePopout={UpdatePopout} go={go}/>
			<Projects id='projects' setRole={setRole} role="organizer" go={go} userInfo={extendedUserData} SetCurrentProject={SetCurrentProject} setActivePanel={setActivePanel} сurrentProject={currentProject}/>
			<NewProject id="new_project" role={role} go={go} userInfo={extendedUserData}/>
			<Project id="project" activePanel={activePanel} role={role} go={go} сurrentProject={currentProject}/>
			<Task id="task" role={role} go={go}/>
			<NewTask id="new_task" role={role} go={go}/>
			<Chat id="chat" activePanel={activePanel} role={role} go={go}/>
			<Applications id="applications" activePanel={activePanel} role={role} go={go}/>
			<VolunteerProfile id="volunteer_profile" role={role} go={go}/>
			<VolunteerProfilePreview id="volunteer_profile_preview" activePanel={activePanel} role={role} go={go}/>
			<OrganizerProfile id="organizer_profile" activePanel={activePanel} role={role} go={go} userInfo={extendedUserData}/>
			<MenuTabs activePanel={activePanel} role={role} go={go}/>
		</View>
	);
};

export default App;

