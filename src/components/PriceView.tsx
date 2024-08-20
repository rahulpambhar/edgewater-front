import React, { useState, useEffect, useContext } from "react";
import { TableRow, TableHeaderCell, TableHeader, TableCell, TableBody, Table, } from 'semantic-ui-react'
import { MyContext } from "../context";

interface PriceViewProps {
    ws: WebSocket | null;
    subscribedProducts: string[];
}


const PriceView: React.FC<PriceViewProps> = ({ ws, subscribedProducts }) => {
    const { prices }: any = useContext(MyContext);

    return (
        <div className="price-view">
            <h2>Price View</h2>

            <Table compact>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Trade id</TableHeaderCell>
                        <TableHeaderCell>Marker Order Id</TableHeaderCell>
                        <TableHeaderCell>Taker Order Id</TableHeaderCell>
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
                            <TableCell>None</TableCell>
                            <TableCell>None</TableCell>
                            <TableCell >{prices[item]?.side}</TableCell>
                            <TableCell >{prices[item]?.best_bid_size}</TableCell>
                            <TableCell >{prices[item]?.price}</TableCell>
                            <TableCell >{prices[item]?.product_id}</TableCell>
                            <TableCell >{prices[item]?.sequence}</TableCell>
                            <TableCell >{prices[item]?.time}</TableCell>
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
