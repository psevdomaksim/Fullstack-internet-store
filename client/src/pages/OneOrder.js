import React, {useEffect, useState} from 'react';
import {Col, Container, Image, Row, Spinner} from "react-bootstrap";
import {useParams} from "react-router-dom";
import NavBarLink from '../components/NavBarLink';
import {getOneOrderProducts} from "../http/ordersAPI";

const OneOrder = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        getOneOrderProducts(id).then(data => {
            setOrder(data);
            setLoading(false);
            console.log(order);
        })
    }, []);

    if(loading) {
        return <Spinner animation="grow"/>
    }

    //Format date (createdAt)
    const formatDate = (propsDate) => {
        const date = new Date(Date.parse(propsDate));
        const options = {
            weekday: "short",
            hour: 'numeric',
            minute: 'numeric',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timezone: 'UTC'
        };
        return date.toLocaleString("ru", options);
    }

    return (
    <>     
        
        <div className="d-flex flex-column align-items-center mt-3" style={{width:900, margin: "auto"}}>
                
                <NavBarLink/>
            
            
            </div>
        <Container className="d-flex flex-column">
           
            Номер заказа: {id} <br />
            Статус: {order?.descr.complete ? "Выполнен" : "Не выполнен"} <br />
            Пользователь: {order?.descr.userId ?  order.descr.userId : "Не зарегистрирован"} <br />
            Оформлен: {formatDate(order?.descr.createdAt)} <br />
            {order?.descr.complete ? formatDate(order.descr.complete.updatedAt) : false }
            <a href={`tel:${order?.descr.mobile}`}>Телефон: {order?.descr.mobile}</a>
           {/*  <a href={`name:${order?.descr.username}`}>Username: {order?.descr.username}</a> */}
            <br />

            {order?.products.map( ({count,descr}, i) => {
                return (
                    <Row key={i} className="mb-5">
                        <Col xs={2}>
                            <Image width={150} src={process.env.REACT_APP_API_URL || 'http://localhost:4200/' + descr.img}/>
                        </Col>
                        <Col xs={10}>
                            Тип: {descr.type.name}<br />
                            Вид: {descr.form.name}<br />
                            Название: {descr.name}<br />
                            Цена: {descr.price} Р<br />
                            Количество: {count}<br />
                            Итоговая стоимость: {count * descr.price} Р
                        </Col>
                    </Row>
                )
            })}

        </Container>
        </>
       
    );
};

export default OneOrder;
