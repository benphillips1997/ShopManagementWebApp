import styled from "styled-components";
import type { Basket, BasketItem, User } from "../interfaces";
import { useEffect, useState } from "react";
import Loader from "./loader";

interface FloatingBasketProps {
    width?: number;
    user: User;
}

function FloatingBasket({ width, user }: FloatingBasketProps) {
    const [basket, setBasket] = useState<Basket>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        loadBasketItems();
    }, []);

    const loadBasketItems = () => {
        setLoading(true);
            fetch(`/api/GetBasket/${user.id}`).then(async response => {
                if (response.ok) {
                    const data = await response.json();
                    setBasket(data);
                }
            }).catch(error => {
                console.error('Error loading basket items: ', error)
            }).finally(() => {
                setLoading(false);
            });
    };

    const removeFromBasket = (basketItem: BasketItem) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(basketItem)
        }

        fetch(`/api/RemoveItemFromBasket/${basket?.id}`, requestOptions).then(async response => {
            if (response.ok) {
                console.log("Item removed from basket");
                loadBasketItems();
            }
        }).catch(error => {
            console.error('Error removing item from basket: ', error)
        });
    }

    return (
        <BasketContainer width={width}>
            {!loading ? basket?.items.map((item, key) => 
                <Item key={key}>
                    <p>{item.product.name}</p>
                    <p>{item.product.description}</p>
                    <p>{item.product.imageSource}</p>
                    <p>£{item.product.cost.toFixed(2)}</p>
                    <RemoveFromBasketButton onClick={() => removeFromBasket(item)}>
                        Remove from basket
                    </RemoveFromBasketButton>
                </Item>
            ) : <Loader visible={loading} />}
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
    background-color: rgb(32, 166, 228);
`

const Item = styled.div`
`

const RemoveFromBasketButton = styled.button`
    background-color: red;
`