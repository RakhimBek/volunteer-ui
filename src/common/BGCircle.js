import React from 'react';

const BGCircle = ({top, left, diameter, color}) => (
    <div style={{
        position: "absolute",
        top:top,
        left:left,
        width: diameter,
        height: diameter,
        backgroundColor: color,
        borderRadius: "50%",
        zIndex: "-2"
    }}/>
);

export default BGCircle;