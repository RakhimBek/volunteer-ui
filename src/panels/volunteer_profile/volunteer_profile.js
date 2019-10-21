import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import MenuTabs from "../../common/MenuTabs";
import HeaderContext from "@vkontakte/vkui/dist/components/HeaderContext/HeaderContext"
import './volunteer_profile.css';
import MenuHeader from "../../common/MenuHeader";
import UserCard from "../../common/UserCard";

const VolunteerProfile = ({id}) => {
    return(
        <Panel id={id} theme="white">
            <MenuHeader headerTitle="Карточка волонтёра"/>
            <div className="volunteer-profile">
                <UserCard/>
                <div>Личная информация которую заполняет сам волонтер</div>
                <HeaderContext>fsdf</HeaderContext>
            </div>
            <MenuTabs/>
        </Panel>
    )
}

export default VolunteerProfile;