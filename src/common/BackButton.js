import React from 'react';
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';
import {Cell} from "@vkontakte/vkui";

const BackButton = ({go, to}) => (
        <Cell before={<Icon24BrowserBack />} onClick={go} data-to={to}>Назад</Cell>
);
export default BackButton;