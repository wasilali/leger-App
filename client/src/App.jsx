import Home from "./Home.jsx"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <>
    <div className="bg-gray-100 h-screen">
    <Home/>
    <ToastContainer />
    </div>
    </>
  )
}

export default App
