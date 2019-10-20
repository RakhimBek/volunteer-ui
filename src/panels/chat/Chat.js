import React, {useState} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

import MenuTabs from "../../common/MenuTabs";
import MenuHeader from "../../common/MenuHeader";
import {Tabs, TabsItem, Cell, List} from "@vkontakte/vkui";


import './Chat.css';
import TabFix from "../../common/TabFix";


const Chat = ({id, go}) => {
    const [tab,setTab] = useState(1);

    const Chat1 = ({go}) => (
        <div className="messages">
            <div className="message-item">
                <p className="message-author">Валерий Петрович</p>
                <p className="message-item">Превеееееед!</p>
            </div>
        </div>
    );

    const Chat2 = () =>(
        <div className="messages">
            <div className="message-item">
                <p className="message-author">Сан Саныч</p>
                <p className="message-item">Здорова, мужики!</p>
            </div>
        </div>
    );

    return(
    <Panel id={id} theme="white">
        <div>
            <MenuHeader headerTitle="Чаты"/>
            <List>
                <Cell>
                    <Tabs type="buttons">
                        <TabsItem data-name={1} onClick={()=>setTab(1)}>
                           Чат 1
                        </TabsItem >
                        <TabsItem data-name={2} onClick={()=>setTab(2)}>
                            Чат 2
                        </TabsItem>
                    </Tabs>
                </Cell>
            </List>


            {tab === 1 && <Chat1 go={go} />}
            {tab === 2 && <Chat2 go={go}/>}

        </div>

        <form className="chat-input">
            <input className="message-input" type="text"/>
            <input className="send-button" type="submit" name="send" value=""/>
        </form>
        <TabFix height="50px"/>
        <MenuTabs go={go}/>
    </Panel>
)};

export default Chat;