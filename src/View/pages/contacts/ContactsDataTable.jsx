import { MdDelete, MdEdit } from "react-icons/md";
import DataTable from "react-data-table-component";

export default function ContactsDataTable({ contacts = [], deleteFunction, editFunction }) {
    const columns = [
        {
            name: "Name",
            selector: row => row.name
        },
        {
            name: "Email",
            selector: row => row.email
        },
        {
            name: "Phone",
            selector: row => row.phone
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="flex gap-3">
                    <button onClick={() => editFunction(row)}><MdEdit /></button>
                    <button onClick={() => deleteFunction(row.id)}><MdDelete /></button>
                </div>
            )
        }
    ];

    const data = contacts.map(p => ({
        id: p.id,
        name: p.name,
        email: p.email,
        phone: p.phone,
    }));

    return (
        <div className="h-full bg-white rounded-lg p-3">
            <DataTable
                data={data}
                dense
                title="View"
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
