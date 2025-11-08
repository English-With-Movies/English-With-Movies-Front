import { useEffect } from "react";
import { Field, ErrorMessage, useFormikContext } from 'formik';
import { useState } from "react";

export default function DateTimeField({ name }) {
    const { setFieldValue } = useFormikContext();
    const [selectedDate, setSelectedDate] = useState("");

    useEffect(() => {
        const now = new Date();
        const formattedDate = now.toLocaleString('sv-SE').slice(0, 16);
        setFieldValue(name, formattedDate); 
    }, [setFieldValue, name]);

    const now = new Date();
    const minDate = now.toLocaleString('sv-SE').slice(0, 16);

    const handleDateChange = (e) => {
        const newSelectedDate = e.target.value; 
        setSelectedDate(newSelectedDate); 
        const selectedDateObj = new Date(newSelectedDate); 
        const timeDifference = selectedDateObj.getTime() - now.getTime(); 
        const differenceInMinutes = Math.floor(timeDifference / (1000 * 60));
        setFieldValue(name, differenceInMinutes); 
        console.log(differenceInMinutes);
    };

    return (
        <div>
            <Field
                onChange={handleDateChange}
                type="datetime-local"
                name={name}
                value={selectedDate}
                min={minDate}
                id="duration"
                className="border-2 border-blue-400 rounded my-2 p-2 focus:outline-none"
            />
            <ErrorMessage name={name} component="div" className="text-red-500" />
        </div>
    );
};
