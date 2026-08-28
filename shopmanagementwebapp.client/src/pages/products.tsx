import { useEffect, useState } from "react";
import styled from "styled-components";
import Loader from "../modules/loader";
import FloatingBasket from "../modules/floatingBasket";
import { useAuth } from "../modules/authProvider";
import Navbar from "../modules/navbar";
import ErrorMessage from "../modules/errorMessage";
import { api } from "../api/client";
import type { BasketItem, Product } from "../api/interfaces";

function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const auth = useAuth();
    const user = auth?.user;
    const [productError, setProductError] = useState<boolean[]>([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        setLoading(true);

        api.GET("/api/GetProducts").then(response => {
            const data = response.data;
            setProducts(data ?? []);
        })
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }

    const addToBasket = (product: Product, key: number) => {
        if (!user?.id) {
            const newArr = productError;
            newArr[key] = true;
            setProductError([...newArr]);
            return;
        }

        const basketItem: BasketItem = {
            product: product,
            count: 1
        }

        api.POST("/api/AddItemToBasket/{basketId}", { params: { path: { basketId: user.basket.id! }}, body: basketItem }).then(response => {
            if (response.data) {
                console.log("Item added to basket");
                const items = user.basket?.items ?? [];
                const index = items.findIndex(i => i.product.id === product.id);
                if (index !== -1) {
                    items[index].count += 1;
                    auth?.setUser({...user, basket: {...user.basket, items: [...items]}});
                }
                else {
                    auth?.setUser({...user, basket: {...user.basket, items: [...items, basketItem]}});
                }                        
            }                
            else {
                console.log("Response not okay");
            }
        }).catch(error => {
            console.log(error)
        });
    }

    return (
    <>
        <Navbar />
        <div style={{ width: user?.id ? '80%' : '100%' }}>
            {!loading ? <GridContainer $length={products.length}>
                {products && products.map((product, key) => 
                    <GridItem key={key}>
                        <p>{product.name}</p>
                        <p>{product.description ?? ""}</p>
                        <img src={product.imageSource ?? undefined} alt={`Image of ${product.name}`} />
                        <p>£{product.cost.toFixed(2)}</p>
                        <AddToBasketButton onClick={() => addToBasket(product, key)}>
                            Add to basket
                        </AddToBasketButton>
                        {productError[key] && <ErrorMessage message={"You must login first"} size={10} time={10} />}
                    </GridItem>
                )}
            </GridContainer>
            : <Loader visible={loading} />}
            {user?.id && <FloatingBasket width={20} user={user} auth={auth} />}
        </div>
    </>    
    );
}

export default Products;

const GridContainer = styled.div<{ $length: number }>`
    margin: 40px;
    display: grid;
    justify-content: space-evenly;
    grid-template-columns: ${props => props.$length < 4 ? `repeat(${props.$length}, auto)` : 'auto auto auto auto'};
    border: 1px solid #142438;
    padding: 10px;
`

const GridItem = styled.div`
    background-color: #254164;
    border: 1px solid #142438;
    padding: 40px;
    font-size: 30px;
    text-align: center;
    color: white;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 5px;
    height: 300px;
    width: 200px;
    
    p {
        font-size: 24px;
        align-items: center;
        text-align: center;
    }
`

const AddToBasketButton = styled.button`
    background-color: #4CAF50;
    border-radius: 8px;
    padding: 5px 16px 5px 16px;
    font-size: 16px;
`