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
import TaskPreview from "./panels/project/TaskPreview";
import eg from "./img/play_24.png";


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
	const [tasks, setTasks] = useState([]);

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
	const GoToTasks = (project_id) => {
//		window.history.pushState({panel: 'project'}, 'project');
		setActivePanel('project');

		axios
			.get(Utils.path('project/' + project_id + '/task'))
			.then((response) => {
				console.log(response.data);
				// todo: paging
				let list = [];
				response.data.forEach((el, index) => {
					let toDate = [el.startDate.dayOfMonth, el.startDate.month, el.startDate.year].reduce((l, r) => l + "." + r);
					list.push(<TaskPreview go={go}
										   role={role}
										   image={eg}
										   description={el.description}
										   startDate="10.11.1993"
										   endDate="11.11.1993"
										   hashtag={el.title}
										   arrowButton/>);
				});
				setTasks(list);
			})
			.catch((e) => {
				console.log('Ooops');
				console.log(e);
			});
	};

	return (
		<View activePanel={activePanel} popout={popout} header={false}>
			<Home id='home' fetchedUser={fetchedUser} go={go} />
			<ProjectsVolunteer id='ProjectsVolunteer' GoToTasks={GoToTasks} fetchedUser={fetchedUser} setRole={setRole} role="volunteer" go={go}/>
			<ProjectDescription id='project_description' role={role} UpdatePopout={UpdatePopout} go={go}/>
			<Projects id='projects' setRole={setRole} role="organizer" go={go} userInfo={extendedUserData} GoToTasks={GoToTasks}/>
			<NewProject id="new_project" role={role} go={go} userInfo={extendedUserData}/>
			<Project id="project" activePanel={activePanel} role={role} go={go} tasks={tasks}/>
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

