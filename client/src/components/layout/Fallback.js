import React from "react";
import BaseSpinnerAlt from "../UI/BaseSpinnerAlt";

const Fallback = () => {
    return (
        <React.Fragment>
            <BaseSpinnerAlt />
            <div style={{width: '100%', height: '100vh'}}></div>
        </React.Fragment>
    )
}

export default Fallback;