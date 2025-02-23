import { createContext, useEffect, useState } from "react";

export const registerContext = createContext()
export default function RegisterProvider({ children }) {
    let [emailPassword, setEmailPassword] = useState()

    return <registerContext.Provider value={{ emailPassword, setEmailPassword }}>{children}</registerContext.Provider>
}