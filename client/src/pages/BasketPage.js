import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";


import {Context} from "../index";
import {Button, Col, Image, Row} from "react-bootstrap";
import BasketItem from "../components/BasketItem";

import {ORDERING_ROUTE} from "../utils/consts";
import {NavLink} from "react-router-dom";
import NavBarLink from '../components/NavBarLink';

const BasketPage = observer(() => {
    const {basket} = useContext(Context);

    if(basket.Basket.length === 0) {
        return (
            <div className="d-flex flex-column align-items-center mt-5">
                 <NavBarLink/>
                <div className="text-center mt-5" style={{fontSize: 28}}><b>В корзине пока нет товаров</b></div>
            </div>
        )
    }

    return (
        <div className="d-flex flex-column align-items-center mt-3" style={{width:900, margin: "auto"}}>
         
                 <NavBarLink/>
              
            
            <br/>
          
            <Row className="mt-3">
                <Col xs={12}>
                    {basket.Basket.map(product => <BasketItem key={product.id} product={product}/>)}
                </Col>
            </Row>
            <NavLink to={ORDERING_ROUTE}>
            <div className="d-flex flex-column align-items-center mt-3">
                <Button variant="danger" className='my-3' style={{width:900}}>Оформить заказ</Button>
            </div>
            </NavLink>
        </div>
    );
});

export default BasketPage;
