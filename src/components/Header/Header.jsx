import React from "react";
import style from "./Header.module.css";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function Header() {
  return (
    <div className={`${style.header} text-white`}>
      <div className="container">
        <div className="header-content">
          <div className={`${style.headerTopContent} py-3 d-flex align-items-center justify-content-between flex-column flex-md-row gap-3 gap-md-0`}>
            <div className="header-top-left-content">
              <ul className="d-flex align-items-center">
                <li>
                  <Link to="/seller">Seller Center</Link>
                </li>

                <li className={style.vertLine}></li>

                <li>
                  <Link to="/seller">Download</Link>
                </li>

                <li className={style.vertLine}></li>

                <li className="d-flex align-items-center justify-content-start gap-3">
                  <span to="/seller">Follow Us On</span>
                  <ul className="d-flex align-items-center gap-3">
                    <li>
                      <a href="www.facebook.com">
                        <i className="fab fa-facebook fa-lg"></i>
                      </a>
                    </li>

                    <li>
                      <a href="www.facebook.com">
                        <i className="fab fa-instagram fa-lg"></i>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="header-top-right-content">
              <ul className="d-flex align-items-center">
                <li>
                  <Link to="/">
                    <span className="mx-3">
                      <i className="fa-solid fa-circle-question fa-lg"></i>
                    </span>

                    <span>Support</span>
                  </Link>
                </li>

                <li className={style.vertLine}></li>

                <li>Register</li>

                <li className={style.vertLine}></li>

                <li>Login</li>
              </ul>
            </div>
          </div>
          
          <Navbar/>
        </div>
      </div>
    </div>
  );
}

export default Header;
