import { Routes, Route } from "react-router-dom";
import { useSessionManager } from "./utils/Auth";
import SessionMessage from "./components/SessionMessage";
import List from "./components/List"
import Add from "./components/Add"
import Nav from "./components/Nav"
import Container from "@mui/material/Container";

//const sessionManager = {user: {userID: 12345, userName: 'Cliff'}}

function App() {
  const sessionManager = useSessionManager();

  return (
    <Container disableGutters style={{ maxWidth: 800 }}>
      <SessionMessage sessionManager={sessionManager} />
      <Nav sessionManager={sessionManager} />
      <Routes>
        <Route path="/list" element={<List sessionManager={sessionManager} />} />
        <Route path="/add" element={<Add sessionManager={sessionManager} />} />
      </Routes>
    </Container>
  );
}

export default App;
