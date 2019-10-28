import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

import './ProjectsVolunteer.css';
import MenuTabs from "../../common/MenuTabs";
import Project from "../projects/Project";
import axios from 'axios/dist/axios';
import egEventPhoto from "../../img/haka.png";
import MenuHeader from "../../common/MenuHeader";
import SearchComponent from "../../common/SearchComponent";
import TabContent from "../../common/TabContent";
import {Button, Tabs, TabsItem} from "@vkontakte/vkui";

const ProjectsVolunteer = ({id, go, role, setRole}) => {
    const [projects, setProjects] = useState([]);
    const [tab, setTab] = useState(1);
    const setRoleVolunteer = () => {
        setRole("volunteer");
    };
    setRoleVolunteer();
    useEffect(() => {
        axios
            .get('https://raimbek-rakhimbekov.ru:8080/zz/test-api/project')
            .then((response) => {
                // todo: paging
                let list = [];
                response.data.map((el, index) => {
                    let toDate = [el.startDate.dayOfMonth, el.startDate.month, el.startDate.year].reduce((l, r) => l + "." + r);
                    list.push(<Project key={index} date={toDate} label={el.title} go={go} eventPhoto={egEventPhoto} role={role}/>);
                });
                setProjects(list);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    return(
        <Panel id={id} theme="white">
            <main>
                <MenuHeader headerTitle="Мои проекты"/>

                <SearchComponent role={role}/>
                <Tabs type="buttons">
                    <TabsItem onClick={()=>setTab(1)} selected={tab === 1}>
                        По дате
                    </TabsItem>
                    <TabsItem onClick={()=>setTab(2)} selected={tab === 2}>
                        По местоположению
                    </TabsItem>
                    <TabsItem onClick={()=>setTab(3)} selected={tab === 3}>
                        По категориям
                    </TabsItem>
                </Tabs>
                {tab === 1 &&
                <TabContent>
                    {projects}
                </TabContent>
                }
            </main>
            <MenuTabs go={go} role={role}/>
        </Panel>
    )
};

ProjectsVolunteer.propTypes = {
    id: PropTypes.string.isRequired,
    role: PropTypes.string,
    go: PropTypes.func.isRequired,
};

export default ProjectsVolunteer;
