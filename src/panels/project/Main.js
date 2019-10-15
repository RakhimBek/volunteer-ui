import React from 'react';
import SearchComponent from "../../common/SearchComponent";
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

import TaskPreview from "./TaskPreview";

import eg from '../../img/play_24.png'
import MenuTabs from "../../common/MenuTabs";
import MenuHeader from "../../common/MenuHeader";
import {Button, Tabs, TabsItem, Cell, List} from "@vkontakte/vkui";
import Icon16Add from '@vkontakte/icons/dist/16/add';

import './Main.css';

const Project = ({id, go}) => (
    <Panel id={id} theme="white">
        <div>
            <MenuHeader headerTitle="Задачи"/>
            <SearchComponent/>
            <List>
                <Cell>
                    <Tabs type="buttons">
                        <TabsItem

                        >
                           Мои задачи
                        </TabsItem>
                        <TabsItem

                        >
                            Архив
                        </TabsItem>
                    </Tabs>
                </Cell>
            </List>

            <div className="add-task">
            <Button before={<Icon16Add/>} onClick={go} data-to="new_task">ДОБАВИТЬ</Button>
            </div>
            <TaskPreview go={go} image={eg} description="Уважаемые волонтёры! Нам нужно 3 человека в гардероб. Работа с 9:00." startDate="10.11.1993" endDate="11.11.1993" hashtag="#гардероб"/>
            <TaskPreview go={go} image={eg} description="Задача №2" startDate="11.11.1993" endDate="11.11.1993" hashtag="task12"/>
            <TaskPreview go={go} image={eg} description="Задача №3" startDate="12.11.1993" endDate="12.11.1993" hashtag="task13"/>
        </div>

        <MenuTabs go={go}/>
    </Panel>
);

export default Project;