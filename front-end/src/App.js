import { Route, Routes } from "react-router-dom";
import "./const/compCss.css";
import Footer from "./components/Footer";
import NavigationBar from "./components/Nav";
import AddProducts from "./Pages/Add Products";
import HomePage from "./Pages/HomePage";
import Products from "./Pages/Products";
import UpdateProducts from "./Pages/UpdateProducts";
import SignUp from "./Pages/SignUp";
import PrivateComponent from "./components/PrivateComponent";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";

function App() {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/AddProducts" element={<AddProducts />} />
          <Route path="/UpdateProducts" element={<UpdateProducts />} />
          <Route path="/Profile" element={<Profile />} />
        </Route>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
