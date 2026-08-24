import { useEffect, useState } from "react";
import type { BasketItem, Product } from "../interfaces";
import styled from "styled-components";
import Loader from "../modules/loader";
import FloatingBasket from "../modules/floatingBasket";
import { useLoaderData } from "react-router-dom";
import { useAuth } from "../modules/authProvider";
import Navbar from "../modules/navBar";

function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const user = useAuth()?.user;

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/GetProducts');
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            }
            else {
                console.log("Response not okay");
            }
        }
        catch(error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    const addToBasket = (product: Product) => {
        if (!user?.id) {
            console.log("User not logged in");
            return;
        }

        const basketItem: BasketItem = {
            product: product,
            count: 1
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(basketItem)
        }

        fetch(`/api/AddItemToBasket/${user?.basket?.id}`, requestOptions).then(async response => {
                if (response.ok) {
                    console.log("Item added to basket");
                    const data = await response.json();
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
        <div className='core' style={{ width: user?.id ? '80%' : '100%' }}>
            {!loading ? <GridContainer $length={products.length}>
                {products && products.map((product, key) => 
                    <GridItem key={key}>
                        <p>{product.name}</p>
                        <p>{product.description}</p>
                        <p>{product.imageSource}</p>
                        <p>£{product.cost.toFixed(2)}</p>
                        <AddToBasketButton onClick={() => addToBasket(product)}>
                            Add to basket
                        </AddToBasketButton>
                    </GridItem>
                )}
            </GridContainer>
            : <Loader visible={loading} />}
            {user?.id && <FloatingBasket width={20} user={user} />}
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
`