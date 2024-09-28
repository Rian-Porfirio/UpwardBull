import { useState, useEffect, useCallback } from "react";
import InputCrud from "../../components/InputCrud";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-toastify";

export default function ProductsLayout({ addItem, listItem, listProviders, editItem, editing, product, setEditing, providers = [] }) {
    const { user } = useAuth();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedProvider, setSelectedProvider] = useState("default");
    const [isActive, setIsActive] = useState(true);

    const handleClean = () => {
        setName("");
        setDescription("");
        setSelectedProvider("default");
        setIsActive(true);
    };

    const handleRegister = useCallback(async () => {
        if (name) {
            try {
                await addItem({
                    name: name,
                    description: description,
                    provider: selectedProvider,
                    isActive: isActive,
                });
                await listItem();
                handleClean();
                toast.success("Product registered successfully!"); 
            } catch (error) {
                toast.error("Error registering product."); 
            }
            return;
        }
        toast.error("Action Blocked. Please provide the required information."); fornecido
    }, [name, description, selectedProvider, isActive, addItem, listItem]);

    const handleEdit = useCallback(async () => {
        if (name) {
            try {
                await editItem({
                    id: product.id,
                    name: name,
                    description: description,
                    provider: selectedProvider,
                    isActive: isActive,
                });
                listItem();
                handleClean();
                setEditing(false);
                toast.success("Product updated successfully!"); 
            } catch (error) {
                toast.error("Error updating product."); 
            }
            return;
        }
        toast.error("Action Blocked. Please provide the required information."); fornecido
    }, [name, description, selectedProvider, isActive, editItem, listItem, setEditing]);

    const handleCancel = () => {
        handleClean();
        setEditing(false);
    };

    const handleInputs = () => {
        setName(product.name);
        setDescription(product.description);
        setSelectedProvider(product.provider);
        setIsActive(product.isActive);
    };

    useEffect(() => {
        if (editing) {
            handleInputs();
        }
    }, [editing, product]);

    useEffect(() => {
        listItem();
        listProviders();
    }, [listItem, listProviders]);

    return (
        <div className="h-fit bg-white rounded-lg p-4 text-black">
            <div className="h-full">
                <div className="text-xs flex flex-col gap-2">
                    <div className="flex flex-col justify-end">
                        <div className="grid grid-cols-3 gap-2">
                            <InputCrud 
                                name="Product Name" 
                                value={name} 
                                change={(n) => setName(n.target.value)} 
                            />
                            <InputCrud 
                                name="Description" 
                                value={description} 
                                change={(d) => setDescription(d.target.value)} 
                            />
                            <div className="flex items-center">
                                <label className="block mb-1 mr-2">Active</label>
                                <input
                                    type="checkbox"
                                    checked={isActive}
                                    onChange={() => setIsActive(!isActive)}
                                    className="toggle toggle-primary"
                                />
                            </div>
                        </div>
                        <div className="flex gap-10 self-end mt-3">
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
