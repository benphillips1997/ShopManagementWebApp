import { useEffect, useState } from "react";
import { useAuth } from "../modules/authProvider";
import styled from "styled-components";
import Navbar from "../modules/navbar";
import type { Order } from "../api/interfaces";

function Orders() {
    const auth = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     loadOrders();
    // }, [])

    // const loadOrders = () => {
    //     setLoading(true);

    //     fetch()
    // }

    return (
        <>
        <Navbar />
        <div className="center">
            {!!auth?.user?.orders && auth?.user?.orders?.map((order, key) => 
                <OrderContainer className="center-column">
                    <p>{order.orderDate}</p>
                    <p>{order.orderStatus}</p>
                    <p>{order.orderAddress}</p>
                    {order.items && order.items.map((item, key) => 
                        <p>{item.count} {item.product.name} - £{item.costAtPurchase}</p>
                    )}
                    <p>£{order.totalCost}</p>
                </OrderContainer>
            )}
        </div>
        </>
    );
}

export default Orders;

const OrderContainer = styled.div`

`