import React from 'react';
import PropTypes from 'prop-types';
import {platform, IOS} from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import './style.css';
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import SearchProject from "./SearchProject";
import CreateProject from "./CreateProject";
import Project from "./Project";

const osName = platform();

const Projects = ({id, go, fetchedUser}) => (
    <Panel id={id}>
        <PanelHeader
            left={<HeaderButton onClick={go} data-to="home">
                {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
            </HeaderButton>}
        >
            Projects Page Header
        </PanelHeader>

        <Div>
            <p className="projects-label">Мои проекты</p>
        </Div>

        <SearchProject/>
        <CreateProject go={go}/>

        <Project date="08.03.2011" label="8 марта"/>
        <Project date="01.09.2011" label="1 сентября"/>

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
