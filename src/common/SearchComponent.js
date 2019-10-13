import React from 'react';

import './SearchComponent.css';

const SearchComponent = () => (

        <form className="search">
            <input type="text" name="search" placeholder="Поиск" className="search-text" />
            <div className="btn-bg">
                <input type="submit" value=" " className="search-btn" />
            </div>
        </form>

);

export default SearchComponent;