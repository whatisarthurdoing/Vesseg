import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem("Token"));
    useEffect(() => {
        const fetchUser = async() => {
            const requestOptions = {
                method: "GET", 
                headers: {
                    "Content-Type": "application/json", 
                    Authorization: "Bearer " + token, 
                },
            };
            //console.log(requestOptions)
            const response = await fetch("/me", requestOptions);
            //console.log(requestOptions)
            if (!response.ok){
                setToken(null);
            }
            localStorage.setItem("Token", token);
        };
        fetchUser();
    }, [token]);

    return(
        <UserContext.Provider value={[token, setToken]}>
            {props.children}
        </UserContext.Provider>
    )
}