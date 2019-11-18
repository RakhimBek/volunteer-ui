import React, {useState, useEffect} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

import MenuTabs from "../../common/MenuTabs";
import MenuHeader from "../../common/MenuHeader";
import {Tabs, TabsItem, Cell, List, HorizontalScroll, FixedLayout} from "@vkontakte/vkui";
import TabContent from "../../common/TabContent";

import './Chat.css';
import TabFix from "../../common/TabFix";
import Icon24Send from '@vkontakte/icons/dist/24/send';
import axios from 'axios/dist/axios'
import Utils from "../../utils/utils"
import Debug from "../../Debug";

const Chat = ({id, go, role, activePanel, userInfo}) => {
    const [chat,setChat] = useState();
    const [tabTitle, setTabTitle] = useState();
    const [tabsContent, setTabsContent] = useState();

    const [messageText, setMessageText] = useState("");
    const [messageList, setMessageList] = useState([]);
    //загрузка списка чатов
    useEffect(() => {
        axios
            .get(Utils.path('chat'))
            .then((response) => {

                setTabTitle(response.data.map(function (array_element) {

                    return <TabsItem onClick={() => setChat(array_element.id)}
                                     selected={chat === array_element.id}>{array_element.name}</TabsItem>
                }));


                setTabsContent (response.data.map(function (array_element) {
                    return (
                    chat === array_element.id &&
                        <TabContent>Это имитация сообщения для чата:{array_element.id} </TabContent>
                    )
                }));

            })
            .catch((reason) => {
                Debug(reason);
            });
    }, [chat]);

    const useMessageText = (e) => {
        setMessageText(e.target.value);
        console.log(messageText)
    };

    const addMessage = (e) => {
        let volunteerId = userInfo.id;
        chat === undefined && alert("Выберите вкладку чата")
        console.log(volunteerId)
        console.log(chat)
        axios
            .post(Utils.path('volunteer/'+volunteerId+'/chat/'+chat+'/message'), {
                "text": messageText,
                "sender": volunteerId
            })
            .then((response) => {
            })
            .catch((reason) => {
                Debug(reason);
            });

        e.preventDefault();
    };

/*
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
*/

    return(
    <Panel id={id} theme="white">

        <MenuHeader headerTitle="Чаты"/>
        <List>
            <Cell>
                <Tabs type="buttons">
                    <HorizontalScroll>
                        {tabTitle}
                    </HorizontalScroll>
                </Tabs>
            </Cell>
        </List>
        {tabsContent}


        <FixedLayout vertical="bottom">
        <form className="chat-input" onSubmit={addMessage}>
            <input className="message-input"
                   type="text"
                   onChange={useMessageText}/>

            <button className="send-button"
                    type="submit"
                    name="send"
                    value={messageText}><Icon24Send/></button>
        </form>
        </FixedLayout>

        <TabFix height="50px"/>
        <MenuTabs go={go}  role={role} activePanel={activePanel}/>
    </Panel>
)};

export default Chat;