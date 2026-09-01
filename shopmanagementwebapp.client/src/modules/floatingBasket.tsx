import styled from "styled-components";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import Loader from "./loader";
import { useNavigate } from "react-router-dom";
import type { Basket, BasketItem } from "../api/interfaces";
import { api } from "../api/client";

interface FloatingBasketProps {
    width?: number;
    basket: Basket;
    loadBasket: () => void;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

function FloatingBasket({ width, basket, loadBasket, loading, setLoading }: FloatingBasketProps) {
    const navigate = useNavigate();

    useEffect(() => {
        loadBasket();
    }, [])

    const removeFromBasket = (basketItem: BasketItem) => {
        setLoading(true);
        api.POST("/api/Basket/RemoveItemFromBasket/{basketId}", { params: { path: { basketId: basket.id! }}, body: basketItem }).then(async response => {
            if (response.data) {
                console.log("Removed item from basket");
                await loadBasket();
            }
            else {
                throw Error("Error removing from basket");
            }            
        }).catch(error => {
            console.error('Error removing item from basket: ', error)
        }).finally(() => setLoading(false))
    }

    return (
        <BasketContainer width={width}>
            {!loading ? <>
                <ScrollableItems>
                {basket?.items && basket.items.map((item, key) =>
                    <Item key={key} className="center-column">
                        <p>{item.product.name}</p>
                        <p>{item.product.description}</p>
                        <img src={item.product.imageSource ?? undefined} alt={`Image of ${item.product.name}`} />
                        <p>£{item.product.cost.toFixed(2)}</p>
                        <p>Count: {item.count}</p>
                        <RemoveFromBasketButton onClick={() => removeFromBasket(item)}>
                            Remove from basket
                        </RemoveFromBasketButton>
                    </Item>
                )}
                </ScrollableItems>
                <BasketBottom>
                    <TotalCost>Total: £{basket.items.reduce((acc, curr) => acc + (curr.product.cost * curr.count), 0).toFixed(2)}</TotalCost>
                    <CheckoutButton onClick={() => navigate("/checkout")} disabled={basket.items.length === 0}>Checkout</CheckoutButton>
                </BasketBottom>
            </> : <Loader />}
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