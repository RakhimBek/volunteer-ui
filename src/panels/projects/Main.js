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
    console.log('projects component');

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios
            .get(Utils.path('volunteer/' + userInfo.id + '/project'))
            .then((response) => {
                let list = [];
                response.data.forEach((el, index) => {
                    let toDate = [el.startDate.dayOfMonth, el.startDate.month, el.startDate.year].reduce((l, r) => l + "." + r);
                    list.push(<Project id={el.id} GoToTasks={GoToTasks} key={index} date={toDate} label={el.title} go={go} eventPhoto={egEventPhoto} role={role}/>);
                });
                setProjects(list);

                console.log('projects:useEffect');
            })
            .catch((reason) => {
                Debug(reason);
            });
    }, [userInfo.id, GoToTasks, go, role]);

    return (
        <Panel id={id} theme="white">
            <main>
                <MenuHeader headerTitle="Мои проекты"/>

                <SearchComponent role={role}/>
                <CreateProject go={go}/>
                {projects}
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
