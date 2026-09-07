import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../modules/authProvider";
import Navbar from "../../modules/navbar";
import { useEffect, useState } from "react";
import { api } from "../../api/client";
import { type Order as OrderModel } from "../../api/interfaces";
import Loader from "../../modules/loader";
import { getEnumName, OrderStatus } from "../../enums";
import styled from "styled-components";

function Order() {
    const auth = useAuth();
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [order, setOrder] = useState<OrderModel>();

    useEffect(() => {
        loadOrder();
    }, [])

    const loadOrder = () => {
        if (!params.orderId) {
            navigate("/orders");
        }

        setLoading(true);

        api.GET("/api/Order/GetOrder/{orderId}", { params: { path: { orderId: params.orderId! } }}).then(response => {
            if (!response.error && response.data) {
                setOrder(response.data);
            }
            else {
                throw Error("Could not retrieve order");
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
            {order ?
            <OrderDiv className='center-column'>
                <p>Order date: {new Date(order.orderDate).toDateString()}</p>
                <p>Order Status: {getEnumName(OrderStatus, order.orderStatus).charAt(0).toUpperCase() + getEnumName(OrderStatus, order.orderStatus).slice(1)}</p>
                <p>Order Address: {order.orderAddress}, {order.orderCountry}</p>
                {order.items.map(item => 
                            <p>{item.product.name}: 5 - £{item.costAtPurchase}</p>
                )}
                <p>Total Cost: £{order.totalCost}</p>
            </OrderDiv>
            : <h1 className="center">Could not retrieve order details</h1>}
        </> : <Loader />}
        </div>
    </>
    );
}

export default Order;

const OrderDiv = styled.div`
    border: 1px solid black;
    width: 40%;
    margin: 40px;
    padding: 50px;
`