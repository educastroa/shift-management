import Login from "./components/Login/Login";
import { UserContextProvider } from "./context";
import ShiftNotes from "./components/ShiftNotes/ShiftNotes";
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element= {<Login/>}/>
        <Route path="/shiftnotes" element= {<ShiftNotes/>}/>
      
      
      </Routes>
    </UserContextProvider>
    
  )
}

export default App;
