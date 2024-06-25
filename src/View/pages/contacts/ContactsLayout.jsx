import {useState, useEffect} from "react"
import InputCrud from "../../components/InputCrud"

export default function ContactsLayout({addItem, listItem, editItem, contact, editing, setEditing, providers = []}){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleRegister = () =>{
        if(name && email && phone){
            addItem({
                name: name,
                email: email,
                phone: phone
            })
            return;
        }
        
        alert("Action Blocked. Please provide the information below.")
    }

    const handleClean = () => {
        setName("")
        setEmail("")
        setPhone("")
    }

    const handleCancel = () =>{
        handleClean()
        setEditing(false)
    }
    
    const handleEdit = () =>{
        if(!name || !email || !phone){
            alert("Action Blocked. Please provide the information below.")
            return;
        }
        editItem({
            name: name,
            email: email,
            phone: phone
        })
        handleClean();
        setEditing(false)
    }

    const handleInputs = () =>{
        setName(contact.name)
        setEmail(contact.email)
        setPhone(contact.phone)
    }

    useEffect(()=>{
        if(editing){
            handleInputs()
        }
    }, [contact])

    useEffect(() =>{
        listItem()
    }, [handleRegister, handleEdit])

    return (
        <div className="h-fit bg-white rounded-lg p-4 text-black">
                <div className="h-full">
                    <div className="text-xs flex flex-col gap-2">
                        <div className="flex justify-end items-center">
                                <div className="w-full">
                                    <h2 className="mb-1">Provider</h2>
                                    <select className="select bg-neutral-200 w-full max-w-xs select-xs" defaultValue="Select the provider">
                                    {providers.map( p => {
                                        return <option>{p.name}</option>
                                    })}
                                    </select>
                                </div>
                            <div className="flex gap-10 self-end">
                                {
                                editing 
                                ? 
                                (
                                <>
                                    <button onClick={handleEdit} className="bg-[#33a653] p-1.5 rounded-[6px] w-32">Confirm</button> 
                                    <button onClick={handleCancel} className="bg-[#e92c50] p-1.5 rounded-[6px] w-32">Cancel</button>
                                </>
                                )
                                : 
                                (
                                <>
                                    <button onClick={handleRegister} className="bg-[#1087ff] p-1.5 rounded-[6px] w-32">Register</button>
                                    <button onClick={handleClean} className="bg-[#e92c50] p-1.5 rounded-[6px] w-32">Clean</button>
                                </>
                                )
                                }
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
    )
}