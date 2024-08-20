import React from "react";

interface SystemStatusProps {
    isConnected: boolean;
}

const SystemStatus: React.FC<SystemStatusProps> = ({ isConnected }) => {
    return (
        <div className="system-status p-2">
            <p >
                WebSocket Status:
                <h6 className={`font-semibold text-lg ${isConnected ? 'text-green-500' : 'text-red-500'}`} id="status">

                    {isConnected ? 'Connected' : 'Disconnected'}
                </h6>
            </p>
        </div>
    );
};

export default SystemStatus;
