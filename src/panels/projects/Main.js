import React, {useEffect, useCallback} from 'react';
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
import {useDispatch, useSelector} from "react-redux";
import {DELETE_PROJECT, ORGANIZER_PROJECTS} from "../../store/constants";

/*
{
 "id": 1,
 "title": "Постройка метро",
 "startDate": { "year": 2019, "month": 9, "dayOfMonth": 20, "hourOfDay": 19, "minute": 33, "second": 30 },
 "city": "Омск"
}
*/
const Projects = ({id, go, role, userInfo, GoToTasks, setProjectId}) => {
    const dispatch = useDispatch();
    const getOrganizerProjectsData = useCallback((projectsData) => {

        dispatch({
            type: ORGANIZER_PROJECTS,
            data: projectsData
        });

    }, [dispatch]);

    const organizerProjects = useSelector(state => state.organizerProjects);

    useEffect(() => {
        axios
            .get(Utils.path('organizer/' + userInfo.id + '/project'))
            .then((response) => {
                getOrganizerProjectsData(response.data);
            })
            .catch((reason) => {
                Debug(reason);
            });

    }, [userInfo.id, getOrganizerProjectsData]);

    const deleteProject = (e) => {
        const projectId = parseInt(e.target.dataset.projectId);
        axios
            .delete(Utils.path('organizer/' + userInfo.id + '/project/' + projectId))
            .then((response) => {
                console.log(response.data);
            })
            .catch((reason) => {
                Debug(reason);
            });

        dispatch({
            type: DELETE_PROJECT,
            projectId: projectId
        });
    };

    const ProjectList = () => {
        return organizerProjects.map(el => {
            const toDate = [el.startDate.dayOfMonth, el.startDate.month, el.startDate.year].reduce((l, r) => l + "." + r);
            return (
                <Project
                    id={el.id}
                    onDelete={deleteProject}
                    GoToTasks={GoToTasks}
                    key={el.id}
                    date={toDate}
                    label={el.title}
                    go={go}
                    eventPhoto={egEventPhoto}
                    role={role}
                    setProjectId={setProjectId}/>
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
