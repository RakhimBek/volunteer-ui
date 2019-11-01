import React from 'react';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import './MenuHeader.css';
import {FixedLayout} from "@vkontakte/vkui";
import TabFix from "./TabFix";


const MenuHeader = ({headerTitle, closeButton}) => (
    <div>
    <FixedLayout className="menu-header-fixed">
        <header className="menu-header">
            <p className="title">{headerTitle}</p>
            {closeButton&&
                <button className="header-back-button" onClick={() => window.history.back()}><Icon24Cancel/></button>
            }
        </header>

    </FixedLayout>
    <TabFix height="129px"/>
    </div>
);

export default MenuHeader;