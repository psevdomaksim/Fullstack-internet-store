import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Nav } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Context } from "../index";
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { useHistory } from "react-router-dom";
import "../index.css"
import "bootstrap-icons/font/bootstrap-icons.css";

const Footer = observer(() =>{
  const {user} = useContext(Context)
  const history = useHistory()
 
 
    return(    
<>
      <footer className="main-footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>О нас</h6>
            <p className="text-justify">
                      TeaShop.by — интернет-магазин чая, чайной посуды и аксессуаров. Все права защищены.
                      Время работы: Пн-Вс, с 10:00 до 21:00

                      Телефон: +375(33)6041177
                      E-mail: teashop@teashop.by

                      Адрес магазина: г. Минск, пр. Независимости, 28 (м. «Октябрьская»)  </p>
          </div>

       
        </div>
        <hr/>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">Copyright &copy; 2022 All Rights Reserved  
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">
              <li><a className="facebook" href="#"><i className="bi bi-facebook"></i></a></li>
              <li><a className="twitter" href="#"><i className="bi bi-twitter"></i></a></li>
              <li><a className="telegram" href="#"><i className="bi bi-telegram"></i></a></li>   
              <li><a className="linkedin" href="#"><i className="bi bi-linkedin"></i></a></li>   
            </ul>
          </div>
        </div>
      </div>
</footer>
     </>
    );
})

export default Footer;