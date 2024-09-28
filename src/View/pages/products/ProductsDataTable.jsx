import { MdDelete, MdEdit } from "react-icons/md";
import DataTable from "react-data-table-component";
import CsvExport from "../../components/CsvExport";

export default function ProductsDataTable({ products = [], deleteFunction, editFunction }) {
    const columns = [
        {
            name: "Name",
            selector: row => row.name,
        },
        {
            name: "Description",
            selector: row => row.description,
        },
        {
            name: "Status",
            selector: row => row.isActive,
            cell: row => (
                <div className="flex justify-center items-center">
                    <span
                        className={`${
                            row.isActive ? 'bg-green-500' : 'bg-red-500'
                        } text-white text-sm font-semibold rounded-full`}
                        style={{ minWidth: '80px', textAlign: 'center' }}
                    >
                        {row.isActive ? "Active" : "Inactive"}
                    </span>
                </div>
            ),
            center: true,
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

    const data = products.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        provider: p.provider,
        isActive: p.isActive,
    }));

    return (
        <div className="h-full bg-white rounded-lg p-3 shadow-md overflow-auto">
            <div className="flex justify-between mb-3">
                <h1 className="text-lg font-bold">Products</h1>
                <CsvExport data={data} filename="products.csv" />
            </div>
            <DataTable 
                data={data}
                dense 
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
