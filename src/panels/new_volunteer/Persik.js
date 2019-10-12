import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';

import persik from '../../img/persik.png';
import './Persik.css';
import MenuTabs from "../../common/MenuTabs";

const Persik = ({id, go, fetchedUser}) => (
    <Panel id={id}>

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

        <MenuTabs/>
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
