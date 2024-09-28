import { useState, useEffect, useCallback } from "react";
import InputCrud from "../../components/InputCrud";
import { toast } from "react-toastify";

export default function ContactsLayout({ addItem, listItem, editItem, contact, editing, setEditing, providers = [], setCurrentProvider }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isActive, setIsActive] = useState(true); 
    const [providersMap, setProvidersMap] = useState({});
    const [selectedProvider, setSelectedProvider] = useState("default");

    const handleClean = () => {
        setName("");
        setEmail("");
        setPhone("");
        setIsActive(true);
    };

    const handleRegister = useCallback(() => {
        if (name && email && phone && selectedProvider !== "default") {
            const providerId = providersMap[selectedProvider];
            if (!providerId) {
                toast.error("Provider not selected or not found");
                return;
            }
            addItem(providerId, {
                name,
                email,
                phone,
                isActive
            });
            toast.success("Contact registered successfully!");
            listItem(providerId);
            handleClean();
            return;
        }
        toast.error("Action Blocked. Please provide the information below.");
    }, [name, email, phone, selectedProvider, providersMap, isActive, addItem, listItem]);

    const handleEdit = useCallback(() => {
        if (name && email && phone) {
            editItem({
                id: contact.id, 
                name,
                email,
                phone,
                isActive
            });
            toast.success("Contact edited successfully!");
            handleClean();
            setEditing(false);
            return;
        }
        toast.error("Action Blocked. Please provide the information below.");
    }, [name, email, phone, contact, isActive, editItem, setEditing, handleClean]);

    const handleCancel = () => {
        handleClean();
        setEditing(false);
    };

    const handleInputs = useCallback(() => {
        setName(contact.name || "");
        setEmail(contact.email || "");
        setPhone(contact.phone || "");
        setIsActive(contact.isActive); 
    }, [contact]);

    useEffect(() => {
        if (editing) {
            handleInputs();
        }
    }, [editing, handleInputs]);

    useEffect(() => {
        const map = {};
        providers.forEach((provider) => {
            map[provider.name] = provider.id;
        });
        setProvidersMap(map);
    }, [providers]);

    useEffect(() => {
        handleListProvidersContacts(selectedProvider);
    }, [selectedProvider]);

    const handleListProvidersContacts = (providerName) => {
        const providerId = providersMap[providerName];
        setCurrentProvider(providerId);
        if (providerId) {
            listItem(providerId);
        }
    };

    return (
        <div className="h-fit bg-white rounded-lg p-4 text-black">
            <div className="h-full">
                <div className="text-xs flex flex-col gap-2">
                    <div className="flex flex-col justify-end">
                        <div className="grid grid-cols-3 gap-3">
                            <InputCrud name="Name" value={name} change={(n) => setName(n.target.value)} />
                            <InputCrud name="Email" value={email} change={(e) => setEmail(e.target.value)} />
                            <InputCrud name="Phone" value={phone} change={(p) => setPhone(p.target.value)} />
                        </div>
                        <div className="flex items-center mt-2">
                        <div className="w-full">
                            <h2 className="mb-1">Provider</h2>
                            <select className="select bg-neutral-200 h-8 w-full max-w-xs select-xs" onChange={(event) => setSelectedProvider(event.target.value)} value={selectedProvider}>
                                <option value="default" hidden>Select the provider</option>
                                {providers.map((p) => (
                                    <option key={p.id} value={p.name}>{p.name}</option>
                                ))}
                            </select>
                                <label className="ml-5">Active:</label>
                                <input
                                    type="checkbox"
                                    checked={isActive}
                                    onChange={() => setIsActive(!isActive)}
                                    className="toggle toggle-primary"
                                />
                        </div>
                        </div>
                        <div className="flex gap-10 self-end mt-4">
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
