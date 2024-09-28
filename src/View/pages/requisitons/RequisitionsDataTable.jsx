import { MdDelete, MdEdit, MdOutlineAttachMoney } from "react-icons/md";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { countQuotations, getQuotationsByRequisition, addQuotation, updateQuotation, deleteQuotation, updateRequisitionStatus, getQuotationStatus } from "../../../model/services/data/RequisitionData"; 
import { listProviders } from "../../../model/services/data/ProvidersData";
import Modal from "../../components/Modal";
import CsvExport from "../../components/CsvExport";

export default function RequisitionsDataTable({ requisitions = [], deleteFunction, editFunction }) {
    const [quotationsCount, setQuotationsCount] = useState({});
    const [quotationsStatus, setQuotationsStatus] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [currentQuotations, setCurrentQuotations] = useState([]);
    const [isAddingQuotation, setIsAddingQuotation] = useState(false);
    const [newQuotation, setNewQuotation] = useState({ id: null, value: '', supplier: '' });
    const [selectedRequisitionId, setSelectedRequisitionId] = useState(null);
    const [providers, setProviders] = useState([]);

    const loadProviders = async () => {
        const providerList = await listProviders();
        setProviders(providerList);
    };

    const loadQuotationsCount = async () => {
        const counts = {};
        for (const requisition of requisitions) {
            const count = await countQuotations(requisition.id);
            counts[requisition.id] = count;
        }
        setQuotationsCount(counts);
    };

    const loadQuotationsStatus = async () => {
        const statuses = {};
        for (const requisition of requisitions) {
            const status = await getQuotationStatus(requisition.id);
            statuses[requisition.id] = status;
        }
        setQuotationsStatus(statuses);
    };

    const loadQuotations = async (requisitionId) => {
        const quotations = await getQuotationsByRequisition(requisitionId);
        const requisition = requisitions.find(r => r.id === requisitionId);
        const quotationsWithProduct = quotations.map(q => ({
            ...q,
            product: requisition.product
        }));
        setCurrentQuotations(quotationsWithProduct);
    };

    const handleAddQuotation = async () => {
        if (currentQuotations.length < 3) {
            await addQuotation(selectedRequisitionId, newQuotation);
            setNewQuotation({ id: null, value: '', supplier: '' });
            await loadQuotations(selectedRequisitionId);
        } else {
            alert("You cannot add more than 3 quotations.");
        }
    };

    const handleEditQuotation = async () => {
        if (newQuotation.id) {
            await updateQuotation(selectedRequisitionId, newQuotation.id, newQuotation);
            setNewQuotation({ id: null, value: '', supplier: '' });
            await loadQuotations(selectedRequisitionId);
        }
    };

    const handleDeleteQuotation = async (id) => {
        await deleteQuotation(selectedRequisitionId, id);
        await loadQuotations(selectedRequisitionId);
    };

    useEffect(() => {
        if (requisitions.length > 0) {
            loadQuotationsCount();
            loadQuotationsStatus();
        }
    }, [requisitions]);

    useEffect(() => {
        const updateStatusBasedOnQuotations = async () => {
            if (selectedRequisitionId) {
                const totalQuotations = await countQuotations(selectedRequisitionId);
                if (totalQuotations === 3) {
                    await updateRequisitionStatus(selectedRequisitionId, "Quoted");
                } else if (totalQuotations < 3) {
                    await updateRequisitionStatus(selectedRequisitionId, "In Quotation");
                }
                await loadQuotationsStatus();
            }
        };

        updateStatusBasedOnQuotations();
    }, [currentQuotations, selectedRequisitionId]);

    const columns = [
        {
            name: "Product",
            selector: row => row.product,
            sortable: true,
        },
        {
            name: "Quantity",
            selector: row => row.quantity,
            sortable: true,
            center: true,
        },
        {
            name: "Notes",
            selector: row => row.note ? row.note : "No notes",
            sortable: true,
        },
        {
            name: "Requested By",
            selector: row => row.createdBy,
            sortable: true,
            center: true,
        },
        {
            name: "Creation Date",
            selector: row => new Date(row.createdAt).toLocaleDateString(),
            sortable: true,
            center: true,
        },
        {
            name: "Status",
            selector: row => {
                const status = quotationsStatus[row.id] || { status: "Undefined", color: "bg-gray-200" };
                return (
                    <span className={`flex items-center px-2 py-1 rounded-full font-semibold shadow-sm ${status.color}`}>
                        {status.status}
                    </span>
                );
            },
            sortable: true,
            center: true,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="flex gap-3">
                    <button onClick={() => editFunction(row)}><MdEdit /></button>
                    <button onClick={() => deleteFunction(row.id)}><MdDelete /></button>
                    <button onClick={() => handleShowModal(row)}><MdOutlineAttachMoney /></button>
                </div>
            ),
            center: true,
        }
    ];

    const data = requisitions.map(r => ({
        id: r.id,
        product: r.product,
        quantity: r.quantity,
        note: r.note,
        createdBy: r.createdBy,
        createdAt: r.createdAt,
    }));

    const quotationsColumns = [
        {
            name: "Product",
            selector: row => row.product,
            sortable: true,
            minWidth: "100px",
            maxWidth: "150px",
        },
        {
            name: "Value",
            selector: row => row.value,
            sortable: true,
            center: true,
            minWidth: "80px",
            maxWidth: "120px",
        },
        {
            name: "Supplier",
            selector: row => row.supplier,
            sortable: true,
            minWidth: "100px",
            maxWidth: "150px",
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="flex gap-3">
                    <button onClick={() => {
                        setNewQuotation({ id: row.id, value: row.value, supplier: row.supplier });
                        setIsAddingQuotation(true);
                    }}><MdEdit /></button>
                    <button onClick={() => handleDeleteQuotation(row.id)}><MdDelete /></button>
                </div>
            ),
            center: true,
            minWidth: "50px",
            maxWidth: "100px",
        }
    ];

    const handleShowModal = async (row) => {
        setSelectedRequisitionId(row.id);
        await loadQuotations(row.id);
        await loadProviders();
        setModalOpen(true);
        setIsAddingQuotation(false);
    };

    return (
        <div className="h-full bg-white rounded-lg p-3 shadow-md overflow-auto">
            <div className="flex justify-between mb-3">
                <h1 className="text-lg font-bold">Requisitions</h1>
                <CsvExport data={data} filename="requisitions.csv" />
            </div>
            <DataTable
                data={data}
                columns={columns}
                className="2xl:h-96 xl:h-64 sm:h-[200px]"
                responsive
                pagination
                fixedHeader
                dense
                striped
                highlightOnHover
                style={{
                    table: {
                        borderSpacing: '0 0', 
                    },
                }}
            />
            <Modal open={modalOpen} setOpen={setModalOpen}>
                {isAddingQuotation ? (
                    <div>
                        <input
                            type="text"
                            placeholder="Price"
                            value={newQuotation.value}
                            onChange={(e) => setNewQuotation({ ...newQuotation, value: e.target.value })}
                            className="input input-bordered mb-2 w-full"
                        />
                        <select
                            value={newQuotation.supplier}
                            onChange={(e) => setNewQuotation({ ...newQuotation, supplier: e.target.value })}
                            className="input input-bordered mb-2 w-full"
                        >
                            <option value="" disabled>Select a supplier</option>
                            {providers.map(provider => (
                                <option key={provider.id} value={provider.name}>{provider.name}</option>
                            ))}
                        </select>
                        <div className="flex gap-2 mt-2">
                            <button onClick={newQuotation.id ? handleEditQuotation : handleAddQuotation} className="bg-blue-500 text-white rounded-md px-4 py-2">
                                {newQuotation.id ? 'Update' : 'Save'}
                            </button>
                            <button onClick={() => { setIsAddingQuotation(false); setNewQuotation({ id: null, value: '', supplier: '' }); }} className="bg-gray-300 text-black rounded-md px-4 py-2">
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <DataTable
                            data={currentQuotations}
                            columns={quotationsColumns}
                            className="h-64"
                            responsive
                            pagination
                            fixedHeader
                            dense
                            striped
                            highlightOnHover
                        />
                        {currentQuotations.length < 3 && 
                            <button
                                onClick={() => setIsAddingQuotation(true)}
                                className="bg-blue-500 text-white rounded-md px-4 py-2 mt-2"
                            >
                                Add Quotation
                            </button>
                        }
                    </div>
                )}
            </Modal>
        </div>
    );
}
