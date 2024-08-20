import React, { useContext, useState } from "react";
import { MyContext } from "../context";

interface SubscriptionComponentProps {
    onSubscribe: (product: string) => void;
    onUnsubscribe: (product: string) => void;
}

const SubscriptionComponent: React.FC<SubscriptionComponentProps> = ({ onSubscribe, onUnsubscribe }) => {
    const products: string[] = ["BTC-USD", "ETH-USD", "LTC-USD",];
    const { subscribedProducts, unsubscribe, subscribe, setSubscribedProducts }: any = useContext(MyContext);

    const handleSubscribe = (product: string) => {
        if (!subscribedProducts.includes(product)) {
            // setSubscribedProducts([...subscribedProducts, product]);
            subscribe(product);
        }
    };

    const handleUnsubscribe = (product: string) => {
        // setSubscribedProducts(subscribedProducts.filter((p: string) => p !== product));
        unsubscribe(product);
    };

    return (
        <div>

            <div className="subscription-container">
                <h2>Subscribe/Unsubscribe Products</h2>
                <ul>
                    {products.map((product) => (
                        <li key={product} className="product-item">
                            <span>{product}</span>
                            {subscribedProducts.includes(product) ? (
                                <button
                                    onClick={() => handleUnsubscribe(product)}
                                    className="unsubscribe-button"
                                >
                                    Unsubscribe
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleSubscribe(product)}
                                    className="subscribe-button"
                                >
                                    Subscribe
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

        </div>

    );
};

export default SubscriptionComponent;
