import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

import './style.css';
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import SearchComponent from "../../common/SearchComponent";
import CreateProject from "./CreateProject";
import Project from "./Project";
import MenuTabs from "../../common/MenuTabs";

const Projects = ({id, go, fetchedUser}) => (
    <Panel id={id}>

        <Div>
            <p className="projects-label">Мои проекты</p>
        </Div>

        <SearchComponent/>
        <CreateProject go={go}/>

        <Project date="08.03.2011" label="8 марта" go={go}/>
        <Project date="01.09.2011" label="1 сентября" go={go}/>

        <MenuTabs go={go}/>
    </Panel>
);

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
