import { useEffect, useState } from "react";
import { useAuth } from "../../modules/authProvider";
import styled from "styled-components";
import Navbar from "../../modules/navbar";
import type { Order } from "../../api/interfaces";
import { api } from "../../api/client";
import Loader from "../../modules/loader";
import { getEnumName, OrderStatus } from "../../enums";
import { Link } from "react-router-dom";

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
                {orders && orders.length > 0 ? 
                    <OrdersDiv>
                        {orders?.map(order => 
                            <OrderContainer className="center-column">
                                <p>Order Date: {new Date(order.orderDate).toDateString()}</p>
                                <p>Order Status: {getEnumName(OrderStatus, order.orderStatus).charAt(0).toUpperCase() + getEnumName(OrderStatus, order.orderStatus).slice(1)}</p>
                                <p>Order Address: {order.orderAddress}, {order.orderCountry}</p>
                                <p>Total Cost: £{order.totalCost}</p>
                                <OrderLink to={`/order/${order.id}`}>View Full Order</OrderLink>
                            </OrderContainer>
                        )}
                    </OrdersDiv>
                : <h1>No orders to display</h1>} 
            </> : <Loader />}
        </div>
        </>
    );
}

export default Orders;

const OrdersDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin: 40px;
    width: 40%;
    padding: 20px;
`

const OrderContainer = styled.div`
    border: 1px solid black;
    padding: 40px;
`

const OrderLink = styled(Link)`

`