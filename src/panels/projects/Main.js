import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

import './Main.css';
import SearchComponent from "../../common/SearchComponent";
import CreateProject from "./CreateProject";
import Project from "./Project";
import MenuTabs from "../../common/MenuTabs";

import egEventPhoto from '../../img/haka.png';
import MenuHeader from "../../common/MenuHeader";
import TabFix from '../../common/TabFix';
const Projects = ({id, go, fetchedUser}) => (
    <Panel id={id} theme="white">
        <main>
            <MenuHeader headerTitle="Мои проекты"/>

            <SearchComponent/>
            <CreateProject go={go}/>

            <Project date="08.03.2011" label="8 марта" go={go} eventPhoto={egEventPhoto}/>
            <Project date="01.09.2011" label="1 сентября" go={go} eventPhoto={egEventPhoto}/>
            <Project date="02.09.2011" label="2 сентября" go={go} eventPhoto={egEventPhoto}/>
            <Project date="03.09.2011" label="3 сентября" go={go} eventPhoto={egEventPhoto}/>
            <Project date="14.09.2011" label="14 сентября" go={go} eventPhoto={egEventPhoto}/>

            <TabFix height="40px"/>
        </main>
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
