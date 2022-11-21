/* import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { check } from "./http/userAPI";
import { Context } from "./index";
import "./index.css"

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check()
      .then((data) => {
        user.setUser(true);
        user.setIsAuth(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner animation={"grow"} />;
  }

  return (
    <BrowserRouter>
     
    <div className="page-container">
      <div className="content-wrap">

      
      <NavBar />
      <AppRouter />
     </div>
       <Footer />
    </div>
    </BrowserRouter>
    
   
   

   
  );
});

export default App; */
import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import {observer} from "mobx-react-lite";
import Footer from "./components/Footer";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {Container, Spinner} from "react-bootstrap";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {getProductFromBasket} from "./http/productAPI";

const App = observer(() => {
    const {user, basket} = useContext(Context);
    const [loading, setLoading] = useState(false);

    //check authorization
    useEffect(() => {
        if(localStorage.getItem('token')) {
            setLoading(true);
            check().then(data => {
                user.setUser(data);
                user.setIsAuth(true);
            }).finally(() => {
                setLoading(false);
            })
        }
    }, [user]);


    //Loading Basket
    useEffect(() => {
       if(user.isAuth === false) {
           basket.setDeleteAllProductFromBasket();
           const savedBasket = JSON.parse(localStorage.getItem("basket"));
           for (let key in savedBasket) {
               basket.setBasket(savedBasket[key]);
           }
       } else if(user.isAuth === true){
           basket.setDeleteAllProductFromBasket();
           getProductFromBasket().then(data => {
               for (let key in data) {
                   basket.setBasket(data[key], true);
               }
           })
       }
    }, [basket, user.isAuth]);

    if(loading) {
        return <Spinner animation="grow"/>
    }

    return (
      <BrowserRouter>
     
      <div className="page-container">
        <div className="content-wrap">
  
        
        <NavBar />
        <AppRouter />
       </div>
         <Footer/>
      </div>
      </BrowserRouter>
    );
});
export default App;