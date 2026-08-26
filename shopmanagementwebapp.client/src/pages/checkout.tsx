import { useState } from "react";
import { useAuth } from "../modules/authProvider";
import Navbar from "../modules/navbar";
import Loader from "../modules/loader";
import styled from "styled-components";
import type { BasketItem } from "../interfaces";
import { Link, redirect } from "react-router-dom";


function Checkout() {
    const auth = useAuth();
    const user = auth?.user;
    const [loading, setLoading] = useState();

    if (!user) {
        redirect("/login");
    }

    const removeFromBasket = (basketItem: BasketItem) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(basketItem)
        }

        fetch(`/api/RemoveItemFromBasket/${user?.basket?.id}`, requestOptions).then(async response => {
            if (response.ok) {
                const success = await response.json();
                if (success) {
                    console.log("Removed item from basket");
                    const items = user?.basket?.items ?? [];
                    const index = items.findIndex(i => i.product.id === basketItem.product.id);
                    if (items[index].count > 1) {
                        items[index].count -= 1;
                        if (user) {
                            auth?.setUser({...user, basket: {...user.basket, items: [...items]}});
                        }
                        else {
                            throw Error("Cannot identify user");
                        }
                    }
                    else {
                        const newItems = items.filter(i => i.product.id !== basketItem.product.id);
                        if (user) {
                            auth?.setUser({...user, basket: {...user.basket, items: [...newItems]}});
                        }
                        else {
                            throw Error("Cannot identify user");
                        }
                    }
                }              
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
                <ItemsGrid $length={user?.basket?.items.length || 0}>
                {user?.basket?.items.map((item, key) => <>
                    <Item key={key} className="center-column">
                        <p>{item.product.name}</p>
                        <p>{item.product.description}</p>
                        <img src={item.product.imageSource} alt={`Image of ${item.product.name}`} />
                        <p>£{item.product.cost.toFixed(2)}</p>
                        <p>Count: {item.count}</p>
                        <RemoveFromBasketButton onClick={() => removeFromBasket(item)}>
                            Remove from basket
                        </RemoveFromBasketButton>
                    </Item>
                </>)}
                </ItemsGrid>
                <BottomDiv className="center-column">
                    <TotalCost>Total: £{user?.basket?.items.reduce((acc, curr) => acc + (curr.product.cost * curr.count), 0).toFixed(2)}</TotalCost>
                    <Link to='/payment'><CheckoutButton>Proceed to payment</CheckoutButton></Link>
                </BottomDiv>
            </> : <Loader visible={loading} />}
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