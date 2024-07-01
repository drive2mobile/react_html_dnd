import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import SeatingPlan from "./pages/SeatingPlan";

function App() {
    return (
        <React.StrictMode>
            <BrowserRouter basename="/seating_plan">
            <Routes>
                <Route exact path="/" element={<SeatingPlan />}></Route>
            </Routes>
            </BrowserRouter>
        </React.StrictMode>
       
    );
}

export default App;
