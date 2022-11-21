import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import {Container, Form, Card, Button, Row} from "react-bootstrap"
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { Context } from "../index";
import { login, registration } from "../http/userAPI";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import NavBarLink from "../components/NavBarLink";

 
const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory();
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
/*     const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState('Email не должен быть пустым');
    const [passwordError, setPasswordError] = useState('Пароль не должен быть пустым');
    const [formValid, setFormValid] = useState(false); */
    
  /*   useEffect(()=>{
        if(emailError || passwordError){
            setFormValid(false)
        }else{
            setFormValid(true)
        }
    },[emailError,passwordError]) */

  /*   const emailHandler = (e) =>{
        setEmail(e.target.value)
        const re =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
       if(!re.test(String(e.target.value).toLowerCase())){
            setEmailError("Email некорректен")
       } else{
        setEmailError("")
       }
    } */

  /*   const passwordHandler = (e) =>{
        setPassword(e.target.value)
        if(e.target.value.length<3||e.target.value.length>15){
            setPasswordError("Пароль должен быть длиннее 3 и меньше 15 символов")    
            if(!e.target.value)    {
                setPasswordError("Пароль не должен быть пустым")
            } 
        } else{
            setPasswordError("")
           }
    } */

 /*    const blurHandler = (e)=>{
        switch (e.target.name){
            case "email":
            setEmailDirty(true)
            break
            case "password":
            setPasswordDirty(true)
            break
        }
    } */

    const auth = async ()=>{           
     try {      
        let data;
        if (isLogin){
            data = await login(email, password);
        }
        else{
            data = await registration(email, password, role);
            
        }
            user.setIsAuth(true)
            user.setRole(localStorage.getItem("role"))
            history.push(SHOP_ROUTE)
            localStorage.setItem("auth", "true")
            
      } catch(e){
          alert(e.response.data.message)
      } 
        
    }
    return(
        <Container  className="m-auto" style={{weight: 720}}>
        <NavBarLink/>
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 320}}
       >
          
           <Card style={{width: 720, border:"0"}} className="p-5">
               <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
               <Form className="d-flex flex-column">
               
                   <Form.Control
                       className="mt-4"
                       placeholder="Введите email"
                      /*  name="email" */
                       type="text"
                       value = {email}
                     //  onBlur = {e=>blurHandler(e)}
                       onChange={e => setEmail(e.target.value)}
                    />
              {/*   {(emailDirty&&emailError) && <div style={{color:"red"}}>{emailError}</div>} */}
                     <Form.Control
                       className="mt-4"
                       placeholder="Введите пароль"
                      /*  name = "password" */
                       type = "password"
                       value = {password}
                     //  onBlur = {e=>blurHandler(e)}
                       onChange={e => setPassword(e.target.value)}
                       
                    />
                   {/*   {(passwordDirty&&passwordError) && <div style={{color:"red"}}>{passwordError}</div>} */}
                    <Row className="d-flex justify-content-between mt-3 pr-3 pl-3">
                        {isLogin ?
                            <div>
                                Нет аккаунта?<NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт?<NavLink to={LOGIN_ROUTE}>Авторизируйтесь!</NavLink> 
                            </div>
                        }
                        <Button
                            className="mt-4 align-self-end"
                            variant={"outline-success"}
                            //disabled={!formValid}
                            onClick={auth}
                        >
                            {isLogin ? "Войти" : "Регистрация"}
                        </Button>
                        
                    </Row>
              
                  
                </Form>
           </Card>

       </Container>
       </Container>
    );
})

export default Auth;