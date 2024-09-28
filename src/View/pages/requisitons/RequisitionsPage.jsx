import { useState, useEffect } from "react";
import RequisitionsLayout from "./RequisitionsLayout";
import RequisitionsDataTable from "./RequisitionsDataTable";
import { listRequisitionsByUser, addRequisition, deleteRequisition, editRequisition } from "../../../model/services/data/RequisitionData";
import { useAuth } from "../../../hooks/useAuth";

export default function RequisitionsPage() {
    const { user } = useAuth();
    const [requisition, setRequisition] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editItem, setEditItem] = useState(null);

    useEffect(() => {
        if (user) handleList();
    }, [user]);

    async function handleAdd(requisition) {
        if (!user) {
            alert("Usuário não autenticado.");
            return;
        }
        await addRequisition(requisition, user);
        handleList();
    }

    async function handleList() {
        const requisitions = await listRequisitionsByUser(user);
        setRequisition(requisitions);
    }

    async function handleDelete(id) {
        await deleteRequisition(id);
        handleList();
    }

    async function handleEdit(newRequisition) {
        const id = editItem.id;
        await editRequisition(id, newRequisition);
        handleList();
    }

    const handleEditRequisition = (requisition) => {
        setEditItem(requisition);
        setIsEditing(true);
    };

    return (
        <div className="bg-neutral-500 w-full p-3 flex flex-col gap-3">
            {!user?.isAdmin && (
                <RequisitionsLayout
                addItem={handleAdd}
                listItem={handleList}
                editItem={handleEdit}
                requisition={editItem}
                editing={isEditing}
                setEditing={setIsEditing}
                currentUser={user}
            />
            )}
            <RequisitionsDataTable
                requisitions={requisition}
                deleteFunction={handleDelete}
                editFunction={handleEditRequisition}
            />
        </div>
    );
}
