import React from 'react';
import PropTypes from 'prop-types';
import {platform, IOS} from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import persik from '../img/persik.png';
import './Persik.css';

const osName = platform();

const Persik = ({id, go, fetchedUser}) => (
    <Panel id={id}>
        <PanelHeader
            left={<HeaderButton onClick={go} data-to="home">
                {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
            </HeaderButton>}
        >
            Persik Page Header
        </PanelHeader>

        {fetchedUser &&
        <Group>
            <Cell
                before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
                description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
            >
                {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
            </Cell>
        </Group>}

        <img className="Persik" src={persik} alt="Persik The Cat"/>
    </Panel>
);

Persik.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};

export default Persik;