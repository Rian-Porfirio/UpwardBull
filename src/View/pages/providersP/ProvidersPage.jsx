import { listProviders, addProvider, deleteProvider, editProvider } from "../../../model/services/data/ProvidersData";
import ProvidersDataContainer from "./ProvidersDataTable";
import ProvidersLayout from "./ProvidersLayout";
import { useState } from "react";

export default function ProvidersPage(){

    const [provider, setProvider] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editItem, setEditItem] = useState(null)

    async function handleAdd(provider){
        await addProvider(provider)
    }

    async function handleList(){
        let providers = await listProviders();
        setProvider(providers)
    }

    async function handleDelete(id){
        await deleteProvider(id);
    }

    async function handleEdit(newProvider){
        const id = editItem.id;
        await editProvider(id, newProvider)
    }
    
    const handleEditProvider = (provider) =>{
        setEditItem(provider)
        setIsEditing(true);
    }

    return (
        <div className="bg-neutral-500 w-full p-3 flex flex-col gap-3">
            <ProvidersLayout addItem={handleAdd} listItem={handleList} editItem={handleEdit} provider={editItem} editing={isEditing} setEditing={setIsEditing}/>
            <ProvidersDataContainer providers={provider} deleteFunction={handleDelete} editFunction={handleEditProvider}/>
        </div>
    )
}