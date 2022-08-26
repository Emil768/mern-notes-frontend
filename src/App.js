import "./styles/index.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Header, Footer, Container } from "./components";
import { Notes, AddNote, FullBlock, Login, Register } from "./pages";
import { Routes, Route } from "react-router-dom";
import { fethAuthMe } from "./redux/slices/auth";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fethAuthMe());
  }, []);
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/add-note" element={<AddNote />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/notes/:id" element={<FullBlock />} />
        <Route path="/category/:name" element={<Notes />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
