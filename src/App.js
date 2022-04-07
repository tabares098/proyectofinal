import { HashRouter, Routes, Route } from "react-router-dom";
import { Product, Home, Shope } from "./pages";
import "./App.css";
import { useSelector } from "react-redux";
import LoadingScreen from "./pages/LoadingScreen";
import NavBar from "./components/NavBar"



function App() {
  const isLoading = useSelector((state) => state.isLoading);
  return (
    <div className="App">
      <HashRouter>
      {isLoading && <LoadingScreen />}
      <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/shop/:id" element={<Shope />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
