import { observer } from "mobx-react-lite";
import React, { useContext, useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Navbar, Container, Row } from "react-bootstrap";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { Context } from "../index";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  ORDERING_ROUTE,
  ORDERS_ROUTE,
  PRODUCT_ROUTE,
  SHOP_ROUTE,
} from "../utils/consts";
import { useHistory } from "react-router-dom";
import "../index.css";
import { fetchOneProduct } from "../http/productAPI";
import { getOneOrderProducts } from "../http/ordersAPI";

const NavBarLink = observer(() => {
  const { user } = useContext(Context);

  const history = useHistory();
  const [product, setProduct] = useState();
  const [order, setOrder] = useState([]);


  const { id } =useParams();
  
  useEffect(() => {
    fetchOneProduct(id).then((data) => setProduct(data));
   
   getOneOrderProducts(id).then(data => {
      setOrder(data);
      
  }) 
  }, []);

  const location = useLocation();

  useEffect(() => {
    //console.log(location.pathname, order);
  }, [location, product]);

  return (
    <Row className="d-flex">
  
      <Nav>
        <Nav.Item>
          <Nav.Link>
            <NavLink to={SHOP_ROUTE}>
              <i>Главная</i>
            </NavLink>
          </Nav.Link>
        </Nav.Item>

 {       location.pathname === "/admin" ?
      (
        <Nav>
        <Nav.Item>
         <Nav.Link eventKey="disabled" disabled>
            Админ
          </Nav.Link>
          </Nav.Item>
        </Nav>
      )
      :
      location.pathname ==="/basket" ?
      (
        <Nav>
        <Nav.Item>
         <Nav.Link eventKey="disabled" disabled>
            Корзина
          </Nav.Link>
          </Nav.Item>
      </Nav>
      
      )
      :
      location.pathname ==="/login" ?
      (
        <Nav>
        <Nav.Item>
         <Nav.Link eventKey="disabled" disabled>
            Логин
          </Nav.Link>
          </Nav.Item>
      </Nav>
      
      )
      :
      location.pathname ==="/auth" ?
      (
        <Nav>
        <Nav.Item>
         <Nav.Link eventKey="disabled" disabled>
            Регистрация
          </Nav.Link>
          </Nav.Item>
      </Nav>
      
      )
      :
      location.pathname ==="/checkout" ?
      (
        <Nav>
        <Nav.Item>
         <Nav.Link eventKey="disabled" disabled>
            Оформление заказа
          </Nav.Link>
          </Nav.Item>
      </Nav>
      
      )
      :
      location.pathname ==="/orders" ?
      (
        <Nav>
        <Nav.Item>
         <Nav.Link eventKey="disabled" disabled>
            Список заказов
          </Nav.Link>
          </Nav.Item>
      </Nav>
      
      )
      
      :
      product && location.pathname === PRODUCT_ROUTE + "/" + product.id ? 
      (
        <Nav>
        <Nav.Item>
         <Nav.Link eventKey="disabled" disabled>
            {product.name}
          </Nav.Link>
          </Nav.Item>
      </Nav>
      )
      :
      order !== "Order doesn't exist in data base" &&  order.descr  ? (
          location.pathname === ORDERS_ROUTE + "/" + order.descr.id ?( 

        <Nav>
          <Nav.Item>
            <Nav.Link>
            <NavLink to={ORDERS_ROUTE}>
              <i>Список заказов</i>
             </NavLink>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="disabled" disabled>
              Заказ №  {order.descr.id} 
            </Nav.Link>
          </Nav.Item>
        </Nav>
      ) 
        :
        <></>
       
      )
      :

      <>
      </>}
      </Nav>
    
    
    </Row>
  );
});

export default NavBarLink;
