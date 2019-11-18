import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import MenuTabs from "../../common/MenuTabs";
import MenuHeader from "../../common/MenuHeader";
import UserCard from "../../common/UserCard";
import Accordion from "../../common/Accordion";

import './volunteer_profile.css';

const VolunteerProfile = ({id, go, role, activePanel, userInfo}) => {

    return (
        <Panel id={id} theme="white">
            <MenuHeader headerTitle="Карточка волонтёра"/>
            <div className="volunteer-profile">
                <UserCard userInfo={userInfo} size="80px"/>
                <button className="volunteer-profile-button volunteer-profile-settings-button" onClick={go} data-to={"volunteer_profile_settings"}>
                    Настройки
                </button>
            </div>
            <Accordion title="Найти друга-волонтёра">
                <p>Найди своего друга — волонтера прямо сейчас с помощью нашего сервиса!</p>
                <button className="volunteer-profile-button">Найти друга</button>
            </Accordion>
            <Accordion title="Волонтёрский кошелёк">
                <p>Где деньги, Лебовски?!</p>
            </Accordion>
            <Accordion title="Пригласить друга">
                <p>Поделитесь ссылкой на приложение и получите 10 токенов за каждого человека, который пришел по вашей рекомендации.</p>
                <button className="volunteer-profile-button">Скопировать ссылку</button>
            </Accordion>
            <MenuTabs go={go} role={role} activePanel={activePanel}/>
        </Panel>
    )
};

export default VolunteerProfile;