export default function HomePage(){
    return (
        <div className="bg-white w-full text-black text-xs flex flex-col gap-3 p-3">
            <strong>
                <h1>Welcome to my Purchase Management System (BETA)</h1>
            </strong>
            <p>This purchase management system is designed to streamline and enhance the procurement process for businesses. It offers a robust set of functionalities that ensure efficient management of providers, products, and quotations. Below is an outline of the key features:</p>
            <strong>
                <h2>Create a Provider</h2>
            </strong>
            <p>This feature allows users to create and manage a comprehensive database of providers. Users can add new providers with relevant details such as company name, address, and contact information. This ensures all provider information is centralized and easily accessible.</p>
            <strong>
                <h2>Register Providers' Contacts</h2>
            </strong>
            <p>In addition to creating providers, users can also register detailed contact information for each provider. This includes adding multiple contact persons, their roles, phone numbers, email addresses, and any other relevant details. Keeping a detailed contact list helps maintain smooth communication and relationship management with providers.</p>
            <strong>
                <h2>Register Products with Quotation and Provider Information</h2>
            </strong>
            <p>Users can register products in the system along with quotations and details of the providers supplying these products. This feature allows users to:</p>
               <span>---Input product specifications, descriptions, and categories.</span>
               <span>---Record quotation for each product from different providers.</span>
        </div>
    )
}