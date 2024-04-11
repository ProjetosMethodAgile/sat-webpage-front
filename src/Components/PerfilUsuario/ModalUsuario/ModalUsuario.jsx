import React, { useState } from "react";
import styles from "./ModalUsuario.module.css";

const ModalUsuario = () => {
  function logout() {
    window.localStorage.removeItem('token')
    window.location.reload();
  }

  return (
    <nav className={`${styles.containerModal} animation-up-button`}>
      <ul className={styles.options}>
        <li>Minha Conta</li>
        <li>Meus Serviços</li>
        <li onClick={logout}>Sair</li>
      </ul>
    </nav>
  );
};

export default ModalUsuario;
