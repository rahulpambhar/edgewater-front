import React, { useState, useEffect, useContext } from "react";
import { TableRow, TableHeaderCell, TableHeader, TableCell, TableBody, Table, } from 'semantic-ui-react'
import { MyContext } from "../context";
import moment from 'moment';
interface PriceViewProps {
    ws: WebSocket | null;
    subscribedProducts: string[];
}


const PriceView: React.FC<PriceViewProps> = ({ ws, subscribedProducts }) => {
    const { prices }: any = useContext(MyContext);



    const [tickerData, setTickerData] = useState(null);

    useEffect(() => {
        // Create a new WebSocket instance
        const socket = new WebSocket('wss://ws-feed.pro.coinbase.com');

        socket.onopen = () => {
            console.log('WebSocket connection opened');

            const subscriptionMessage = JSON.stringify({
                type: "subscribe",
                channels: [{ name: "ticker", product_ids: ["ETH-USD"] }]
            });
            console.log('Sending subscription message:', subscriptionMessage);
            socket.send(subscriptionMessage);
        };

        socket.onmessage = (event) => {
            console.log('Received message:', event.data);
            const data = JSON.parse(event.data);

            if (data.type === "ticker") {
                console.log('Ticker data:', data);
                setTickerData(data);
            }
        };

        socket.onmessage = (event) => {
            console.log('Received message:', event.data);
        };
        
        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        
        socket.onclose = (event) => {
            console.log('WebSocket connection closed:', event);
        };

        return () => {
            console.log('Closing WebSocket connection');
            socket.close();
        };
    }, []);

    return (
        <div className="price-view">
            <h2>Price View</h2>

            <Table compact>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Trade id</TableHeaderCell>
                        <TableHeaderCell>Bid</TableHeaderCell>
                        <TableHeaderCell>Ask</TableHeaderCell>
                        <TableHeaderCell>Side</TableHeaderCell>
                        <TableHeaderCell>Size</TableHeaderCell>
                        <TableHeaderCell>Price</TableHeaderCell>
                        <TableHeaderCell>Product</TableHeaderCell>
                        <TableHeaderCell>Sequence</TableHeaderCell>
                        <TableHeaderCell>Time</TableHeaderCell>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {prices && Object.keys(prices).length ? subscribedProducts.map((item) => (
                        <TableRow key={item}>
                            <TableCell >{prices[item]?.trade_id}</TableCell>
                            <TableCell>{prices[item]?.bid}</TableCell>
                            <TableCell>{prices[item]?.ask}</TableCell>
                            <TableCell className={prices[item]?.side === "buy" ? "bg-green-500 text-white" : "bg-red-500 text-white"}
                            >{prices[item]?.side}</TableCell>
                            <TableCell >{prices[item]?.best_bid_size}</TableCell>
                            <TableCell >{prices[item]?.price}</TableCell>
                            <TableCell >{prices[item]?.product_id}</TableCell>
                            <TableCell >{prices[item]?.sequence}</TableCell>
                            <TableCell >{moment(prices[item]?.time).format('DD/MM/YYYY')} <br />
                                {moment(prices[item]?.time).format('HH:mm:ss')}
                            </TableCell>

                            {/* <TableCell >{prices[item]?.time}</TableCell> */}
                        </TableRow>
                    )) :
                        <TableRow className="text-center" >
                            <TableCell colSpan={9}>No data yet</TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default PriceView;
