import React, {useContext} from 'react';
import {Button, Card, Col, Image, Row} from "react-bootstrap";
import {Context} from "../index";
import {NavLink} from "react-router-dom";
import { observer } from 'mobx-react-lite';

const BasketItem = observer(({product}) => {
    const {basket, user} = useContext(Context);
   
    return (
        <Card key={product.id} style={{width: "100%"}} className="mb-3">
            <Card.Body>
                <Row>
                    <Col xs={2}>
                        <Image src={"http://localhost:4200/" + product.img} style={{width: "100%", maxWidth: 250, objectFit: "cover"}} />
                    </Col>
                    <Col xs={5}>
                        <Row>
                            <Col xs={12}>
                                <b>Название:</b> <NavLink to={`/product/${product.id}`}>{product.name}</NavLink>
                            </Col>
                        </Row>
                        <br/><br/>
                        <Row>
                            <Col xs={12}>
                                <b>Описание:</b><br/><br/>
                                {product.info && product.info.length !== 0? product.info.map((info, i) => {

                                    if(i % 2 === 0 ) {
                                        return (
                                            <Row key={info.id}>
                                              {info.description}
                                            </Row>
                                        );
                                    } else {
                                        return (
                                            <Row key={info.id} style={{backgroundColor: "lightgray"}}>
                                                {info.description}
                                            </Row>
                                        );
                                    }

                                }) : "Описание отсутствует"}
                            </Col>
                        </Row>


                    </Col>
                    <Col xs={5}>
                        <Row>
                            <Col xs={12} className="d-flex justify-content-center">
                                {user.isAuth ? <Button variant="outline-dark" onClick={() => basket.setDeleteItemBasket(product, true)}>Удалить из корзины</Button>
                                    : <Button variant="outline-dark" onClick={() => basket.setDeleteItemBasket(product)}>Удалить из корзины</Button>
                                }
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col xs={12} className="d-flex justify-content-center">
                                Количество:
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col xs={12} className="d-flex justify-content-center">
                                <Button variant="outline-dark" onClick={() => basket.setCountProduct(product.id, "+")}>+</Button>
                                <input className="ml-2 mr-2 pl-2 pr-2" style={{width: "20%"}} type="number" onChange={e =>basket.setCountProduct(Number(e.target.value))} value={product.count}/>
                                <Button variant="outline-dark" onClick={() => basket.setCountProduct(product.id, "-")}>-</Button>
                            </Col>
                        </Row>
                        
                        <Row className="mt-5">
                            <Col xs={12} className="d-flex justify-content-center">
                                Цена: {product.price * product.count} р.
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
)});

export default BasketItem;