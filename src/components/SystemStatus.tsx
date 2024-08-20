import React, { useState, useEffect } from "react";
interface SystemStatusProps {
    isConnected: boolean;
}

const SystemStatus: React.FC<SystemStatusProps> = ({ isConnected }) => {

    return (
        <div className="system-status">
            <h5>WebSocket Status: {isConnected ? 'Connected' : 'Disconnected'}</h5>
        </div>
    );
};

export default SystemStatus;
