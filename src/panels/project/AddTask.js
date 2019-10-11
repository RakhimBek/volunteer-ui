import React from 'react';
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import addIcon from '../../img/play_24.png'

const AddTask = () => (
    <Div>
        <button><img src={addIcon} alt="add"/> добавить</button>
    </Div>
);

export default AddTask;