import React, { useState, useEffect } from "react";
import {
  CContainer,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
  CNavItem,
  CNavLink,
  CCollapse,
} from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import "./NavBar.css";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const NavBar = ({ colorNav }) => {
  const [visible, setVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Simulación de obtener la cantidad de productos en el carrito
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(storedCart.length);
  }, []);

  return (
    <CNavbar expand="lg" className={`navbar-bg p-2 ${visible ? "collapse-nav" : ""}`}>
      <CContainer fluid>
        <CNavbarBrand>
          <img className="logoSit" src="/logoTienda.png" alt="Logo del Sitio" />
        </CNavbarBrand>

        <CNavbarToggler aria-label="Abrir menú" onClick={() => setVisible(!visible)}>
          <HiMenuAlt3 fontSize={25} style={{ color: colorNav }} />
        </CNavbarToggler>

        <CCollapse className="navbar-collapse" visible={visible}>
          <CNavbarNav className="custom-nav">
            {[
              { label: "Catálogo", to: "/" },
              { label: "Preguntas Frecuentes", to: "/Preguntas-Frecuentes" },
            ].map(({ label, to }) => (
              <CNavItem key={label}>
                <CNavLink as={Link} to={to} className="nav-link-custom">
                  {label}
                </CNavLink>
              </CNavItem>
            ))}
          </CNavbarNav>

          <CNavItem className="cart">
            <CNavLink as={Link} to="/Carrito" className="nav-link-custom cart-link" title="Ver carrito">
              <div className="cart-container">
                <IoCartOutline className="icon" />
                {cartCount > 0 && <span className="cart-counter">{cartCount}</span>}
              </div>
              <span>Carrito</span>
            </CNavLink>
          </CNavItem>
        </CCollapse>
      </CContainer>
    </CNavbar>
  );
};

export default NavBar;
