import React, {useState, useEffect} from 'react';
import SingleChat from "./SingleChat";
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

const ChatList = ({id}) => {

    return (
        <Panel id={id} theme="white">
            <SingleChat/>
        </Panel>
    );
};

export default ChatList;