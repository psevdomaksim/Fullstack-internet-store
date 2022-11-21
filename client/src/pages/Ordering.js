import React, {useContext, useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {Context} from "../index";
import {sendOrder} from "../http/ordersAPI";
import {NavLink, useHistory} from "react-router-dom";
import {SHOP_ROUTE} from "../utils/consts";
import NavBarLink from '../components/NavBarLink';

const Ordering = () => {
    const {basket, user} = useContext(Context);
    const [phone, setPhone] = useState(null);
    const [name, setName] = useState(null);
    const history = useHistory();

    const buy = () => {
        let order = {
           /*  username: name, */
            mobile: phone,
            basket: basket.Basket
        }

        if(user.isAuth) {
            order.auth = true;
        }

        sendOrder(order).then(data => {
            alert(data);
            console.log(order);
            basket.setDeleteAllProductFromBasket();
            history.push(SHOP_ROUTE);
        });
       
    }
    return (
        <>
         <div className="d-flex flex-column align-items-center mt-3" style={{width:900, margin: "auto"}}>
         
         <NavBarLink/>
      
    
    <br/>
  
    <Form>
                <Form.Control
                    placeholder="Введите свой номер телефона..."
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    style={{width:900}}
                />
             
            </Form>
         {/*    <Form>
            <Form.Control
                    placeholder="Input your name..."
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </Form> */}
            
            <Row className="mt-3">
                <Col xs={12}>
                    <Button variant="secondary" onClick={buy}>Купить</Button>
                </Col>
            </Row>

</div>
        
        
        </>
    );
};

export default Ordering;
