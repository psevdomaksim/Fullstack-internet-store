import React, {useState} from 'react';
import {Button, Col, ListGroup, Modal, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {fetchChangeStatusOrder, fetchDeleteOrder} from "../http/ordersAPI";
import {ORDERS_ROUTE} from "../utils/consts";

const OrderItem = ({id, complete, mobile,/* username, */ createdAt, updatedAt, userId, reRender}) => {
    const [modalDelete, setShowDelete] = useState(false);
    const [modalStatus, setShowStatus] = useState(false);

    //modal delete
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
    const deleteOrder = () => {
        fetchDeleteOrder({id}).then(() => {
            setShowStatus(false);
            setTimeout(() => reRender(), 250);
        })
    }

    //modal status
    const handleCloseStatus = () => setShowStatus(false);
    const handleShowStatus = () => setShowStatus(true);
    const changeStatusOrder = () => {
        fetchChangeStatusOrder({complete: !complete, id}).then(() => {
            setShowStatus(false);
            setTimeout(() => reRender(), 250);
        })
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
            <ListGroup.Item className="mt-3" key={id}>
                <Row>
                    <Col md={8}>
                        <Row>
                            <Col xs={12}>
                                <NavLink to={ORDERS_ROUTE + `/${id}`}>Номер: {id}</NavLink>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                Телефон: <a href={`tel:${mobile}`}>{mobile}</a>
                            </Col>
                        </Row>
                       {/*  <Row>
                            <Col xs={12}>
                                Username: <a href={`name:${username}`}>{username}</a>
                            </Col>
                        </Row> */}
                        <Row>
                            <Col xs={12}>
                               Оформлен: {formatDate(createdAt)}
                            </Col>
                        </Row>
                        {complete ? <Row>
                            <Col xs={12}>
                               Выполнен: {formatDate(updatedAt)}
                            </Col>
                        </Row> : false}
                        <Row>
                            <Col xs={12}>
                                {userId ? "Покупатель: Зарегистрирован" : "Покупатель: Не Зарегистрирован"}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                Статус: {complete ? "Выполнен" : "Выполняется"}
                            </Col>
                        </Row>
                    </Col>
                    <Col md={4}>
                        <Row style={{height: "100%"}} className="d-flex align-items-center">
                            <Col xs={6} className="d-flex justify-content-center">
                                {complete ?
                                    <Button variant="success" onClick={handleShowStatus}>Отменить</Button>
                                    :
                                    <Button variant="warning" onClick={handleShowStatus}>Выполнить</Button>}
                            </Col>
                            <Col xs={6} className="d-flex justify-content-center">
                                <Button variant="danger" onClick={handleShowDelete}>Удалить</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </ListGroup.Item>

            {/*modal confirm change status*/}
            <Modal show={modalStatus} onHide={handleCloseStatus}>
                <Modal.Header closeButton>
                    <Modal.Title>Пожалуйста уточните</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Вы действительно хотите изменить текущее состояние заказа (№ {id}), с {complete ? '\'Выполнен\'' : '\'Выполняется\''} до {complete ? '\'Выполняется\'' : '\'Выполнен\''}?
                    <br/><br/>
                    Информация о заказе:
                    <ul>
                        <li>Телефон: {mobile}</li>
                        <li>Дата оформления: {formatDate(createdAt)}</li>
                        <li> {complete ? `Заказ выполнен: ${formatDate(updatedAt)}` : false}</li>
                        <li>Статус: {complete ? 'Выполнен' : `Выполняется`}</li>
                        <li>{userId ? "Покупатель: Зарегистрирован" : "Покупатель: Не Зарегистрирован"}</li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseStatus}>
                        Отменить
                    </Button>
                    <Button variant="primary" onClick={changeStatusOrder}>
                        Подтвердить
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*modal confirm delete order*/}
            <Modal show={modalDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Пожалуйста уточните</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   Вы действительно хотите удалить заказ(№ {id})?
                    <br/><br/>
                    Информация о заказе:
                    <ul>
                        <li>Телефон: {mobile}</li>
                        <li>Дата оформления: {formatDate(createdAt)}</li>
                        <li>{complete ? `Заказ выполнен: ${formatDate(updatedAt)}` : false}</li>
                        <li>Статус: {complete ? 'Выполнен' : `Выполняется`}</li>
                        <li>{userId ? "Покупатель: Зарегистрирован" : "Покупатель: Не Зарегистрирован"}</li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Отменить
                    </Button>
                    <Button variant="primary" onClick={deleteOrder}>
                        Подтвердить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default OrderItem;
