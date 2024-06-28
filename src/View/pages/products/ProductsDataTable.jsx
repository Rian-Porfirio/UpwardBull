import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import DataTable from "react-data-table-component";

export default function ProductsDataTable({products = [], deleteFunction, editFunction}){

    const columns = [
        {
            name: "Name",
            selector: row => row.name
        },
        {
            name: "Provider",
            selector: row => row.provider
        },
        {
            name: "Currency",
            selector: row => row.currency
        },
        {
            name: "Cotation",
            selector: row => row.cotation
        },
        {
            name: "Cotation Date",
            selector: row => row.date
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

    const data = products.map(p => ({
        id: p.id,
        name: p.name,
        cotation: p.price,
        currency: p.currency,
        date: p.date,
        provider: p.provider
    }));

    return (
        <div className="h-full bg-white rounded-lg p-3">
            <DataTable 
                data={data}
                dense 
                title="View"
                striped
                columns={columns}
                className="2xl:h-96 xl:h-64 sm:h-[150px]"
                responsive
                pagination
                fixedHeader
                />
        </div>
    );
}