import { useEffect, useState } from "react";
import { useAuth } from "../modules/authProvider";
import Navbar from "../modules/navbar";
import Loader from "../modules/loader";
import styled from "styled-components";
import { Link } from "react-router-dom";
import type { Basket, BasketItem } from "../api/interfaces";
import { api } from "../api/client";


function Checkout() {
    const user = useAuth()?.user;
    const [loading, setLoading] = useState(false);
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
            console.log(error);
        })
    }

    const removeFromBasket = (basketItem: BasketItem) => {
        if (!basket) {
            console.log("Error: cannot identify basket");
            return;
        }

        api.POST("/api/Basket/RemoveItemFromBasket/{basketId}", { params: { path: { basketId: basket.id! }}, body: basketItem }).then(async response => {
            if (response.data) {
                console.log("Removed item from basket");
                setLoading(true);
                await loadBasket();
                setLoading(false);
            }
            else {
                throw Error("Error removing from basket");
            }            
        }).catch(error => {
            console.error('Error removing item from basket: ', error)
        });
    }

    return (
    <>
        <Navbar />
        <div>
            {!loading ? <>
                {basket && basket.items.length > 0 ?
                <ItemsGrid $length={basket.items.length || 0}>
                {basket && basket.items.map((item, key) => <>
                    <Item key={key} className="center-column">
                        <p>{item.product.name}</p>
                        <p>{item.product.description}</p>
                        <img src={item.product.imageSource ?? ""} alt={`Image of ${item.product.name}`} />
                        <p>£{item.product.cost.toFixed(2)}</p>
                        <p>Count: {item.count}</p>
                        <RemoveFromBasketButton onClick={() => removeFromBasket(item)}>
                            Remove from basket
                        </RemoveFromBasketButton>
                    </Item>
                </>)}
                </ItemsGrid>
                : <h1 className="center">No items found</h1>}
                <BottomDiv className="center-column">
                    <TotalCost>Total: £{basket ? basket.items.reduce((acc, curr) => acc + (curr.product.cost * curr.count), 0).toFixed(2) : 0}</TotalCost>
                    <Link to={basket && basket.items.length > 0 ? '/payment' : '/products'}>
                        <CheckoutButton>{basket && basket.items.length > 0  ? "Proceed to payment" : "Return to shop"}</CheckoutButton>
                    </Link>
                </BottomDiv>
            </> : <Loader />}
        </div>
    </>
    );
}

export default Checkout;

const ItemsGrid = styled.div<{ $length: number }>`
    display: grid;
    justify-content: space-evenly;
    grid-template-columns: ${props => props.$length < 2 ? `repeat(${props.$length}, auto)` : 'auto auto auto auto'};
    border: 1px solid black;
    margin: 40px 100px;
    border-radius: 10px;
`

const Item = styled.div`
    border: 1px solid #000000;
    margin: 40px 50px;
    border-radius: 10px;
    padding: 10px;
    font-size: 24px;
    width: 300px;
    background-color: #233e64;
`

const RemoveFromBasketButton = styled.button`
    background-color: red;
    border-radius: 8px;
    padding: 5px 16px;
    font-size: 16px;
    color: white;
`

const BottomDiv = styled.div`

`

const TotalCost = styled.p`
    text-align: center;
    font-size: 28px;
`

const CheckoutButton = styled.button`
    background-color: #224ea0;
    color: white;
    font-size: 20px;
    padding: 5px 24px;
    border-radius: 8px;
`