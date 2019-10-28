import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import MenuTabs from "../../common/MenuTabs";
import './volunteer_profile_preview.css';
import MenuHeader from "../../common/MenuHeader";
import UserCard from "../../common/UserCard";
import Accordion from "../../common/Accordion";


const VolunteerProfilePreview = ({id, go, role}) => {

    return(
        <Panel id={id} theme="white">
            <MenuHeader headerTitle="Карточка волонтёра"/>
            <div className="volunteer-profile">
                <UserCard/>
                <div>Личная информация которую заполняет сам волонтер</div>
                <Accordion title="Опыт волонтёра">Дратути</Accordion>
            </div>
            <MenuTabs go={go} role={role}/>
        </Panel>
    )
}

export default VolunteerProfilePreview;