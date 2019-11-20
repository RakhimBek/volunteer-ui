import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

import './ProjectsVolunteer.css';
import Project from "../projects/Project";
import axios from 'axios/dist/axios';
import egEventPhoto from "../../img/haka.png";
import MenuHeader from "../../common/MenuHeader";
import SearchComponent from "../../common/SearchComponent";
import TabContent from "../../common/TabContent";
import {Tabs, TabsItem, HorizontalScroll, Cell} from "@vkontakte/vkui";
import Utils from "../../utils/utils"
import Debug from "../../Debug";

const ProjectsVolunteer = ({id, go, role, setProjectId}) => {
    const [projects, setProjects] = useState([]);
    const [tab, setTab] = useState(1);

    useEffect(() => {
        axios
            .get(Utils.path('project'))
            .then((response) => {
                setProjects(response.data.map((el, index) => {
                    let toDate = [el.startDate.dayOfMonth, el.startDate.month, el.startDate.year].reduce((l, r) => l + "." + r);
                    return <Project id={el.id}
                                    key={index}
                                    date={toDate}
                                    label={el.title}
                                    go={go}
                                    eventPhoto={egEventPhoto}
                                    role={role}
                                    setProjectId={setProjectId}
                                    backgroundImageId={el.backgroundImage.id}/>;
                }));
            })
            .catch((reason) => {
                Debug(reason);
            });
    }, [go, role, setProjectId]);

    return (
        <Panel id={id} theme="white">
            <main>
                <MenuHeader headerTitle="Мои проекты"/>

                <SearchComponent role={role}/>
                <Cell className="tabs-header-wrapper">
                    <HorizontalScroll>
                    <Tabs type="buttons">
                        <TabsItem onClick={() => setTab(1)} selected={tab === 1}>
                            По дате
                        </TabsItem>
                        <TabsItem onClick={() => setTab(2)} selected={tab === 2}>
                            По местоположению
                        </TabsItem>
                        <TabsItem onClick={() => setTab(3)} selected={tab === 3}>
                            По категориям
                        </TabsItem>
                    </Tabs>
                    </HorizontalScroll>
                </Cell>
                {tab === 1 &&
                <TabContent>
                    {projects}
                </TabContent>
                }
            </main>
        </Panel>
    )
};

ProjectsVolunteer.propTypes = {
    id: PropTypes.string.isRequired,
    role: PropTypes.string,
    go: PropTypes.func.isRequired,
};

export default ProjectsVolunteer;
