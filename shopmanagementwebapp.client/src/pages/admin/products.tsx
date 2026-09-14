import { useEffect, useState } from "react";
import Navbar from "../../modules/navbar";
import type { Product } from "../../api/interfaces";
import { api } from "../../api/client";
import Loader from "../../modules/loader";
import styled, { css } from "styled-components";
import ManageProductModal from "../../modules/manageProductModal";
import { useAuth } from "../../modules/authProvider";

function Products() {
    const [products, setProducts] = useState<Product[]>();
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);
    const user = useAuth()?.user;

    useEffect(() => {
        loadProducts();
    }, [])

    const loadProducts = () => {
        setLoading(true);

        api.GET("/api/Product/GetProducts").then(response => {
            if (!response.error && response.data) {
                setProducts(response.data);
            }
            else {
                throw Error("Error retrieving products");
            }
        }).catch(error => {
            console.error(error);
        }).finally(() => setLoading(false))
    }

    const toggleListing = (product: Product) => {
        api.POST("/api/Product/UpdateProduct", { body: { id: product.id, isListed: !product.isListed }}).then(response => {
            if (!response.error && response.data) {
                loadProducts();
            }
            else {
                throw Error("Could not update product");
            }
        }).catch(error => console.error(error))
    }

    const deleteProduct = (product: Product) => {
        if (!product.id) {
            console.error("Deletion error: Cannot identify product id");
            return;
        }

        if (!confirm(`Are you sure you want to delete ${product.name}?`)) {
            return;
        }

        api.DELETE("/api/Product/DeleteProduct/{id}", { params: { path: { id: product.id } } }).then(response => {
            if (!response.error && response.data) {
                loadProducts();
            }
            else {
                throw Error("Error deleting product");
            }
        }).catch(error => console.error(error))
    }

    const showModal = (product: Product | null) => {
        setModalVisible(true);
        setProductToEdit(product);
    }

    const closeModal = (reloadProducts: boolean) => {
        setModalVisible(false);
        if (reloadProducts) {
            loadProducts();
        }
    }

    return (
    <>
        <Navbar />
        <div>
            {!loading ? <>
                {(products && products.length > 0) ?
                    <GridContainer $length={products.length + 1}>
                        <GridItemAddProduct className="center" onClick={() => showModal(null)}>
                            Add product
                        </GridItemAddProduct>
                        {products.map(product => 
                            <GridItem key={product.id} className="center-column">
                                <p>{product.name}</p>
                                <p>{product.description}</p>
                                <img src={product.imageSource ?? undefined} alt={`Image of ${product.name}`} />
                                <p>£{product.cost.toFixed(2)}</p>
                                <p>Stock: {product.stock}</p>
                                <p>Product is {product.isListed ? "listed" : "unlisted"}</p>
                                <button type="button" onClick={() => toggleListing(product)}>{product.isListed ? "Unlist" : "List"} product</button>
                                <button type="button" onClick={() => showModal(product)}>Manage product</button>
                                {user?.userType === 2 && <button type="button" onClick={() => deleteProduct(product)}>Delete product</button>}
                            </GridItem>
                        )}
                    </GridContainer>
                : <h1>No products found</h1>}
            </> : <Loader />}
        </div>
        {modalVisible && <ManageProductModal productToEdit={productToEdit} closeModal={closeModal} />}
    </>
    )
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

const GridItemStyleCss = css`
    background-color: #254164;
    border: 1px solid #142438;
    padding: 40px;
    font-size: 30px;
    text-align: center;
    color: white;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 5px;
    
    p {
        font-size: 24px;
        align-items: center;
        text-align: center;
    }
`

const GridItem = styled.div`
    ${GridItemStyleCss}
`

const GridItemAddProduct = styled.button`
    ${GridItemStyleCss}
`