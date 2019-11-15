import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

import './Main.css';
import SearchComponent from "../../common/SearchComponent";
import CreateProject from "./CreateProject";
import Project from "./Project";
import axios from 'axios/dist/axios'
import egEventPhoto from '../../img/haka.png';
import MenuHeader from "../../common/MenuHeader";
import Utils from "../../utils/utils"
import Debug from "../../Debug";

/*
{
 "id": 1,
 "title": "Постройка метро",
 "startDate": { "year": 2019, "month": 9, "dayOfMonth": 20, "hourOfDay": 19, "minute": 33, "second": 30 },
 "city": "Омск"
}
*/
const Projects = ({id, go, role, userInfo, GoToTasks}) => {

    const [projectsData, setProjectsData] = useState(new Map());

    useEffect(() => {
        axios
            .get(Utils.path('volunteer/' + userInfo.id + '/project'))
            .then((response) => {
                setProjectsData(response.data.reduce((acc, el) => { acc.set(el.id, el); return acc; }, new Map()));
            })
            .catch((reason) => {
                Debug(reason);
            });
    }, [userInfo.id]);

    const deleteProject = (e) => {
        const projectId = parseInt(e.target.dataset.projectId);
        const projectsDataCopy = new Map(projectsData);
        projectsDataCopy.delete(projectId);
        setProjectsData(projectsDataCopy);
    };

    const ProjectList = () => {
        return Array.from(projectsData).map(([key, el]) => {
            const toDate = [el.startDate.dayOfMonth, el.startDate.month, el.startDate.year].reduce((l, r) => l + "." + r);
            return (
                <Project
                    id={el.id}
                    onDelete={deleteProject}
                    GoToTasks={GoToTasks}
                    key={key}
                    date={toDate}
                    label={el.title}
                    go={go}
                    eventPhoto={egEventPhoto}
                    role={role}/>
            );
        });
    };

    return (
        <Panel id={id} theme="white">
            <main>
                <MenuHeader headerTitle="Мои проекты"/>

                <SearchComponent role={role}/>
                <CreateProject go={go}/>
                <ProjectList id={"projects"}/>
            </main>
        </Panel>
    );
};

Projects.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
    userInfo: PropTypes.shape({
        id: PropTypes.number,
        firstName: PropTypes.string,
        lastName: PropTypes.string
    }),
};

export default Projects;
