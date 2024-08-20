import React, { useEffect, useContext, useRef, useState } from "react";
import SubscriptionComponent from "./components/SubscriptionComponent";
import PriceView from "./components/PriceView";
import { MyContext } from './context/index.jsx';
import SystemStatus from "./components/SystemStatus";
import socket from "./connections/socket";
const WebSocketComponent = () => {
  const ws = useRef<WebSocket | null>(null);

  const { isConnected, subscribedProducts, unsubscribe, subscribe, setSubscribedProducts, setIsConnected }: any = useContext(MyContext);


  useEffect(() => {

    ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");
    ws.current.onopen = () => {
      console.log("WebSocket connection opened.");
    };
    ws.current.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  useEffect(() => {
    // Listen for connection events
    socket.on('connect', () => {
      console.log('Socket connected');
      setIsConnected(true);
      socket.emit('subscribe', "hello from frontend");
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      setIsConnected(false);
    });

    socket.on('connect_error', (error) => {
      console.log('Socket connection error:', error);
      setIsConnected(false);
    });

    // Cleanup on unmount
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
    };
  }, []);

  // const subscribe = (product: string) => {
  //   setSubscribedProducts([...subscribedProducts, product]);

  //   if (ws.current) {
  //     const msg = {
  //       type: "subscribe",
  //       channels: [{ name: "ticker", product_ids: [product] }],
  //     };
  //     ws.current!.send(JSON.stringify(msg));
  //   }
  // };

  // const unsubscribe = (product: string) => {
  //   setSubscribedProducts(subscribedProducts.filter((p: string) => p !== product));

  //   if (ws.current) {
  //     const msg = {
  //       type: "unsubscribe",
  //       channels: [{ name: "ticker", product_ids: [product] }],
  //     };
  //     ws.current!.send(JSON.stringify(msg));
  //   }
  // };

  return (
    <div>
      <SubscriptionComponent onSubscribe={subscribe} onUnsubscribe={unsubscribe} />
      <PriceView ws={ws.current} subscribedProducts={subscribedProducts} />
      <SystemStatus isConnected={isConnected} />
    </div>
  );
};

export default WebSocketComponent;

