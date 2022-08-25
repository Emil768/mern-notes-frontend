import "./styles/index.scss";

import Header from "./components/Header";
import Notes from "./components/pages/Notes";
import Container from "./components/Container";
import Footer from "./components/Footer";
import FullBlock from "./components/pages/FullBlock";
import AddNote from "./components/pages/AddNote";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/add-note" element={<AddNote />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes/:id" element={<FullBlock />} />
        <Route path="/category/:name" element={<Notes />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
