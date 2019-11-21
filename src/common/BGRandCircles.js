import React from 'react';
import BGCircle from "./BGCircle";

const BGRandCircles = ({quantity}) => {
    let colors = ["yellow", "red"];
    function getRandomInt(min, max) {
        return  Math.floor(min) + Math.floor(Math.random() * Math.floor(max - min));
    }
    return(
        map
        <BGCircle width={getRandomInt(30, 100)+"px"} height={}
    )

}