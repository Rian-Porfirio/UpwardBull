import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import DataTable from "react-data-table-component";

export default function ProvidersDataContainer({providers = [], deleteFunction, editFunction, contacts = []}){

    const columns = [
        {
            name: "Name",
            selector: row => row.name
        },
        {
            name: "City",
            selector: row => row.city
        },
        {
            name: "State",
            selector: row => row.state
        },
        {
            name: "Country",
            selector: row => row.country
        },
        {
            name: "Contacts",
            selector: row => row.contacts
        },
        {
            name: "Actions",
            cell: (row) =>(
                <div className="flex gap-3">
                    <button onClick={() => editFunction(row)}><MdEdit /></button>
                    <button onClick={() => deleteFunction(row.id)}><MdDelete /></button>
                </div>
            )
        }
    ]

    const data = providers.map(p => ({
        id: p.id,
        name: p.name,
        city: p.city,
        state: p.state,
        country: p.country,
        contacts: contacts.length
    }));

    return (
        <div className="h-full bg-white rounded-lg p-3">
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