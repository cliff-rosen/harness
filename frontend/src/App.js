import { Routes, Route } from "react-router-dom";
import List from "./components/List"
import Add from "./components/Add"
import Nav from "./components/Nav"

const sessionManager = {user: {userID: 12345, userName: 'Cliff'}}

function App() {
  return (
    <div>
      <Nav sessionManager={sessionManager} />
      <Routes>
        <Route path="/list" element={<List sessionManager={sessionManager} />} />
        <Route path="/add" element={<Add sessionManager={sessionManager} />} />
      </Routes>
    </div>
  );
}

export default App;
