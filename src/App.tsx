import './App.css'
import { BrowserRouter, Routes } from 'react-router-dom';
import {AppRoutes} from "@/app/routes";
import {SharedRoutes} from "@/shared/routes";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                { AppRoutes }
                { SharedRoutes }
            </Routes>
        </BrowserRouter>
    )
}

export default App
