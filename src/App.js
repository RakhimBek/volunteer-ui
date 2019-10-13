import React, { useState, useEffect } from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/new_user/Home';
import Persik from './panels/new_volunteer/Persik';
import Projects from "./panels/projects/Main";
import Project from "./panels/project/Main";
import NewProject from "./panels/new_project/Main";
import Task from "./panels/task/Main";
import NewTask from "./panels/new_task/Main";

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

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
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<View activePanel={activePanel} popout={popout} header={false}>
			<Home id='home' fetchedUser={fetchedUser} go={go} />
			<Persik id='persik' fetchedUser={fetchedUser} go={go} />
			<Projects id='projects' go={go} />
			<NewProject id="new_project" go={go}/>
			<Project id="project" go={go}/>
			<Task id="task" go={go}/>
			<NewTask id="new_task" go={go}/>
		</View>
	);
};

export default App;

