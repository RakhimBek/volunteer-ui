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



const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [role, setRole] = useState();



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

	return (
		<View activePanel={activePanel} popout={popout} header={false}>
			<Home id='home' fetchedUser={fetchedUser} go={go} />
			<ProjectsVolunteer id='ProjectsVolunteer' fetchedUser={fetchedUser} setRole={setRole} role="volunteer" go={go} />
			<ProjectDescription id='project_description' role={role} UpdatePopout={UpdatePopout} go={go}/>
			<Projects id='projects' setRole={setRole} role="organizer" go={go} />
			<NewProject id="new_project" role={role} go={go}/>
			<Project id="project" role={role} go={go}/>
			<Task id="task" role={role} go={go}/>
			<NewTask id="new_task" role={role} go={go}/>
			<Chat id="chat" role={role} go={go}/>
			<Applications id="applications" role={role} go={go}/>
			<VolunteerProfile id="volunteer_profile" role={role} go={go}/>
			<VolunteerProfilePreview id="volunteer_profile_preview" role={role} go={go}/>
			<OrganizerProfile id="organizer_profile" role={role} go={go}/>
			<MenuTabs role={role} go={go}/>
		</View>
	);
};

export default App;

