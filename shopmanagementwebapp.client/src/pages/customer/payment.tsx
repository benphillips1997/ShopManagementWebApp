import { useEffect, useState } from "react";
import Navbar from "../../modules/navbar";
import { MonthPicker, YearPicker } from "react-dropdown-date";
import { api } from "../../api/client";
import { useAuth } from "../../modules/authProvider";
import type { Basket, Order, ProcessOrderRequestDto } from "../../api/interfaces";
import styled from "styled-components";

function Payment() {
    const user = useAuth()?.user;
    const [addressInput, setAddressInput] = useState({ address: user?.address ?? "", country: user?.country ?? "" });
    const [paymentInfo, setPaymentInfo] = useState({ cardNumber: "", expiryMonth: "", expiryYear: "", cvv: "" });
    const [basket, setBasket] = useState<Basket>();

    useEffect(() => {
        loadBasket();
    }, [])

    const loadBasket = () => {
        api.GET("/api/Basket/GetBasket/{userId}", { params: { path: {userId: user?.id! }}}).then(response => {
            if (!response.error && response.data) {
                setBasket(response.data);
            }
            else {
                throw Error("Error retrieving basket");
            }
        }).catch(error => {
            console.error(error);
        })
    }

    const makePayment = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!user || !basket || basket.items.length < 1) {
            console.error("Error: ", !user ? "user cannot be identified" : "no items in basket");
            return;
        }

        const items = basket.items;


        const order: Order = {
            items: items.map(item => ({ product: item.product, productId: item.product.id!, costAtPurchase: item.product.cost, count: item.count })),
            orderDate: new Date().toISOString(),
            totalCost: items.reduce((acc, curr) => acc + (curr.product.cost * curr.count), 0),
            orderAddress: addressInput.address,
            orderCountry: addressInput.country,
            orderStatus: 2,
            paymentStatus: 2,
            user: user,
            userId: user.id!
        }

        const requestBody: ProcessOrderRequestDto = {
            amountToPay: order.totalCost,
            order: order,
            currency: "gbp"                
        }

        api.POST("/api/Order/ProcessOrder", { body: requestBody }).then(response => {
            if (!response.error && response.data.success) {
                console.log("Order and payment successful");

            }
            else {
                throw Error(response.data.errorMessage ?? `${response.response.status} error while creating order. ${response.response.statusText}`);
            }
        }).catch(error => {
            console.error(error);
        })
    }

    return (
    <>
        <Navbar />
        <div className="center">            
            <PaymentContainer onSubmit={makePayment} className="center-column">
                <h3>Order Address</h3>
                <PaymentComponent>
                    <label htmlFor="address">Order address:</label><br />
                    <input 
                        type="text" 
                        id="address" 
                        name="address" 
                        value={addressInput.address} 
                        onChange={(e) => setAddressInput({ ...addressInput, address: e.target.value })}
                    />
                </PaymentComponent>
                <PaymentComponent>
                    <label htmlFor="country">Order country:</label><br />
                    <input 
                        type="text"
                        id="country"
                        name="country"
                        value={addressInput.country}
                        onChange={(e) => setAddressInput({ ...addressInput, country: e.target.value })}
                    />
                </PaymentComponent>
                <br /><br />
                <h3>Payment information</h3>
                <PaymentComponent>
                    <label htmlFor="cardNumber">Card number:</label><br />
                    <input 
                        type="text" 
                        id="cardNumber" 
                        name="cardNumber" 
                        value={paymentInfo.cardNumber} 
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                    />
                </PaymentComponent>
                <PaymentComponent>
                    <label htmlFor="expiryDate">Expiry date:</label><br />
                    <MonthPicker
                        id="expiryMonth"
                        name="expiryMonth"
                        endYearGiven
                        year={+paymentInfo.expiryYear}
                        short
                        value={+paymentInfo.expiryMonth}
                        onChange={(month: any) => setPaymentInfo({ ...paymentInfo, expiryMonth: month.toString() })}
                    />
                    <YearPicker
                        id="expiryYear"
                        name="expiryYear"
                        start={new Date().getFullYear()}
                        end={new Date(new Date().setFullYear(new Date().getFullYear() + 10)).getFullYear()}
                        value={+paymentInfo.expiryYear}
                        onChange={(year: any) => setPaymentInfo({ ...paymentInfo, expiryYear: year.toString() })}
                    />                    
                </PaymentComponent>
                <PaymentComponent>
                    <label htmlFor="cvv">CVV:</label><br />
                    <input 
                        type="text" 
                        id="cvv" 
                        name="cvv" 
                        value={paymentInfo.cvv} 
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                    />
                </PaymentComponent>
                <button type="submit">Pay</button>
            </PaymentContainer>
        </div>
    </>
    );
}

export default Payment;

const PaymentContainer = styled.form`
    margin: 60px;
    width: 50%;
    padding: 40px;
    border: 1px solid black;
`

const PaymentComponent = styled.div`
    margin: 10px;
    text-align: left;
`