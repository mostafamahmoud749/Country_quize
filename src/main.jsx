import { createRoot } from 'react-dom/client'
import './index.css'
import "./normalize.css"
import App from "./assets/comp/App"

createRoot(document.getElementById('root')).render(
    <>
        <App />
    </>
)
