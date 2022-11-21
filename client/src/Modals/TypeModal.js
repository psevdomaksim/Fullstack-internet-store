import React, { useContext, useState } from "react";
import { Button, Dropdown, DropdownButton, Form, Modal,Table } from "react-bootstrap";
import { createType, fetchForms, fetchTypes } from "../http/productAPI";
import { Context } from "../index";
import "bootstrap-icons/font/bootstrap-icons.css";
import { deleteType } from "../http/productAPI";
import { observer } from "mobx-react-lite";
const CreateType = observer(({ show, onHide }) => {
  const [value, setValue] = useState('');
  const { product, setProduct } = useContext(Context);

 /*  useEffect(() => {
    fetchTypes().then(data => product.setTypes(data))
    fetchForms().then(data => product.setForms(data))
}, []) */

  
const rerenderTypes = () => {
  fetchTypes().then(data => product.setTypes(data))     
};

  const addType = () => {
    createType({ name: value }).then((data) => {
      setValue('');
      fetchTypes().then(data => product.setTypes(data))     
    });
  };
  
  const removeType = (id) => {
    const confirm = window.confirm("Ты действительно хочешь удалить?");
    if (confirm) {
      deleteType(`/${id}`).then((data) => {
      });
      fetchTypes().then(data => product.setTypes(data))
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новый тип
        </Modal.Title>
        <Button className="ms-4" variant="secondary" onClick={rerenderTypes}>
          Обновить
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"Введите название типа"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addType}>
          Добавить
        </Button>
      </Modal.Footer>

      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         Удалить тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Table striped bordered hover>
          <thead>
            <tr>          
              <th> Название</th>
              <th></th>
            </tr>
          </thead>
          {product.types.map(type=> (
            <tbody key={type.id}>
              <tr>
                <td>{type.name}</td>
        
                <td
                  className="bi bi-trash3-fill m-auto"
                  onClick={() => removeType(type.id)}
                ></td>
              </tr>
            </tbody>
          ))}
        </Table>
      </Modal.Body>
    </Modal>
  );
});

export default CreateType;
