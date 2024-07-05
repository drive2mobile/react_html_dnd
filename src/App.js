import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import DndList from "./pages/DndList";

function App() {
    return (
        <React.StrictMode>
            <BrowserRouter basename="/reactHtmlDnd">
            <Routes>
                <Route exact path="/" element={<DndList />}></Route>
            </Routes>
            </BrowserRouter>
        </React.StrictMode>
       
    );
}

export default App;
