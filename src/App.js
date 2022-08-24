import "./styles/index.scss";

import Header from "./components/Header";
import Notes from "./components/Notes";
import Container from "./components/Container";
import Footer from "./components/Footer";
import FullBlock from "./components/FullBlock";

function App() {
  return (
    <Container>
      <Header />
      <Notes />
      {/* <FullBlock /> */}
      <Footer />
    </Container>
  );
}

export default App;
