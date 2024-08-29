import {useState, useEffect, useCallback} from "react"
import InputCrud from "../../components/InputCrud";

export default function ProductsLayout({addItem, listItem, listProviders, editItem, editing, product, setEditing, providers = []}){
    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    const [price, setPrice] = useState("")
    const [currency, setCurrency] = useState("default")
    const [selectedProvider, setSelectedProvider] = useState("default")

    const handleClean = () => {
        setName("")
        setPrice("")
        setDate("")
        setSelectedProvider("default")
    }

    const handleRegister = useCallback(async () => {
        if(isNaN(price)){
            alert("Price is not a number")
            return;
        }

        if(name && date && selectedProvider && currency){
            addItem({
                name: name,
                date: date,
                currency: currency,
                price: price,
                provider: selectedProvider,
            })
            listItem();
            return;
        }
        alert("Action Blocked. Please provide the information below.")
    }, [name, date, currency, price, providers, editItem, handleClean, editing]);

    const handleEdit = useCallback(async () => {
        if (isNaN(price)) {
            alert("Price is not a number");
            return;
        }
    
        if (name && date && selectedProvider && currency) {
            await editItem({
                id: product.id,
                name: name,
                date: date,
                currency: currency,
                price: price,
                provider: selectedProvider,
            });
            listItem();
            handleClean();
            setEditing(false);
            return;
        }
        alert("Action Blocked. Please provide the information below.");
    }, [name, date, currency, price, selectedProvider, editItem, handleClean, listItem, setEditing, product]);
    
    const handleCancel = () =>{
        handleClean()
        setEditing(false)
    }

    const handleInputs = () =>{
        setName(product.name)
        setPrice(product.cotation)
        setCurrency(product.currency)
        setDate(product.date)
        setSelectedProvider(product.provider)
    }

    useEffect(()=>{
        if(editing){
            handleInputs()
        }
    }, [product])

      useEffect(() => {
            listItem()
            listProviders()
      }, [])

    return (
        <div className="h-fit bg-white rounded-lg p-4 text-black">
                <div className="h-full">
                    <div className="text-xs flex flex-col gap-2">
                        <div className="flex flex-col justify-end">
                            <div className="grid grid-cols-3 gap-2">
                                    <InputCrud name="Product" value={name} change={(n) => setName(n.target.value)} />
                                    <div className="flex gap-3 w-21">
                                        <InputCrud name="Price" value={price} change={(p) => setPrice(p.target.value)} />
                                        <InputCrud name="Date" value={date} type="date" change={(d) => setDate(d.target.value)} />
                                        </div>
                                        <div className="w-24">
                                        <h2 className="mb-1">Currency</h2>
                                        <select className="select bg-neutral-200 w-full max-w-xs select-xs" onChange={(event) => setCurrency(event.target.value)} value={currency}>
                                        <option value="default" hidden></option>
                                        <option>R$</option>
                                        <option>$</option>
                                        <option>€</option>
                                        <option>£</option>
                                        <option>¥</option>
                                        <option>AU$</option>
                                        <option>C$</option>
                                        <option>元</option>
                                        <option>AR$</option>
                                        <option>₺</option>
                                        </select>
                                    </div>
                                        <div>
                                            <h2 className="mb-1">Provider</h2>
                                            <select className="select bg-neutral-200 w-full max-w-xs select-xs" onChange={(event) => setSelectedProvider(event.target.value)} value={selectedProvider}>
                                            <option value="default" hidden>Select the provider</option>
                                            {providers.map( p => {
                                                return <option key={p.id}>{p.name}</option>
                                            })}
                                            </select>
                                        </div>
                                    </div>
                            <div className="flex gap-10 self-end mt-3">
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