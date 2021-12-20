import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/nomflix/" element={<Home />}>
          <Route path="/nomflix/movies/:movieId" />
        </Route>
        <Route path="/nomflix/tv" element={<Tv />}>
          <Route path="/nomflix/tv/:tvId" />
        </Route>
        <Route path="/nomflix/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
