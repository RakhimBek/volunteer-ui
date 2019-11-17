import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import MenuTabs from "../../common/MenuTabs";
import './volunteer_profile_preview.css';
import MenuHeader from "../../common/MenuHeader";
import UserCard from "../../common/UserCard";
import Accordion from "../../common/Accordion";


const VolunteerProfilePreview = ({id, go, role, userInfo}) => {

    return(
        <Panel id={id} theme="white">
            <MenuHeader headerTitle="Карточка волонтёра" closeButton/>
            <div className="volunteer-profile">
                <UserCard userInfo={userInfo} size="100px"/>
                <div className="volunteer-short-bio">Личная информация которую заполняет сам волонтер</div>
            </div>
            <Accordion title="Опыт волонтёра">Дратути</Accordion>
            <MenuTabs go={go} role={role}/>
        </Panel>
    )
};

export default VolunteerProfilePreview;