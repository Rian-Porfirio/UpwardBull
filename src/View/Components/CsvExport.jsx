import { CSVLink } from "react-csv";

export default function CsvExport({ data, filename }) {
    const formattedData = [
        ...data.map(item => [item.id, item.product, item.quantity, item.note, item.createdBy, item.status, item.createdAt])
    ];

    return (
        <CSVLink 
            data={formattedData} 
            filename={filename} 
            separator=","  
            enclosingCharacter={`"`} 
            asyncOnClick={true}
            headers={["ID", "Produto", "Quantidade", "Observações", "Solicitado por", "Status"]}
            >
            <button className="flex items-center bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0a1 1 0 011 1v8.586l2.293-2.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 9.586V1a1 1 0 011-1zm-1 20a1 1 0 01-1-1v-5H5a1 1 0 010-2h4v-4a1 1 0 012 0v4h4a1 1 0 110 2h-4v5a1 1 0 01-1 1z"/>
                </svg>
                Export CSV
            </button>
        </CSVLink>
    );
}
