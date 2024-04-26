import { useNavigate, Link } from "react-router-dom";
import { Container, Button, Navbar } from "react-bootstrap";
import ecommerce from "../Images/E-commerce.png";
import Swal from "sweetalert2";

function NavigationBar() {
  const navigate = useNavigate();
  const auth = localStorage.getItem("userDetails");
  const logout = () => {
    localStorage.clear();
    navigate("/SignUp");
    Swal.fire({ icon: "success", title: "You are logged out" });
  };
  return (
    <Navbar expand="lg" sticky="top" className="nav-transparent">
      <Container fluid>
        <Navbar.Brand to="/">
          <img
            className="img-fluid"
            src={ecommerce}
            style={{ maxWidth: "150px" }}
            alt="E-Comm"
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {auth ? (
            <>
              <Link className="menu" to="/Products">
                <div className="mx-3">Product</div>
              </Link>

              <Link className="menu" to="/AddProducts">
                <div className="mx-3">Add Product</div>
              </Link>

              <Link className="menu" to="/UpdateProducts">
                <div className="mx-3">Update Product</div>
              </Link>

              <Link className="menu" to="/Profile">
                <div className="mx-3">Profile</div>
              </Link>

              <Link to="/Login" onClick={logout}>
                <Button className="float-end log-btn">Logout</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/SignUp">
                <Button variant="success" className="float-end mx-1 log-btn">
                  SignUp
                </Button>
              </Link>
              <Link to="/Login">
                <Button variant="success" className="float-end mx-1 login-btn">
                  Login
                </Button>
              </Link>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavigationBar;
