import React, {useState} from "react";
import Icon24Dropdown from '@vkontakte/icons/dist/24/dropdown';
import './Accordion.css';

const Accordion = ({children, title}) => {
    const [isOpened, setIsOpened] = useState(false);
    return(
        <div>
            <div className="accordion-header" onClick={()=>setIsOpened(!isOpened)}>
                <p className="dropdown-title">{title}</p>
                <Icon24Dropdown className="dropdown-arrow"/>
            </div>
            {isOpened === true && <div className="accordion-content">{children}</div> }
        </div>

    )
};

export default Accordion;