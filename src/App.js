import "./styles/index.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Header, Footer, Container } from "./components";
import { Notes, AddNote, FullBlock, Login, Register, Category } from "./pages";
import { Routes, Route, Navigate } from "react-router-dom";
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
        <Route path="/category/:name" element={<Category />} />
        <Route path="/notes/:id/edit" element={<AddNote />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
