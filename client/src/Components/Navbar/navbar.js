import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "../Navbar/navbar.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../../JS/Actions/user";
import { Logoutmedecin } from "../../JS/Actions/medecin";

const NavBar = () => {
  const UserIsAuth = useSelector((state) => state.userReducer.UserIsAuth);
  const medecinIsAuth = useSelector(
    (state) => state.medecinReducer.medecinIsAuth
  );

  const user = useSelector((state) => state.userReducer.user);
  const medecin = useSelector((state) => state.medecinReducer.medecin);
  // const medecin = useSelector((state) => state.medecinReducer.medecin);
  const dispatch = useDispatch();

  return (
    <Navbar variant="dark" expand="lg">
      <Container>
        <Link exact to="/">
          <Navbar.Brand
            href="#home"
            style={{
              fontFamily: "Lobster",
              fontSize: "xxx-large",
            }}
          >
            Dentiste.tn
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Nav>
              <Link exact to="/">
                <Nav.Link href="/">Accueil</Nav.Link>
              </Link>
              <Nav.Link href="/About-Us">Qui somme-nous ?</Nav.Link>

              {UserIsAuth ? (
                <>
                  <Link to={`/Profil/`}>
                    <Nav.Link href="#home">Bienvenue {user.lastName} </Nav.Link>
                  </Link>
                  <Link to={"/"}>
                    <Button
                      variant="outline-light"
                      onClick={() => dispatch(Logout())}
                    >
                      Logout
                    </Button>
                  </Link>
                </>
              ) : medecinIsAuth ? (
                <>
                  <Link to={`/Dr/${medecin._id}/Accueil`}>
                    <Nav.Link href="#home">
                      Bienvenue Dr {medecin.lastname}{" "}
                    </Nav.Link>
                  </Link>
                  <Link to={"/"}>
                    <Button
                      variant="outline-light"
                      onClick={() => dispatch(Logoutmedecin())}
                    >
                      Logout
                    </Button>
                  </Link>
                </>
              ) : (
                <div>
                  <Link to="/Login">
                    <Button
                      variant="outline-light"
                      style={{ marginRight: "10px", marginLeft: "10px" }}
                    >
                      Connexion
                    </Button>
                  </Link>
                  <Link to="/LoginMedecin">
                    <Button variant="outline-light">vous êtes médecin ?</Button>
                  </Link>
                </div>
              )}
            </Nav>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
