import React from 'react';
import FixedLayout from "@vkontakte/vkui/dist/components/FixedLayout/FixedLayout";
/*
import Tabs from "@vkontakte/vkui/dist/components/Tabs/Tabs";
import TabsItem from "@vkontakte/vkui/dist/components/TabsItem/TabsItem";
*/
import './MenuTabs.css'

import projects from '../img/tabs/Group 2.svg'
import taskList from '../img/tabs/task-list.svg'
import home from '../img/tabs/Group.svg'
import chat from '../img/tabs/comment.svg'
import profile from '../img/tabs/Profile.svg'

const MenuTabs = ({go, role, activePanel}) => (

        <FixedLayout vertical="bottom">
            {/*
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
               */}
            <div className="menu-bottom-buttons">
                <button onClick={go} data-to="project" className={activePanel==="project"?"menu-bottom-buttons-item active-panel":"menu-bottom-buttons-item"}>
                    <img className="selected-menu-organizer" src={projects} alt="M"/>
                    <p className="menu-bottom-buttons-label">ЗАДАЧИ</p>
                </button>
                {role === "organizer" &&
                <button onClick={go} data-to="applications" className={activePanel==="applications"?"menu-bottom-buttons-item active-panel":"menu-bottom-buttons-item"}>
                    <img src={taskList} alt="M"/>
                    <p className="menu-bottom-buttons-label">ЗАЯВКИ</p>
                </button>
                }
                <button onClick={go} data-to="home" className={activePanel==="home"?"menu-bottom-buttons-item active-panel":"menu-bottom-buttons-item"}>
                    <img src={home} alt="M"/>
                    <p className="menu-bottom-buttons-label">ПРОЕКТЫ</p>
                </button>
                <button onClick={go} data-to="chat" className={activePanel==="chat"?"menu-bottom-buttons-item active-panel":"menu-bottom-buttons-item"}>
                    <img src={chat} alt="M"/>
                    <p className="menu-bottom-buttons-label">ЧАТЫ</p>
                </button>
                {role === "organizer" &&
                <button onClick={go} data-to="organizer_profile" className={activePanel==="organizer_profile"?"menu-bottom-buttons-item active-panel":"menu-bottom-buttons-item"}>
                    <img src={profile} alt="M"/>
                    <p className="menu-bottom-buttons-label">ПРОФИЛЬ</p>
                </button>
                }
                {role === "volunteer" &&
                <button onClick={go} data-to="volunteer_profile" className={activePanel==="volunteer_profile"?"menu-bottom-buttons-item active-panel":"menu-bottom-buttons-item"}>
                    <img src={profile} alt="M"/>
                    <p className="menu-bottom-buttons-label">ПРОФИЛЬ</p>
                </button>
                }
            </div>
        </FixedLayout>

);

export default MenuTabs;