import { createContext, useEffect, useState } from "react";

export const quizDataContext = createContext()
export default function QuizData({ children }) {
    let [quizDataArray, setQuizDataArray] = useState([]);
    console.log(quizDataArray);

    return <quizDataContext.Provider value={{ quizDataArray, setQuizDataArray }}>{children}</quizDataContext.Provider>
}