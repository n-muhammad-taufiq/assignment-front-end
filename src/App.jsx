import ProtectedLayout from "./components/ProtectedLayout"
import Sidebar from "./components/Sidebar"
import { Routes,Route } from "react-router-dom"


function App() {

  return (
   <Routes>
    <Route path="/" element={<ProtectedLayout></ProtectedLayout>}>
    </Route>
   </Routes>
  )
}

export default App
