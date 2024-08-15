import { useEffect } from "react";
import { getFlag } from "../../../model/services/flags/CountryFlags";

export default function HomePage(){
    // useEffect(()=> {
    //     getFlag("brazil");
    // }, [])

    return(
        <p>
            Home page
        </p>
    );
}