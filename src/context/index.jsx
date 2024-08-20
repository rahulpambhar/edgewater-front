import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import socket from '../connections/socket';

export const MyContext = createContext(null);

export const MyContextProvider = ({ children }) => {
    const [subscribedProducts, setSubscribedProducts] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [prices, setPrices] = useState({});

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Socket connected');
            setIsConnected(true);
        });

        socket.on('ticker', (data) => {

            if (data.type === "ticker" ) {
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
    }, [subscribedProducts]);

    const subscribe = (product) => {
        setSubscribedProducts([...subscribedProducts, product]);
        const msg = {
            type: 'subscribe',
            channels: [{ name: 'ticker', product_ids: [product] }],
        }
        socket.emit('subscribe', msg);
    };

    const unsubscribe = (product) => {
        setSubscribedProducts(subscribedProducts.filter((p) => p !== product));
        const updatedPrices = { ...prices };
        delete updatedPrices[product]
        setPrices(updatedPrices);

        const msg = {
            type: 'unsubscribe',
            channels: [{ name: 'ticker', product_ids: [product] }],
        }
        socket.emit('unsubscribe', msg);
    };


    return (
        <MyContext.Provider value={{ subscribedProducts, setSubscribedProducts, subscribe, unsubscribe, isConnected, setIsConnected, prices }}>
            {children}
        </MyContext.Provider>
    );
};
