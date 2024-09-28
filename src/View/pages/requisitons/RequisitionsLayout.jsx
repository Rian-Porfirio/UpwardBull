import { useState, useEffect, useCallback } from "react";
import { listProducts } from "../../../model/services/data/ProductsData";
import InputCrud from "../../components/InputCrud";
import { toast } from "react-toastify";

export default function RequisitionsLayout({ addItem, listItem, editItem, requisition, editing, setEditing, currentUser }) {
    const [product, setProduct] = useState("");
    const [quantity, setQuantity] = useState("");
    const [note, setNote] = useState("");
    const [productsList, setProductsList] = useState([]);

    const handleClean = () => {
        setProduct("");
        setQuantity("");
        setNote("");
    };

    const validateInputs = () => {
        if (!product || !quantity) {
            toast.error("Please fill in the product and quantity.");
            return false;
        }
        if (isNaN(quantity) || quantity <= 0) {
            toast.error("Quantity must be a positive number.");
            return false;
        }
        return true;
    };

    const handleRegister = useCallback(() => {
        if (validateInputs()) {
            addItem({
                product,
                quantity,
                note,
            }, currentUser);
            listItem();
            handleClean();
            toast.success("Item registered successfully.");
        }
    }, [product, quantity, note, addItem, currentUser]);

    const handleEdit = useCallback(() => {
        if (validateInputs()) {
            editItem({
                product,
                quantity,
                note,
            });
            handleClean();
            setEditing(false);
            listItem();
            toast.success("Item updated successfully.");
        }
    }, [product, quantity, note, editItem, handleClean, setEditing]);

    const handleCancel = () => {
        handleClean();
        setEditing(false);
    };

    const handleInputs = () => {
        setProduct(requisition.product);
        setQuantity(requisition.quantity);
        setNote(requisition.note);
    };

    const loadProducts = async () => {
        try {
            const products = await listProducts();
            const activeProducts = products.filter(p => p.isActive);
            setProductsList(activeProducts);
        } catch (error) {
            console.error("Error loading products:", error);
        }
    };

    useEffect(() => {
        if (editing) {
            handleInputs(); 
        }
    }, [editing, requisition]);

    useEffect(() => {
        listItem();
        loadProducts();
    }, []);

    return (
        <div className="h-fit bg-white rounded-lg p-4 text-black">
            <div className="h-full">
                <div className="text-xs flex flex-col gap-2">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block mb-2">Product</label>
                            <select
                                value={product}
                                onChange={(e) => setProduct(e.target.value)} 
                                className="select w-full bg-neutral-200 h-12"
                            >
                                <option value="">Select a product</option>
                                {productsList.map((p) => (
                                    <option key={p.id} value={p.product}> 
                                        {p.name} 
                                    </option>
                                ))}
                            </select>
                        </div>
                        <InputCrud 
                            name="Quantity" 
                            value={quantity} 
                            change={(q) => setQuantity(q.target.value)}
                            styles={"w-20 h-14"}
                        />
                        <textarea 
                            className="textarea textarea-bordered bg-neutral-200 h-12" 
                            value={note} 
                            onChange={(n) => setNote(n.target.value)} 
                            placeholder="Note" 
                            style={{ height: '3rem' }} 
                        />
                    </div>
                    <div className="flex justify-end items-center">
                        <div className="flex gap-10 self-end">
                            {editing ? (
                                <>
                                    <button onClick={handleEdit} className="bg-[#33a653] p-1.5 rounded-[6px] w-32">Confirm</button> 
                                    <button onClick={handleCancel} className="bg-[#e92c50] p-1.5 rounded-[6px] w-32">Cancel</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={handleRegister} className="bg-[#1087ff] p-1.5 rounded-[6px] w-32">Register</button>
                                    <button onClick={handleClean} className="bg-[#e92c50] p-1.5 rounded-[6px] w-32">Clean</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
