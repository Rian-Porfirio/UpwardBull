import {useState, useEffect} from "react"
import InputCrud from "../../components/InputCrud"

export default function CotationsLayout({selectForm = false, addItem, listItem, editItem, cotation, editing, setEditing}){
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
        setName(cotation.name)
        setEmail(cotation.email)
        setPhone(cotation.phone)
    }

    useEffect(()=>{
        if(editing){
            handleInputs()
        }
    }, [cotation])

    useEffect(() =>{
        listItem()
    }, [handleRegister, handleEdit])

    return (
        <div className="h-fit bg-white rounded-lg p-4 text-black">
                <div className="h-full">
                    <div className="text-xs flex flex-col gap-2">
                        <InputCrud name="Name" value={name} change={(n) => setName(n.target.value)} />
                        <InputCrud name="Email" value={email} change={(e) => setEmail(e.target.value)}/>
                        <InputCrud name="Phone" value={phone} change={(p) => setPhone(p.target.value)}/>
                        <div className="flex justify-end items-center">
                        {selectForm && (
                                <div className="w-full">
                                    <h2 className="mb-1">Provider</h2>
                                    <select className="select bg-neutral-200 w-full max-w-xs select-xs" defaultValue="Select the provider">
                                    <option>Pick the best JS framework</option>
                                    <option>dsadawdak</option>
                                    <option>dwadasd</option>
                                    <option>dawdasd</option>
                                    </select>
                                </div>
                            )}

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