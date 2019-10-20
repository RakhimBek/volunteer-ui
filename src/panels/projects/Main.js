import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

import './Main.css';
import SearchComponent from "../../common/SearchComponent";
import CreateProject from "./CreateProject";
import Project from "./Project";
import MenuTabs from "../../common/MenuTabs";
import axios from 'axios/dist/axios'
import egEventPhoto from '../../img/haka.png';
import MenuHeader from "../../common/MenuHeader";

/*
{
 "id": 1,
 "title": "Постройка метро",
 "startDate": { "year": 2019, "month": 9, "dayOfMonth": 20, "hourOfDay": 19, "minute": 33, "second": 30 },
 "city": "Омск"
}
*/
const Projects = ({id, go, fetchedUser}) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios
            .get('https://raimbek-rakhimbekov.ru:8080/zz/test-api/project')
            .then((response) => {
                let list = [];
                response.data.map((el) => {
                    let toDate = [el.startDate.dayOfMonth, el.startDate.month, el.startDate.year].reduce((l, r) => l + "." + r);
                    list.push(<Project date={toDate} label={el.title} go={go} eventPhoto={egEventPhoto}/>);
                });
                setProjects(list);
            });
    }, []);

    return (
        <Panel id={id} theme="white">
            <main>
                <MenuHeader headerTitle="Мои проекты"/>

                <SearchComponent/>
                <CreateProject go={go}/>

                {projects}
            </main>
            <MenuTabs go={go}/>
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
};

export default Projects;
