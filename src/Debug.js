import React from "react";
import ReactDOM from "react-dom";

const Debug = (reason) => {

    const style = {
        top: 0,
        left: 0,
        position: "absolute",
        opacity: 1,
        zIndex: 9999,
        backgroundColor: "#abab2b"
    };

    const Show = ({reason}) => (
        <div style={style}>
            <pre>
                <code>{JSON.stringify(reason, null, 2)}</code>
            </pre>
        </div>
    );

    ReactDOM.render(<Show reason={reason}/>, document.getElementById('debug'));
};

export default Debug;