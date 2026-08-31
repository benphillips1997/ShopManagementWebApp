import { useEffect, useState } from "react";
import styled from "styled-components";
import Loader from "../modules/loader";
import FloatingBasket from "../modules/floatingBasket";
import { useAuth } from "../modules/authProvider";
import Navbar from "../modules/navbar";
import ErrorMessage from "../modules/errorMessage";
import { api } from "../api/client";
import type { Basket, BasketItem, Product } from "../api/interfaces";

function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const auth = useAuth();
    const user = auth?.user;
    const [productError, setProductError] = useState<boolean[]>([]);
    const [basket, setBasket] = useState<Basket>();
    const [basketLoading, setBasketLoading] = useState(false);

    useEffect(() => {
        loadProducts();
        if (user) {
            loadBasket();
        }
    }, [])

    const loadProducts = () => {
        setLoading(true);

        api.GET("/api/Product/GetProducts").then(response => {
            const data = response.data;
            setProducts(data ?? []);
        })
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }

    const loadBasket = async () => {
        await api.GET("/api/Basket/GetBasket/{userId}", { params: { path: {userId: user?.id! }}}).then(response => {
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

    const addToBasket = (product: Product, key: number) => {
        setBasketLoading(true);
        if (!basket) {
            const newArr = productError;
            newArr[key] = true;
            setProductError([...newArr]);
            return;
        }

        const basketItem: BasketItem = {
            product: product,
            count: 1
        }

        api.POST("/api/Basket/AddItemToBasket/{basketId}", { params: { path: { basketId: basket.id! }}, body: basketItem }).then(async response => {
            if (response.data) {
                console.log("Item added to basket");
                await loadBasket();
            }
            else {
                console.log("Response not okay");
            }
        }).catch(error => {
            console.log(error)
        }).finally(() => setBasketLoading(false))
    }

    return (
    <>
        <Navbar />
        <div style={{ width: user ? '80%' : '100%' }}>
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
            {basket && <FloatingBasket width={20} basket={basket} loadBasket={loadBasket} loading={basketLoading} setLoading={setBasketLoading} />}
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