import { listProducts, addProduct, deleteProduct, editProduct } from "../../../model/services/data/ProductsData";
import ProductsDataContainer from "./ProductsDataTable";
import ProductsLayout from "./ProductsLayout";
import { useState } from "react";

export default function ProductsPage(){

    const [product, setProduct] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editItem, setEditItem] = useState(null)

    async function handleAdd(product){
        await addProduct(product)
    }

    async function handleList(){
        let products = await listProducts();
        setProduct(products)
    }

    async function handleDelete(id){
        await deleteProduct(id);
    }

    async function handleEdit(newProduct){
        const id = editItem.id;
        await editProduct(id, newProduct)
    }
    
    const handleEditProduct = (product) =>{
        setEditItem(product)
        setIsEditing(true);
    }

    return (
        <div className="bg-neutral-500 w-full p-3 flex flex-col gap-3">
            <ProductsLayout addItem={handleAdd} listItem={handleList} editItem={handleEdit} product={editItem} editing={isEditing} setEditing={setIsEditing}/>
            <ProductsDataContainer products={product} deleteFunction={handleDelete} editProduct={handleEditProduct}/>
        </div>
    )
}