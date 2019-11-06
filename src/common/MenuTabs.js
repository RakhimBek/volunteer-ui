import React from 'react';
import FixedLayout from "@vkontakte/vkui/dist/components/FixedLayout/FixedLayout";
/*
import Tabs from "@vkontakte/vkui/dist/components/Tabs/Tabs";
import TabsItem from "@vkontakte/vkui/dist/components/TabsItem/TabsItem";
*/
import './MenuTabs.css'
import Icon24UserAddOutline from '@vkontakte/icons/dist/24/user_add_outline';
import Icon20ArticleBoxOutline from '@vkontakte/icons/dist/20/article_box_outline';
import Icon20NewsfeedOutline from '@vkontakte/icons/dist/20/newsfeed_outline';
import Icon20MessageOutline from '@vkontakte/icons/dist/20/message_outline';
import Icon20UserOutline from '@vkontakte/icons/dist/20/user_outline';

/*import projects from '../img/tabs/Group 2.svg'
import taskList from '../img/tabs/task-list.svg'
import home from '../img/tabs/Group.svg'
import chat from '../img/tabs/comment.svg'
import profile from '../img/tabs/Profile.svg'*/

const MenuTabs = ({go, role, activePanel}) => {
    let buttonClass;
    function SetButtonClassProject(activePanel, role) {
        if (activePanel === "project" && role === "organizer") {
            buttonClass = "menu-bottom-buttons-item organizer"
        } else if (activePanel === "project" && role === "volunteer") {
            buttonClass = "menu-bottom-buttons-item volunteer"
        } else {
            buttonClass = "menu-bottom-buttons-item"
        }
        return buttonClass;
    }
    function SetButtonClassApplications(activePanel, role) {
        if(activePanel === "applications" && role === "organizer") {
            buttonClass = "menu-bottom-buttons-item organizer"}
        else if (activePanel === "applications" && role === "volunteer"){
            buttonClass = "menu-bottom-buttons-item volunteer"
        } else {
            buttonClass = "menu-bottom-buttons-item"
        }
        return buttonClass;
    }
    function SetButtonClassHome(activePanel, role) {
        if(activePanel === "home" && role === "organizer") {
            buttonClass = "menu-bottom-buttons-item organizer"}
        else if (activePanel === "home" && role === "volunteer"){
            buttonClass = "menu-bottom-buttons-item volunteer"
        } else {
            buttonClass = "menu-bottom-buttons-item"
        }
        return buttonClass;
    }
    function SetButtonClassChat(activePanel, role) {
        if(activePanel === "chat" && role === "organizer") {
            buttonClass = "menu-bottom-buttons-item organizer"}
        else if (activePanel === "chat" && role === "volunteer"){
            buttonClass = "menu-bottom-buttons-item volunteer"
        } else {
            buttonClass = "menu-bottom-buttons-item"
        }
        return buttonClass;
    }
    function SetButtonClassProfile(activePanel, role) {
        if(activePanel === "organizer_profile" && role === "organizer") {
        buttonClass = "menu-bottom-buttons-item organizer"}
        else if (activePanel === "volunteer_profile" && role === "volunteer"){
            buttonClass = "menu-bottom-buttons-item volunteer"
        } else {
            buttonClass = "menu-bottom-buttons-item"
        }
        return buttonClass;
    }
    return (
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
                <button onClick={go} data-to="project" className={SetButtonClassProject(activePanel, role)}>
                    <Icon20ArticleBoxOutline className="menu-bottom-buttons-icon"/>
                    <p className="menu-bottom-buttons-label">ЗАДАЧИ</p>
                </button>
                {role === "organizer" &&
                <button onClick={go} data-to="applications" className={SetButtonClassApplications(activePanel, role)}>
                    <Icon24UserAddOutline width={20} height={20} className="menu-bottom-buttons-icon"/>
                    <p className="menu-bottom-buttons-label">ЗАЯВКИ</p>
                </button>
                }
                <button onClick={go} data-to="home" className={SetButtonClassHome(activePanel, role)}>
                    <Icon20NewsfeedOutline className="menu-bottom-buttons-icon"/>
                    <p className="menu-bottom-buttons-label">ПРОЕКТЫ</p>
                </button>
                <button onClick={go} data-to="chat"
                        className={SetButtonClassChat(activePanel, role)}>
                    <Icon20MessageOutline className="menu-bottom-buttons-icon"/>
                    <p className="menu-bottom-buttons-label">ЧАТЫ</p>
                </button>
                {role === "organizer" &&
                <button onClick={go} data-to="organizer_profile" className={SetButtonClassProfile(activePanel, role)}>
                    <Icon20UserOutline className="menu-bottom-buttons-icon"/>
                    <p className="menu-bottom-buttons-label">ПРОФИЛЬ</p>
                </button>
                }
                {role === "volunteer" &&
                <button onClick={go} data-to="volunteer_profile" className={SetButtonClassProfile(activePanel, role)}>
                    <Icon20UserOutline className="menu-bottom-buttons-icon"/>
                    <p className="menu-bottom-buttons-label">ПРОФИЛЬ</p>
                </button>
                }
            </div>
        </FixedLayout>

    );
}
export default MenuTabs;