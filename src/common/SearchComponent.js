import React from 'react';
import Icon16Search from '@vkontakte/icons/dist/16/search';
import './SearchComponent.css';

const SearchComponent = ({role}) => (

        <form className="search">
            <input type="text" name="search" placeholder="Поиск" className="search-text" />
            <button className={`start-search ${role==="volunteer"&&"volunteer"}`}> <Icon16Search/> </button>
        </form>

);

export default SearchComponent;