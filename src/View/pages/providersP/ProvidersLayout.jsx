import {useState, useEffect} from "react"
import InputCrud from "../../components/InputCrud"

export default function ProvidersLayout({selectForm = false, addItem, listItem, editItem, provider, editing, setEditing}){

    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");

    const handleRegister = () =>{
        if(name && city && state && country){
            addItem({
                name: name,
                city: city,
                state: state,
                country: country,
            })
            return;
        }
        
        alert("Action Blocked. Please provide the information below.")
    }

    const handleClean = () => {
        setName("")
        setCity("")
        setState("")
        setCountry("")
    }

    const handleCancel = () =>{
        handleClean()
        setEditing(false)
    }
    
    const handleEdit = () =>{
        if(!city || !state || !country){
            alert("Action Blocked. Please provide the information below.")
            return;
        }
        editItem({
            name: name,
            city: city,
            state: state,
            country: country,
        })
        handleClean();
        setEditing(false)
    }

    const handleInputs = () =>{
        setName(provider.name)
        setCity(provider.city)
        setState(provider.state)
        setCountry(provider.country)
    }

    useEffect(()=>{
        if(editing){
            handleInputs()
        }
    }, [provider])

    useEffect(() =>{
        listItem()
    }, [handleRegister, handleEdit])

    return (
        <div className="h-fit bg-white rounded-lg p-4 text-black">
                <div className="h-full">
                    <div className="text-xs flex flex-col gap-2">
                        <div className="grid grid-cols-2 gap-3">
                            <InputCrud name="Name" value={name} change={(n) => setName(n.target.value)} />
                            <InputCrud name="City" value={city} change={(c) => setCity(c.target.value)} />
                            <InputCrud name="State" value={state} change={(s) => setState(s.target.value)}/>
                            <InputCrud name="Country" value={country} change={(c) => setCountry(c.target.value)}/>
                        </div>
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