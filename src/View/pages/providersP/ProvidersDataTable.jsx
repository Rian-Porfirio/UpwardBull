import { MdDelete, MdEdit } from "react-icons/md";
import DataTable from "react-data-table-component";
import FlagIcon from "../../components/FlagIcon";
import CsvExport from "../../components/CsvExport";

export default function ProvidersDataContainer({ providers = [], deleteFunction, editFunction }) {
    const columns = [
        {
            name: "Name",
            selector: row => row.name,
        },
        {
            name: "City",
            selector: row => row.city,
        },
        {
            name: "State",
            selector: row => row.state,
        },
        {
            name: "Country",
            cell: (row) => (
                <FlagIcon url={row.country} />
            ),
        },
        {
            name: "Document",
            selector: row => row.document,
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

    const data = providers.map(p => ({
        id: p.id,
        name: p.name,
        city: p.city,
        document: p.document,
        state: p.state,
        country: p.country,
        countryName: p.countryName,
    }));

    return (
        <div className="h-full bg-white rounded-lg p-3 shadow-md overflow-auto">
            <div className="flex justify-between mb-3">
                <h1 className="text-lg font-bold">Providers</h1>
                <CsvExport data={data} filename="providers.csv" />
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
