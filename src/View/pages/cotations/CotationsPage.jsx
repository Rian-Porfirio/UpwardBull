import { listCotations, addCotation, deleteCotation, editCotation } from "../../../model/services/data/CotationsData";
import CotationsDataContainer from "./CotationsDataTable";
import CotationsLayout from "./CotationsLayout";
import { useState } from "react";

export default function CotationsPage(){

    const [Cotation, setCotation] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editItem, setEditItem] = useState(null)

    async function handleAdd(Cotation){
        await addCotation(Cotation)
    }

    async function handleList(){
        let cotations = await listCotations();
        setCotation(cotations)
    }

    async function handleDelete(id){
        await deleteCotation(id);
    }

    async function handleEdit(newCotation){
        const id = editItem.id;
        await editCotation(id, newCotation)
    }
    
    const handleEditCotation = (Cotation) =>{
        setEditItem(Cotation)
        setIsEditing(true);
    }

    return (
        <div className="bg-neutral-500 w-full p-3 flex flex-col gap-3">
            <CotationsLayout addItem={handleAdd} listItem={handleList} editItem={handleEdit} cotation={editItem} editing={isEditing} setEditing={setIsEditing}/>
            <CotationsDataContainer cotations={Cotation} deleteFunction={handleDelete} editFunction={handleEditCotation}/>
        </div>
    )
}