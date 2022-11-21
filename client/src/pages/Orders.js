import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Dropdown,
  ListGroup,
  Pagination,
  Row,
  Spinner,
} from "react-bootstrap";
import { fetchOrders } from "../http/ordersAPI";
import OrderItem from "../components/OrderItem";
import NavBarLink from "../components/NavBarLink";

const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState("Все");
  const [rerender, setRerender] = useState(false);

  //pagination
  const limit = 6;
  const pageCount = Math.ceil(Number(count) / limit);
  const pages = [];

  useEffect(() => {
    fetchOrders({ limit, page: 1 }).then((data) => {
      setOrders(data);
      setLoading(false);
      setCount(data.count);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchOrders({ limit, page: currentPage }).then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, [currentPage]);

  useEffect(() => {
    setLoading(true);
    fetchOrders({ limit, page: 1, complete: filter }).then((data) => {
      setOrders(data);
      setLoading(false);
      setCount(data.count);
      setCurrentPage(1);
    });
  }, [filter]);

  //re-render after change status, or delete some order
  useEffect(() => {
    setLoading(true);
    fetchOrders({ limit, page: currentPage, complete: filter }).then((data) => {
      setOrders(data);
      setLoading(false);
      setCount(data.count);
      setCurrentPage(1);
    });
  }, [rerender]);

  const reRender = () => {
    setRerender(!rerender);
  };

  if (loading) {
    return <Spinner animation="grow" />;
  }

  for (let number = 1; number < pageCount + 1; number++) {
    pages.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Container className="d-flex flex-column">
      <div
        className="d-flex flex-column align-items-center mt-3"
        style={{ width: 900, margin: "auto" }}
      >
        <NavBarLink />
      </div>
      <Row>
        <Col
          xs={12}
          className="mt-3 d-flex justify-content-center align-items-center"
        >
          <div className="mr-3">Сортировка: </div>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {filter}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {filter === "Все" ? (
                <Dropdown.Item disabled>Все</Dropdown.Item>
              ) : (
                <Dropdown.Item onClick={() => setFilter("Все")}>
                  Все
                </Dropdown.Item>
              )}
              {filter === "Выполненные" ? (
                <Dropdown.Item disabled>Выполненные</Dropdown.Item>
              ) : (
                <Dropdown.Item onClick={() => setFilter("Выполненные")}>
                  Выполненные
                </Dropdown.Item>
              )}
              {filter === "Не Выполненные" ? (
                <Dropdown.Item disabled>Не Выполненные</Dropdown.Item>
              ) : (
                <Dropdown.Item onClick={() => setFilter("Не Выполненные")}>
                  Не Выполненные
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <ListGroup>
        {orders.rows?.map(
          ({
            id,
            complete,
            mobile,
            /* username, */ 
            createdAt,
            updatedAt,
            userId,
          }) => (
            <OrderItem
              key={id}
              id={id}
              complete={complete}
              /*   username={username} */
              mobile={mobile}
              createdAt={createdAt}
              updatedAt={updatedAt}
              userId={userId}
              reRender={reRender}
            />
          )
        )}
      </ListGroup>
      <Pagination size="sm" className="mt-4 mb-4" style={{ margin: "0 auto" }}>
        {pages}
      </Pagination>
    </Container>
  );
};

export default Orders;
