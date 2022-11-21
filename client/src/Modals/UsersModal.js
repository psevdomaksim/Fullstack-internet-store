import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Form,
  Modal,
  Row,
  Table,
  Toast,
  Col,
  Card,
  ToastContainer,
  Accordion,
} from "react-bootstrap";
import { useHistory, useRouteMatch } from "react-router-dom";
import { createType } from "../http/productAPI";
import { deleteUser, fetchUsers, fetchOneUser } from "../http/userAPI";
import { Context } from "../index";
import "bootstrap-icons/font/bootstrap-icons.css";
import { observer } from "mobx-react-lite";
import { REGISTRATION_ROUTE } from "../utils/consts";
import { registration } from "../http/userAPI";

const CreateUsers = observer(({ show, onHide }) => {
  const [value, setValue] = useState("");
  const { user } = useContext(Context);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [filteredUsers,setFilteredUsers] = useState(user);

  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(true);

  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);
  /*  const jwt = require("jsonwebtoken");
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET_KEY || "total"); */

  useEffect(() => {
    fetchUsers().then((data) => user.setUsers(data));
  }, []);

  const removeUser = (id, role) => {
    if (user.role !== role) {
      const confirm = window.confirm("Ты действительно хочешь удалить?");
      if (confirm) {
        deleteUser(`/${id}`).then((data) => {});
      }
    } else {
      alert("Вы не можете удалить пользователя с данной ролью");
    }
  };

  const addUser = async () => {
    try {
      let data;
      data = await registration(email, password);
      alert("Пользователь успешно добавлен");
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const handleSearch = (event) => {
      let value = event.target.value.toLowerCase();
      let result = [];
      console.log(value);
      result = user.filter((data) => {
      return data.email.search(value);
      });
      setFilteredUsers(result);
    }

console.log(email)
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Пользователи
        </Modal.Title>
      
      </Modal.Header>
      <Modal.Body>
      <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Найти пользователя</Form.Label>
            <Form.Control placeholder="Введите email" onChange={(event) =>handleSearch(event)} value = {email} />
            
          </Form.Group>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>№</th>
              <th>Email</th>

              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          {user.users.map((user) => (
            <tbody key={user.id}>
              <tr>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td
                  className="bi bi-trash3-fill m-auto"
                  onClick={() => removeUser(user.id, user.role)}
                ></td>
              </tr>
            </tbody>
          ))}
        </Table>
      </Modal.Body>
      <Accordion defaultActiveKey="1" className="mx-3 mb-3">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Добавить пользователя</Accordion.Header>
          <Accordion.Body>
            <Form className="d-flex flex-column">
              <Form.Control
                className="mt-2"
                placeholder="Введите логин или email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control
                className="mt-2"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />

              <Row className="d-flex justify-content-between mt-3 pr-3 pl-3">
                <Button
                  className="mt-2 align-self-start"
                  variant={"outline-success"}
                  onClick={addUser}
                >
                  {"Добавить"}
                </Button>
              </Row>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Modal>
  );
});

export default CreateUsers;
