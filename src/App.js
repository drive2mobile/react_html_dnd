import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import DndSingleGroup from "./pages/DndSingleGroup";
import DndMultipleGroupObject from "./pages/DndMultipleGroupObject";
import DndMultipleGroupArray from "./pages/DndMultipleGroupArray";

function App() {
    return (
        <React.StrictMode>
            <BrowserRouter basename="/reactHtmlDnd">
            <Routes>
                <Route exact path="/multipleGroupObject" element={<DndMultipleGroupObject />}></Route>
                <Route exact path="/multipleGroupArray" element={<DndMultipleGroupArray />}></Route>
                <Route exact path="/singleGroup" element={<DndSingleGroup />}></Route>
            </Routes>
            </BrowserRouter>
        </React.StrictMode>
       
    );
}

export default App;
