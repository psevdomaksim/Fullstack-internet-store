import { observer } from "mobx-react-lite";
import React, { useContext, useState, useEffect } from "react";
import { Image, Nav } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Context } from "../index";
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, ORDERS_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { useHistory } from "react-router-dom";

const logo = require("../utils/logo.png")

const NavBar = observer(() =>{

  const {user} = useContext(Context)

  const history = useHistory()

   useEffect(() => {
     
   user.setIsAuth(localStorage.getItem("auth"))
   user.setRole(localStorage.getItem("role"))
  }, []);

  const logOut = ()=>{
    user.setUser({})
    user.setIsAuth(false)
    localStorage.removeItem('token')
    localStorage.removeItem('auth')
    localStorage.removeItem('role')
    localStorage.removeItem('basket')
  }
    return(    

      
        <Navbar bg="dark" variant="dark">
          <Container>
            <Nav className="navbar-brand" href="#"> 
      
              
              <Navbar.Brand style={{color:"white"}} to={SHOP_ROUTE}>
              <Image
                  className="d-inline-block align-top"
                  width={30}
                  height={30}
                  src={logo}
                  href="/"
                 />
                 TEASHOP.BY
        </Navbar.Brand>
            </Nav>
            {user.isAuth ?
              <Nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{color:"white"}}>
             {user.role==="ADMIN" ?
             <>
                <Button className="mx-3" variant={"outline-light"} onClick={()=> history.push(ADMIN_ROUTE)}>Админ</Button>
                <Button className="mx-3" variant={"outline-light"} onClick={()=> history.push(ORDERS_ROUTE)}>Заказы</Button>
                <Button  className="mx-3" variant={"outline-light"} onClick={()=> logOut()}>Выйти</Button>

                </>
                  :
                  <>
                  
                  <Button className="mx-3" variant={"outline-light"} onClick={()=> history.push(BASKET_ROUTE)}> Корзина</Button>
                  <Button variant={"outline-light"} onClick={()=> logOut()}>Выйти</Button>

                  </> 
               }        
              </Nav>
                 :
                 
            <Nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{color:"white"}}>
               <Button className="mx-3" variant={"outline-light"} onClick={()=> history.push(BASKET_ROUTE)}> Корзина</Button>
                <Button variant={"outline-light"} onClick={()=> history.push(LOGIN_ROUTE)}>Авторизация</Button>
            </Nav>
                
            
            }
          </Container>
        </Navbar>
     
    );
})

export default NavBar;