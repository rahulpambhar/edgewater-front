export interface SubscribedProducts {
    type: string;
    sequence: number;
    product_id: string;
    trade_id: string;
    price: string;
    open24h: string;
    volume24h: string;
    low24h: string;
    high24h: string;
    volume30d: string;
    bestBid: string;
    bestBidSize: string;
    bestAsk: string;
    bestAskSize: string;
    side: string;
    time: string;
    tradeId: number;
    lastSize: string;
}
