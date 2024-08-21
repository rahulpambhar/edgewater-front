import React, { useContext, useState } from "react";
import { MyContext } from "../context";
import {products} from "../initials";

const SubscriptionComponent: React.FC = () => {
    const { subscribedProducts, unsubscribe, subscribe }: any = useContext(MyContext);
    const [isConnected, setIsConnected] = useState(true); 

    // subscribe to products
    const handleSubscribe = (product: string) => {
        !subscribedProducts.includes(product) && subscribe(product);
    };

    // unsubscribe from products
    const handleUnsubscribe = (product: string) => {
        unsubscribe(product);
    };

    return (
        <div className="p-4">
            <div className="subscription-container bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Subscribe/Unsubscribe Products</h2>
                <ul>
                    {products.map((product) => (
                        <li key={product} className="product-item flex justify-between items-center py-2">
                            <span
                                className={`text-lg ${
                                    isConnected ? 'text-green-500' : 'text-red-500'
                                }`}
                            >
                                {product}
                            </span>
                            {subscribedProducts.includes(product) ? (
                                <button
                                    onClick={() => handleUnsubscribe(product)}
                                    className="unsubscribe-button bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                                >
                                    Unsubscribe
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleSubscribe(product)}
                                    className="subscribe-button bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
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
