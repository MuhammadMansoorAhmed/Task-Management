import { createContext, useContext, useEffect, useState } from "react";

const CookieContext = createContext();

const CookieProvider = ({ children }) => {

    const [userId, setUserId] = useState("");

    useEffect(()=>{
        sessionStorage.setItem("userID",userId)
    },[userId])

    return (
        <CookieContext.Provider
            value={
                {
                    userId,
                    setUserId,
                }
            }
        >
            {children}
        </CookieContext.Provider>
    )
}


export const useCookieContext = () => {
    return useContext(CookieContext)
}

export default CookieProvider;
