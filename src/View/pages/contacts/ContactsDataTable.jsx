import { MdDelete, MdEdit } from "react-icons/md";
import DataTable from "react-data-table-component";
import CsvExport from "../../components/CsvExport";

export default function ContactsDataTable({ contacts = [], deleteFunction, editFunction }) {
    const columns = [
        {
            name: "Name",
            selector: row => row.name,
        },
        {
            name: "Email",
            selector: row => row.email,
        },
        {
            name: "Phone",
            selector: row => row.phone,
        },
        {
            name: "Active",
            selector: row => row.isActive ? "Yes" : "No",
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="flex gap-3">
                    <button onClick={() => editFunction(row)}><MdEdit /></button>
                    <button onClick={() => deleteFunction(row.id)}><MdDelete /></button>
                </div>
            ),
        },
    ];

    const data = contacts.map(p => ({
        id: p.id,
        name: p.name,
        email: p.email,
        phone: p.phone,
        isActive: p.isActive, 
    }));

    return (
        <div className="h-full bg-white rounded-lg p-3 shadow-md overflow-auto">
            <div className="flex justify-between mb-3">
                <h1 className="text-lg font-bold">Contacts</h1>
                <CsvExport data={data} filename="contacts.csv" />
            </div>
            <DataTable
                data={data}
                dense
                striped
                columns={columns}
                className="2xl:h-96 xl:h-64 sm:h-[200px]"
                responsive
                pagination
                fixedHeader
            />
        </div>
    );
}
