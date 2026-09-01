import { useEffect, useState } from "react";
import { useAuth } from "../../modules/authProvider";
import styled from "styled-components";
import Navbar from "../../modules/navbar";
import type { Order } from "../../api/interfaces";
import { api } from "../../api/client";
import Loader from "../../modules/loader";

function Orders() {
    const auth = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadOrders();
    }, [])

    const loadOrders = () => {
        setLoading(true);

        api.GET("/api/Order/GetOrders").then(response => {
            if (!response.error && response.data) {
                setOrders(response.data);
            }
            else {
                throw Error("Error revtrieving orders");
            }
        }).catch(error => {
            console.error(error);
        }).finally(() => setLoading(false))
    }

    return (
        <>
        <Navbar />
        <div className="center">
            {!loading ? <>
                {orders && orders.length > 0 ? orders?.map(order => 
                    <OrderContainer className="center-column">
                        <p>{order.orderDate}</p>
                        <p>{order.orderStatus}</p>
                        <p>{order.orderAddress}</p>
                        {order.items && order.items.map(item => 
                            <p>{item.count} {item.product.name} - £{item.costAtPurchase}</p>
                        )}
                        <p>£{order.totalCost}</p>
                    </OrderContainer>
                    )
                : <h1>No orders to display</h1>} 
            </> : <Loader />}
        </div>
        </>
    );
}

export default Orders;

const OrderContainer = styled.div`

`