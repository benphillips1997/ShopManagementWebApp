import styled from "styled-components";
import type { Basket, BasketItem, User } from "../interfaces";
import { useEffect, useState } from "react";
import Loader from "./loader";
import type { AuthContextType } from "./authProvider";
import { Link } from "react-router-dom";

interface FloatingBasketProps {
    width?: number;
    user: User;
    auth: AuthContextType | null;
}

function FloatingBasket({ width, user, auth }: FloatingBasketProps) {
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        //loadBasketItems();
    }, []);

    // const loadBasketItems = () => {
    //     setLoading(true);
    //         fetch(`/api/GetBasket/${user.id}`).then(async response => {
    //             if (response.ok) {
    //                 console.log(response)
    //                 const data = await response.json();
    //                 setBasket(data);
    //                 console.log(data)
    //             }
    //         }).catch(error => {
    //             console.error('Error loading basket items: ', error)
    //         }).finally(() => {
    //             setLoading(false);
    //         });
    // };

    const removeFromBasket = (basketItem: BasketItem) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(basketItem)
        }

        fetch(`/api/RemoveItemFromBasket/${user.basket?.id}`, requestOptions).then(async response => {
            if (response.ok) {
                const success = await response.json();
                if (success) {
                    console.log("Removed item from basket");
                    const items = user.basket?.items ?? [];
                    const index = items.findIndex(i => i.product.id === basketItem.product.id);
                    if (items[index].count > 1) {
                        items[index].count -= 1;
                        auth?.setUser({...user, basket: {...user.basket, items: [...items]}});
                    }
                    else {
                        const newItems = items.filter(i => i.product.id !== basketItem.product.id);
                        auth?.setUser({...user, basket: {...user.basket, items: [...newItems]}});
                    }
                }              
            }
        }).catch(error => {
            console.error('Error removing item from basket: ', error)
        });
    }

    return (
        <BasketContainer width={width}>
            {!loading ? <>
                <ScrollableItems>
                {user.basket?.items.map((item, key) =>
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
                )}
                </ScrollableItems>
                <BasketBottom>
                    <TotalCost>Total: £{user.basket?.items.reduce((acc, curr) => acc + (curr.product.cost * curr.count), 0).toFixed(2)}</TotalCost>
                    <Link to='/checkout'><CheckoutButton>Checkout</CheckoutButton></Link>
                </BasketBottom>
            </> : <Loader visible={loading} />}
        </BasketContainer>
    );
}

export default FloatingBasket;

const BasketContainer = styled.div<{ width?: number }>`
    top: 0;
    position: fixed;
    right: 0;
    width: ${props => props.width ? `${props.width}%` : '20%'};
    height: 100%;
    background-color: rgb(15, 122, 172);
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 25px 0 0 25px;
`

const ScrollableItems = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 80%;
    overflow-y: auto;
`

const Item = styled.div`
    border: 2px solid #19314E;
    margin: 20px;
    border-radius: 25px;
    padding: 10px;
    font-size: 24px;
    width: 80%;
`

const RemoveFromBasketButton = styled.button`
    background-color: red;
    border-radius: 8px;
    padding: 5px 16px 5px 16px;
    font-size: 16px;
    color: white;
`

const BasketBottom = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    bottom: 4%;
    position: fixed;
`

const TotalCost = styled.p`
    text-align: center;
    font-size: 28px;
`

const CheckoutButton = styled.button`
    background-color: #224ea0;
    color: white;
    font-size: 20px;
    padding: 5px 24px 5px 24px;
    border-radius: 8px;
`