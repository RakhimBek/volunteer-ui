import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import MenuTabs from "../../common/MenuTabs";
import './volunteer_profile.css';
import MenuHeader from "../../common/MenuHeader";
import UserCard from "../../common/UserCard";

const VolunteerProfile = ({id, go}) => {
    return(
        <Panel id={id} theme="white">
            <MenuHeader headerTitle="Карточка волонтёра"/>
            <div className="volunteer-profile">
                <UserCard/>
                <div>Личная информация которую заполняет сам волонтер</div>
            </div>
            <MenuTabs go={go}/>
        </Panel>
    )
}

export default VolunteerProfile;