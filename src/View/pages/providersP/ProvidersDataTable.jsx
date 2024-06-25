import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import DataTable from "react-data-table-component";

export default function ProvidersDataContainer({providers = [], deleteFunction, editFunction}){

    const columns = [
        {
            name: "Name",
            selector: row => row.name
        },
        {
            name: "City",
            selector: row => row.email
        },
        {
            name: "State",
            selector: row => row.phone
        },
        {
            name: "Country",
            selector: row => row.provider
        },
        {
            name: "Contacts",
            selector: row => row.provider
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
        country: p.country
    }));

    return (
        <div className="h-full bg-white rounded-lg p-3">
            <DataTable 
                data={data}
                dense 
                title="View"
                striped
                columns={columns}
                className="h-52"
                responsive
                pagination
                fixedHeader
                />
        </div>
    );
}