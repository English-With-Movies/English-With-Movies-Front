import { createContext, useState } from "react";

export const quizDataContext = createContext()
export default function QuizData({ children }) {
    let [quizDataArray, setQuizDataArray] = useState([]);

    return <quizDataContext.Provider value={{ quizDataArray, setQuizDataArray }}>{children}</quizDataContext.Provider>
}