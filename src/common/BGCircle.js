import React from 'react';

const BGCircle = ({top, left, width, height, color}) => (
    <div style={{
        position: "absolute",
        top:top,
        left:left,
        width: width,
        height: height,
        backgroundColor: color,
        borderRadius: "50%",
        zIndex: "11"
    }}/>
);

export default BGCircle;