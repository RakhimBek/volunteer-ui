import React from 'react';
import FixedLayout from "@vkontakte/vkui/dist/components/FixedLayout/FixedLayout";
import Tabs from "@vkontakte/vkui/dist/components/Tabs/Tabs";
import TabsItem from "@vkontakte/vkui/dist/components/TabsItem/TabsItem";

import './MenuTabs.css'

import projects from '../img/tabs/Group 2.png'
import taskList from '../img/tabs/task-list.png'
import home from '../img/tabs/Group.png'
import chat from '../img/tabs/comment.png'
import profile from '../img/tabs/Profile.png'
import Div from "@vkontakte/vkui/dist/components/Div/Div";

const MenuTabs = ({go, role}) => (

        <FixedLayout vertical="bottom">

                <Tabs theme="light" type="default">
                    <TabsItem onClick={go} data-to="project" className="tab"><img src={projects} alt="M"/></TabsItem>
                    {role === "organizer" &&
                    <TabsItem onClick={go} data-to="applications" className="tab"><img src={taskList} alt="M"/></TabsItem>
                    }
                    <TabsItem onClick={go} data-to="home" className="tab"><img src={home} alt="M"/></TabsItem>
                    <TabsItem onClick={go} data-to="chat" className="tab"><img src={chat} alt="M"/></TabsItem>
                    {role === "organizer" &&
                    <TabsItem onClick={go} data-to="organizer_profile" className="tab"><img src={profile} alt="M"/></TabsItem>
                    }
                    {role === "volunteer" &&
                    <TabsItem onClick={go} data-to="volunteer_profile" className="tab"><img src={profile} alt="M"/></TabsItem>
                    }
                </Tabs>


        </FixedLayout>

);

export default MenuTabs;