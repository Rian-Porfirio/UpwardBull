import { listProducts, addProduct, deleteProduct, editProduct } from "../../../model/services/data/ProductsData";
import ProductsDataContainer from "./ProductsDataTable";
import { listProviders } from "../../../model/services/data/ProvidersData";
import ProductsLayout from "./ProductsLayout";
import { useState, useEffect } from "react";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [providers, setProviders] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editItem, setEditItem] = useState(null);

    async function handleAdd(product) {
        await addProduct(product);
        handleList();
    }

    async function handleList() {
        const productList = await listProducts();
        setProducts(productList);
    }

    async function handleListProviders() {
        const providerList = await listProviders();
        setProviders(providerList);
    }

    async function handleDelete(id) {
        await deleteProduct(id);
        handleList();
    }

    async function handleEdit(newProduct) {
        const id = editItem.id;
        await editProduct(id, newProduct);
        handleList();
    }

    const handleEditProduct = (product) => {
        setEditItem(product);
        setIsEditing(true);
    }

    useEffect(() => {
        handleList();
        handleListProviders();
    }, []);

    return (
        <div className="bg-neutral-500 w-full p-3 flex flex-col gap-3">
            <ProductsLayout
                addItem={handleAdd}
                listItem={handleList}
                listProviders={handleListProviders}
                editItem={handleEdit}
                product={editItem}
                editing={isEditing}
                setEditing={setIsEditing}
                providers={providers}
            />

            <ProductsDataContainer 
                products={products} 
                deleteFunction={handleDelete} 
                editFunction={handleEditProduct}
            />
        </div>
    );
}
