import Login from "./components/Login/Login";
import { UserContextProvider } from "./context";

function App() {
  return (
    <UserContextProvider>
      <Login />
    </UserContextProvider>
    
  )
}

export default App;
