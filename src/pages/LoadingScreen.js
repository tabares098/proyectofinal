import React from 'react';
import "../styles/LoadingScreen.css";

const LoadingScreen = () => {
    return (
        <div className="loadingScreen">
            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
    );
};

export default LoadingScreen;