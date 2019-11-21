import React from 'react';
import BGCircle from "./BGCircle";

const BGRandCircles = ({quantity}) => {
    let colors = ["rgb(149, 240, 77)",
        "rgb(255, 250, 119)",
        "rgb(255, 107, 178)",
        "rgb(255, 60, 65)",
        "rgb(239, 44, 147)"];

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
    }

    let circles = [];
    for (let i = 0; i < quantity; i++) {
        circles.push(
            <BGCircle diameter={getRandomInt(40, 100) + "px"}
                      top={getRandomInt(-15, window.innerHeight) + "px"}
                      left={getRandomInt(-15, window.innerWidth) + "px"}
                      color={colors[getRandomInt(0, colors.length)]}/>
        )
    }
    console.log(circles)
    return (
        <div>
            {circles}
        </div>
    )

};

export default BGRandCircles;