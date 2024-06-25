import { listContacts, addContact, deleteContact, editContact } from "../../../model/services/data/ContactsData";
import { listProviders } from "../../../model/services/data/ProvidersData";
import ContactsDataContainer from "./ContactsDataTable";
import ContactsLayout from "./ContactsLayout";
import { useState, useEffect } from "react";

export default function ContactsPage(){

    const [Contact, setContact] = useState([])
    const [provider, setProvider] = useState([])
    const [editItem, setEditItem] = useState(null)
    const [isEditing, setIsEditing] = useState(false)

    async function handleAdd(Contact){
        await addContact(Contact)
    }
    
    async function handleListProviders(){
        let providers = await listProviders();
        setProvider(providers)
    }
    
    async function handleList(){
        let Contacts = await listContacts();
        setContact(Contacts)
    }
    
    async function handleDelete(id){
        await deleteContact(id);
    }
    
    async function handleEdit(newContact){
        const id = editItem.id;
        await editContact(id, newContact)
    }
    
    const handleEditContact = (Contact) =>{
        setEditItem(Contact)
        setIsEditing(true);
    }
    
    useEffect(() =>{
        handleListProviders()
    }, [])

    return (
        <div className="bg-neutral-500 w-full p-3 flex flex-col gap-3">
            <ContactsLayout addItem={handleAdd} listItem={handleList} editItem={handleEdit} contact={editItem} providers={provider} editing={isEditing} setEditing={setIsEditing}/>
            <ContactsDataContainer contacts={Contact} deleteFunction={handleDelete} editContact={handleEditContact}/>
        </div>
    )
}