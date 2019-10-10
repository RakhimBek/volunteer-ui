import React from 'react';
import Div from "@vkontakte/vkui/dist/components/Div/Div";

import searchIcon from "./../../img/magnifying-glass.png";

const SearchProject = () => (
    <Div className="search-project">
        <input/>
        <img src={searchIcon} alt="search" />
    </Div>
);

export default SearchProject;