import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

import DndMultipleGroupObject from "./pages/DndMultipleGroupObject";
import DndMultipleGroupArray from "./pages/DndMultipleGroupArray";
import DndMultipleGroupObjectFixSlot from "./pages/DndMultipleGroupObjectFixSlot";
import DndMultipleGroupArrayFixSlot from "./pages/DndMultipleGroupArrayFixSlot";

function App() {
    return (
        <React.StrictMode>
            <BrowserRouter basename="/">
            <Routes>
                <Route exact path="/multipleGroupArray" element={<DndMultipleGroupArray />}></Route>
                <Route exact path="/multipleGroupArrayFixSlot" element={<DndMultipleGroupArrayFixSlot />}></Route>
                <Route exact path="/multipleGroupObject" element={<DndMultipleGroupObject />}></Route>
                <Route exact path="/multipleGroupObjectFixSlot" element={<DndMultipleGroupObjectFixSlot />}></Route>
            </Routes>
            </BrowserRouter>
        </React.StrictMode>
       
    );
}

export default App;
