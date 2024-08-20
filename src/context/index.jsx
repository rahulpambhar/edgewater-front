import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import socket from '../connections/socket';

export const MyContext = createContext(null);

export const MyContextProvider = ({ children }) => {
    const ws = useRef(null);
    const [subscribedProducts, setSubscribedProducts] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [pricess, setPrices] = useState({});
    const prices = {
        "type": "ticker",
        "sequence": 86342441047,
        "product_id": "BTC-USD",
        "price": "60782.94",
        "open_24h": "58069.26",
        "volume_24h": "10490.18583672",
        "low_24h": "57989.18",
        "high_24h": "61457.03",
        "volume_30d": "358050.68670093",
        "best_bid": "60780.92",
        "best_bid_size": "0.00098715",
        "best_ask": "60782.95",
        "best_ask_size": "0.65816466",
        "side": "sell",
        "time": "2024-08-20T10:11:28.812221Z",
        "trade_id": 682638450,
        "last_size": "0.00004413"
    }


    useEffect(() => {
        if (ws) {
            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === "ticker" && subscribedProducts.includes(data.product_id)) {
                    setPrices((prevPrices) => ({
                        ...prevPrices,
                        [data.product_id]: {
                            trade_id: data.trade_id,
                            side: data.side,
                            best_bid_size: data.best_bid_size,
                            price: data.price,
                            product_id: data.product_id,
                            sequence: data.sequence,
                            time: data.time,
                            bid: data.best_bid,
                            ask: data.best_ask,
                        },
                    }));
                }
            };
        }
    }, [ws, subscribedProducts]);

    useEffect(() => {
        ws.current = new WebSocket('wss://ws-feed.pro.coinbase.com');
        ws.current.onopen = () => console.log('WebSocket connection opened.');
        ws.current.onclose = () => console.log('WebSocket connection closed.');

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Socket connected');
            setIsConnected(true);
            socket.emit('subscribe', 'hello from frontend..');
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected');
            setIsConnected(false);
        });

        socket.on('connect_error', (error) => {
            console.log('Socket connection error:', error);
            setIsConnected(false);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('connect_error');
        };
    }, []);

    const subscribe =  (product) => {
        setSubscribedProducts([...subscribedProducts, product]);

        if (ws.current) {
            const msg = {
                type: 'subscribe',
                channels: [{ name: 'ticker', product_ids: [product] }],
            };
            ws.current.send(JSON.stringify(msg));
        }
    };

    const unsubscribe = (product) => {
        setSubscribedProducts(subscribedProducts.filter((p) => p !== product));

        if (ws.current) {
            const msg = {
                type: 'unsubscribe',
                channels: [{ name: 'ticker', product_ids: [product] }],
            };
            ws.current.send(JSON.stringify(msg));
        }
    };





    return (
        <MyContext.Provider value={{ subscribedProducts, setSubscribedProducts, subscribe, unsubscribe, isConnected, setIsConnected, prices }}>
            {children}
        </MyContext.Provider>
    );
};
