import React, {useState, useEffect} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

import MenuTabs from "../../common/MenuTabs";
import MenuHeader from "../../common/MenuHeader";
import {Tabs, TabsItem, Cell, List, HorizontalScroll, FixedLayout} from "@vkontakte/vkui";
import TabContent from "../../common/TabContent";

import './Chat.css';
import TabFix from "../../common/TabFix";
import Accordion from "../../common/Accordion";
import Icon24Send from '@vkontakte/icons/dist/24/send';

const Chat = ({id, go, role, activePanel}) => {
    const [chat,setChat] = useState(1);
    const [tabTitle, setTabTitle] = useState();
    const [tabId, setTabId] = useState();

    useEffect(() => {
        let response = [
                {"chatid" : "10", "name" : "Важно"},
                {"chatid" : "11", "name" : "Флуд"},
                {"chatid" : "12", "name" : "Столовая"},
            ];

        let tabnames = response.map(function (array_element) {
            return <TabsItem onClick={()=>setChat(array_element.chatid)} selected={chat === array_element.chatid}>{array_element.name}</TabsItem>
        });

        let tabs;

        setTabTitle(tabnames);
        setTabId(tabs);
    }, [chat]);


    const Chat1 = () => (
        <div>
        <Accordion title="Управление чатом">
            <p className="dropdown-item">Информация о чате</p>
            <p className="dropdown-item">Показать вложения</p>
            <p className="dropdown-item">Отключить уведомления</p>
        </Accordion>
        <div className="messages">
            <div className="message-item">
                <p className="message-author">Валерий Петрович</p>
                <p className="message-text">Превеееееед, медвед! </p>
            </div>
        </div>
        </div>
    );

    const Chat2 = () =>(
        <div className="messages">
            <div className="message-item">
                <p className="message-author">Сан Саныч</p>
                <p className="message-text">Здорова, мужики!</p>
            </div>
        </div>
    );
    const Chat4 = () =>(
        <div className="messages">
            <div className="message-item">
                <p className="message-author">Сан Саныч</p>
                <p className="message-text">asdasdadasd!</p>
            </div>
        </div>
    );

    return(
    <Panel id={id} theme="white">

        <MenuHeader headerTitle="Чаты"/>
        <List>
            <Cell>
                <Tabs type="buttons">
                    <HorizontalScroll>
                        <TabsItem data-name={1} onClick={()=>setChat(1)} selected={chat === 1}>
                           Чат 1
                        </TabsItem >
                        <TabsItem data-name={2} onClick={()=>setChat(2)} selected={chat === 2}>
                            Чат 2
                        </TabsItem>
                        {tabTitle}
                    </HorizontalScroll>
                </Tabs>
            </Cell>
        </List>


        {chat === 1 && <Chat1/>}
        {chat === 2 && <Chat2/>}
        {chat === 3 && <TabContent>
            <Accordion title="Управление чатом">
                <p className="dropdown-item">Информация о чате</p>
                <p className="dropdown-item">Показать вложения</p>
                <p className="dropdown-item">Отключить уведомления</p>
            </Accordion>
            <div className="messages">
                <div className="message-item">
                    <p className="message-author">Валерий Петрович</p>
                    <p className="message-text">Превеееееед, старый дед! </p>
                </div>
            </div>
        </TabContent>}
        {chat === 4 && <Chat4/>}
        {tabId}
        <FixedLayout vertical="bottom">
        <form className="chat-input">
            <input className="message-input" type="text"/>
            <button className="send-button" type="submit" name="send" value=""><Icon24Send/></button>
        </form>
        </FixedLayout>
        <TabFix height="50px"/>
        <MenuTabs go={go}  role={role} activePanel={activePanel}/>
    </Panel>
)};

export default Chat;