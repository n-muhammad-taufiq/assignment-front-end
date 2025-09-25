import ProtectedLayout from "./components/ProtectedLayout"
import Sidebar from "./components/Sidebar"
import { Routes,Route } from "react-router-dom"
import Dashboard from "./components/Dashboard"


function App() {

  return (
   <Routes>
    <Route path="/" element={<ProtectedLayout></ProtectedLayout>}>
    <Route path="" element={<Dashboard></Dashboard>}></Route>
    </Route>
   </Routes>
  )
}

export default App
