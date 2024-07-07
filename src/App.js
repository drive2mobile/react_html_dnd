import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import DndMultipleGroup from "./pages/DndMultipleGroup";
import DndSingleGroup from "./pages/DndSingleGroup";

function App() {
    return (
        <React.StrictMode>
            <BrowserRouter basename="/reactHtmlDnd">
            <Routes>
                <Route exact path="/multipleGroup" element={<DndMultipleGroup />}></Route>
                <Route exact path="/singleGroup" element={<DndSingleGroup />}></Route>
            </Routes>
            </BrowserRouter>
        </React.StrictMode>
       
    );
}

export default App;
