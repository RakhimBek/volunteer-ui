import React from 'react';
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import addIcon from '../../img/play_24.png'

const AddTask = ({go}) => (
    <Div>
        <button onClick={go} data-to="new_task"><img src={addIcon} alt="add"/> добавить</button>
    </Div>
);

export default AddTask;