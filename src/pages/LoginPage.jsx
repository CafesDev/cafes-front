import React, { useRef } from "react";
import clipboardImage from '../assets/img/logo.png';
import authenticate from "../services/login/authenticate";

// LoginForm component
const LoginForm = () => {
  const emailInput = useRef()
  const passwordInput = useRef()

  const handleSubmit = () => {
    console.log('Login')
    const username = emailInput.current.value
    const password = passwordInput.current.value

    authenticate(username, password).then((data) => {
      console.log(data)
      window.location.pathname = '/control_pane/'
    })  

  }
  
  return (
    <div
    className="col d-flex d-lg-flex flex-column justify-content-center justify-content-lg-center align-items-lg-center"
    style={{ width: "50%", height: "100%", background: "transparent" }}
  >
    <img
      className="img-fluid"
      src={clipboardImage}
      style={{ maxWidth: "100px", maxHeight: "70px" }}
      loading="auto"
    />
    <div
      className="d-flex d-lg-flex flex-column justify-content-lg-center align-items-lg-center"
      style={{
        background: "white",
        width: "30vw",
        height: "60vh",
        borderRadius: "10px",
      }}
    >
      <div
        className="d-lg-flex flex-column justify-content-lg-start align-items-lg-center"
        style={{ marginBottom: "30px" }}
      >
        <h1 style={{ fontWeight: "bold", fontSize: "1.5em" }}>
          Iniciar Sesión
        </h1>
        <span
          className="text-center"
          style={{ fontSize: "10px", color: "gray" }}
        >
          Bienvenido de vuelta, Ingrese las credenciales Por Favor
        </span>
      </div>
      <div
        className="d-flex flex-column"
        style={{ width: "inherit", marginBottom: "10px" }}
      >
        <span
          className="text-start d-lg-flex"
          style={{ fontSize: "10px", color: "gray", marginLeft: "10%" }}
        >
          Correo Electronico
        </span>
        <input
          className="mx-auto"
          type="email"
          name="email"
          placeholder="Ingresa tu email"
          autoComplete="off"
          inputMode="email"
          required=""
          style={{
            fontSize: "10px",
            width: "200px",
            height: "25px",
            borderStyle: "hidden",
            fontWeight: "bold",
            marginTop: "10px",
            outline: "none"
          }}
          ref={emailInput}
        />
        <span
          className="text-start d-lg-flex"
          style={{
            fontSize: "10px",
            color: "gray",
            marginTop: "20px",
            marginLeft: "10%",
          }}
        >
          Contraseña
        </span>
        <input
          className="mx-auto"
          type="password"
          name="password"
          placeholder="Ingresa tu contraseña"
          style={{
            fontSize: "10px",
            width: "200px",
            height: "25px",
            borderStyle: "hidden",
            fontWeight: "bold",
            marginTop: "10px",
            outline: "none",
          }}
          ref={passwordInput}
        />
      </div>
      <section
        className="d-lg-flex justify-content-lg-center align-items-lg-center"
        style={{ width: "inherit" }}
      >
        <div
          className="col d-lg-flex justify-content-lg-center align-items-lg-center"
          style={{ marginLeft: "10px" }}
        >
          <input
            type="checkbox"
            value="recordar"
            style={{ height: "10px", width: "10px", marginRight: "5px" }}
          />
          <span style={{ marginRight: "initial", fontSize: ".5em" }}>
            Recordar Credenciales
          </span>
        </div>
        <div
          className="col d-lg-flex justify-content-lg-center"
          style={{ color: "#8d397b", fontWeight: "bold" }}
        >
          <span
            className="d-lg-flex justify-content-lg-end"
            style={{ fontSize: ".5em", cursor: "pointer", textDecoration: "underline"}}
            onClick={() => {alert('Olvide mi contraseña')}}
          >
            OLVIDE CONTRASEÑA
          </span>
        </div>
      </section>
      <button
        className="btn btn-primary text-center d-lg-flex mx-auto justify-content-lg-center align-items-lg-center"
        type="button"
        style={{
          width: "80%",
          height: "30px",
          background: "#8d397b",
          marginTop: "20px",
          color: "white",
          fontSize: "10px",
          borderRadius: "10px",
        }}
        onClick={handleSubmit}
      >
        Iniciar Sesion
      </button>
      <section>
        <span
          style={{ fontWeight: "bold", fontSize: "10px", marginRight: "3px" }}
        >
          No tienes cuenta?
        </span>
        <span
          style={{
            fontWeight: "bold",
            fontSize: "10px",
            marginRight: "3px",
            color: "#8d397b",
            cursor: "pointer",
            textDecoration: "underline"
          }}
          onClick={() => {alert('Crear cuenta')}}
        >
          Crear Cuenta
        </span>
      </section>
    </div>
  </div>
  )
};

// ColumnText component
const ColumnText = () => (
  <div
    className="col d-flex d-lg-flex justify-content-lg-center"
    style={{ width: "50%", height: "100%" }}
  >
    <div
      className="d-flex flex-column justify-content-center align-items-center my-auto align-items-lg-center"
      style={{
        background: "#8d397b",
        width: "40vw",
        height: "80vh",
        borderRadius: "10px",
        color: "white",
        padding: "10px",
      }}
    >
      <h1
        className="text-center"
        style={{ fontWeight: "bold", fontSize: "2em", marginBottom: "25px" }}
      >
        Bienvenido al gestor de proyectos de CAFES
      </h1>
      <p
        className="text-center"
        style={{
          marginTop: "50px",
          marginBottom: "50px",
          marginRight: "10px",
          marginLeft: "10px",
        }}
      >
        El Centro de de asesoria financiera y emprendimiento social de la UNISON
        es un esfuerzo conjunto de maestros y alumnos que busca la vinculación
        con las comunidades, las familias y las instituciones&nbsp; publicas y
        privadas como estrategia de intervención para coadyuvar el mejoramiento
        de las condiciones de vida de la población vulnerable en el estado de
        Sonora.
      </p>
    </div>
  </div>
);

const LoginPage = () => (
  <div style={{ background: "#F0EFE6", height: "100%", width: "100%", maxHeight: "100vh"}}>
    <div className="row" style={{ width: "100%", height: "100vh" }}>
      <LoginForm />
      <ColumnText />
    </div>
  </div>
);

export default LoginPage;
