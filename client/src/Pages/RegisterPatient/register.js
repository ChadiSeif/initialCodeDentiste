import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import emailjs from "emailjs-com";
import { init } from "emailjs-com";
import { RegisterUser } from "../../JS/Actions/user";
import { useNavigate } from "react-router-dom";

import "./register.css";

const Register = () => {
  let navigate = useNavigate();
  //** send email */
  init("user_ru2ljoqZ7rIJ4rzxS7smy");
  function sendEmail(e) {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_jwxnxjb",
        "template_gjtye7s",
        e.target,
        "user_ru2ljoqZ7rIJ4rzxS7smy"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }
  //** */

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: "",
    consulting: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const error = useSelector((state) => state.userReducer.error);
  console.log("error  is ", error);
  const HandleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleError = (param) => {
    return (
      <div>
        {" "}
        {error ? (
          <form style={{ color: "red", fontSize: "0.75rem" }}>
            <p>
              {error
                .filter((error) => error.param === param)
                .map((error) => (
                  <p>{error.msg}</p>
                ))}
            </p>
          </form>
        ) : null}
      </div>
    );
  };

  return (
    <div className="all">
      <div style={{ margin: "20px" }}>
        <h4> Créez votre compte sur Dentiste.tn </h4>
        <h5> Prenez soin de bien remplir chaque champ ci-dessous. </h5>
      </div>

      <div className="formulaire">
        <form>
          <input
            type="text"
            name="lastName"
            value={newUser.lastName}
            onChange={HandleChange}
            placeholder="Nom"
            style={error ? { borderColor: "red" } : null}
          />

          {handleError("lastName")}
        </form>

        <form>
          <input
            type="text"
            name="firstName"
            value={newUser.firstName}
            onChange={HandleChange}
            placeholder="Prénom"
            style={{
              borderColor: newUser.firstName === "" && error ? "red" : null,
            }}
          />
          {handleError("firstName")}
        </form>
        <form>
          <input
            type="text"
            name="phone"
            value={newUser.phone}
            onChange={HandleChange}
            placeholder="Numéro de téléphone"
            style={{
              borderColor: newUser.phone === "" && error ? "red" : null,
            }}
          />
          {handleError("phone")}
        </form>
        <form>
          <input
            type="text"
            name="dateOfBirth"
            value={newUser.dateOfBirth}
            onChange={HandleChange}
            placeholder="Date de naissance ( jj/mm/aaaa/ )"
            style={{
              borderColor: newUser.dateOfBirth === "" && error ? "red" : null,
            }}
          />
          {handleError("dateOfBirth")}
        </form>
        <div></div>
        <form>
          <input
            type="text"
            name="email"
            value={newUser.email}
            onChange={HandleChange}
            placeholder=" Email "
            style={{
              borderColor: newUser.email === "" && error ? "red" : null,
            }}
          />
          {handleError("email")}
        </form>

        <form>
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={HandleChange}
            placeholder=" Mot de passe "
            style={{
              borderColor: newUser.password === "" && error ? "red" : null,
            }}
          />
          {handleError("password")}

          <hr />
        </form>
        <form className="contact-form" onSubmit={sendEmail}>
          <input type="hidden" name="contact_number" />
          <input type="hidden" name="user_name" value={newUser.lastName} />
          <input type="hidden" name="user_email" value={newUser.email} />
          <input type="hidden" name="user_password" value={newUser.password} />

          <button
            className="boutton"
            type="submit"
            value="Send"
            onClick={() => {
              dispatch(RegisterUser(newUser, navigate));
            }}
          >
            S'inscrire
          </button>
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default Register;
