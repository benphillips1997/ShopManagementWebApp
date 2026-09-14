import { useState } from "react";
import { type Product } from "../api/interfaces";
import { api } from "../api/client";
import styled from "styled-components";

interface ManageProductModalProps {
    productToEdit: Product | null;
    closeModal: (reloadProducts: boolean) => void;
}

function ManageProductModal({ productToEdit, closeModal }: ManageProductModalProps) {
    const [product, setProduct] = useState<Product>(productToEdit ?? { name: "", isListed: false, cost: 0, stock: 0 });
    const [processing, setProcessing] = useState(false);

    const addOrUpdateProduct = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        setProcessing(true);
        
        api.POST(`/api/Product/${productToEdit ? "Update" : "Add"}Product`, { body: { query: product }}).then(response => {
            if (!response.error && response.data) {
                closeModal(true);
            }
            else {
                throw Error(`Error could not ${productToEdit ? "update" : "add"} product`);
            }
        }).catch(error => {
            console.error(error);
        }).finally(() => setProcessing(false))
    }

    return (
    <>
        <ModalBackground />
        <ModalContainer className="center">
            <form onSubmit={addOrUpdateProduct} onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })} className="center-column">
                <div>
                    <label htmlFor="productName">Product name</label><br />
                    <input type="text" id="productName" name="productName" value={product?.name ?? ""} required />
                </div>
                <div>
                    <label htmlFor="productDescription">Product description</label><br />
                    <input type="text" id="productDescription" name="productDescription" value={product?.description ?? ""} />
                </div>
                <div>
                    <label htmlFor="productImage">Product image</label><br />
                    {!!product.imageSource && <img src={product.imageSource} width={40} height={40} />}
                    <input type="file" accept="image/*" id="productImage" name="productImage">Choose image</input>
                </div>
                <div>
                    <label htmlFor="productCost">Product cost</label><br />
                    <input type="text" id="productCost" name="productCost" value={product?.cost ?? ""} required />
                </div>
                <div>
                    <label htmlFor="productStock">Product stock</label><br />
                    <input type="number" id="productStock" name="productStock" value={product?.stock ?? ""} required />
                </div>
                <button type="submit" disabled={processing}>{productToEdit ? "Update" : "Add"} product</button>
                <button type="button" disabled={processing} onClick={() => closeModal(false)}>Cancel</button>
            </form>
        </ModalContainer>
    </>
    )
}

export default ManageProductModal;

const ModalContainer = styled.div`
    position: fixed;
    top: 20%;
    left: 20%;
    width: 60%;
    height: 60%;
    border-radius: 25px;
    background-color: #3c4f8b;
`

const ModalBackground = styled.div`
    background-color: #1d2235;
    opacity: 0.5;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
`