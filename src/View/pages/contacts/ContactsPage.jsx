import { useState, useEffect } from "react";
import ContactsDataContainer from "./ContactsDataTable";
import { listProviders, listProviderContacts, addProviderContact, deleteProviderContact, editProviderContact  } from "../../../model/services/data/ProvidersData";
import ContactsLayout from "./ContactsLayout";

export default function ContactsPage(){

    const [contact, setContact] = useState([])
    const [provider, setProvider] = useState([])
    const [editItem, setEditItem] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [currentProvider, setCurrentProvider] = useState()

    async function handleListProviders(){
        let providers = await listProviders();
        setProvider(providers)
    }

    useEffect(() =>{
        handleListProviders()
    }, [])

    async function handleAdd(providerId, contact){
        await addProviderContact(providerId, contact)
    }
    
    async function handleList(providerId){
        let contacts = await listProviderContacts(providerId);
        setContact(contacts)
    }
    
    async function handleDelete(contactId){
        await deleteProviderContact(currentProvider, contactId);
    }
    
    async function handleEdit(newContact){
        const id = editItem.id;
        await editProviderContact(currentProvider, id, newContact)
    }
    
    const handleEditContact = (contact) =>{
        setEditItem(contact)
        setIsEditing(true);
    }

    return (
        <div className="bg-neutral-500 w-full p-3 flex flex-col gap-3">
            <ContactsLayout addItem={handleAdd} listItem={handleList} editItem={handleEdit} contact={editItem} providers={provider} editing={isEditing} setEditing={setIsEditing} setCurrentProvider={setCurrentProvider}/>
            <ContactsDataContainer contacts={contact} deleteFunction={handleDelete} editFunction={handleEditContact}/>
        </div>
    )
}