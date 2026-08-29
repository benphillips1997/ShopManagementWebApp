import { useState } from "react";
import Navbar from "../modules/navbar";
import { MonthPicker, YearPicker } from "react-dropdown-date";
import { api } from "../api/client";
import { useAuth } from "../modules/authProvider";
import type { Order, PaymentRequestDto } from "../api/interfaces";

function Payment() {
    const user = useAuth()?.user;
    const [paymentInfo, setPaymentInfo] = useState({ cardNumber: "", expiryMonth: "", expiryYear: "", cvv: "" });

    const makePayment = () => {
        if (!user || user?.basket.items.length < 1) {
            console.log("Error: ", !user ? "user cannot be identified" : "no items in basket");
            return;
        }

        const items = user.basket.items;

        const order: Order = {
            items: items.map(item => ({ product: item.product, costAtPurchase: item.product.cost, count: item.count })),
            orderDate: new Date().toDateString(),
            totalCost: items.reduce((acc, curr) => acc + (curr.product.cost * curr.count), 0),
            orderAddress: user.address ?? "",
            orderCountry: user.country ?? "",
            orderStatus: 1,
            paymentStatus: 1,
            user: user
        }

        api.POST("/api/CreateOrder", { body: order }).then(response => {
            if (response) {
                console.log("Successfully created order");
                api.POST("/api/MakePayment", { body: {} as PaymentRequestDto}).then(response => {
                    if (response.data?.success && !response.error) {
                        console.log("Payment successful");
                    }
                    else {
                        const message = response.data?.errorMessage ? response.data?.errorMessage : "Unknown error";
                        throw Error("Error making payment: " + message);
                    }
                }).catch(error => {
                    console.log(error);
                })
            }
            else {
                throw Error("Error creating order");
            }
        }).catch(error => {
            console.log(error);
        })
    }

    return (
    <>
        <Navbar />
        <div className="center">
            <form action={() => makePayment()} className="center-column">
                <div>
                    <label htmlFor="cardNumber">Card number</label>
                    <input type="text" id="cardNumber" name="cardNumber" value={paymentInfo.cardNumber} />
                </div>
                <div>
                    <label htmlFor="expiryDate">Expiry date</label>
                    <MonthPicker
                        id="expiryMonth"
                        name="expiryMonth"
                        endYearGiven
                        year={+paymentInfo.expiryYear}
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
                </div>
                <div>
                    <label htmlFor="cvv">CVV</label>
                    <input type="text" id="cvv" name="cvv" value={paymentInfo.cvv} />
                </div>
                <button type="submit">Pay</button>
            </form>
        </div>
    </>
    );
}

export default Payment;