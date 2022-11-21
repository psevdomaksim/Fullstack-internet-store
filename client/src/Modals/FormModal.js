import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Modal, Form, Table, Dropdown } from "react-bootstrap";
import { createForm, deleteForm, fetchForms } from "../http/productAPI";
import { Context } from "../index";
import "bootstrap-icons/font/bootstrap-icons.css";

const CreateForm = observer(({ show, onHide }) => {
  const [value, setValue] = useState("");
  const { product, setProduct } = useContext(Context);

  const rerenderForms = () => {
    fetchForms().then(data => product.setForms(data))     
  };

  const addForm = () => {
    if (product.selectedType.id !== 0) {
      createForm({ name: value, typeFormId: product.selectedType.id }).then(
        (data) => {
          setValue("");
          fetchForms().then(data => product.setForms(data))
        }
      );
    } else {
      alert("Выберите тип");
    }
  };

  const removeForm = (id) => {
    const confirm = window.confirm("Ты действительно хочешь удалить?");
    if (confirm) {
      deleteForm(`/${id}`).then((data) => {});
      fetchForms().then(data => product.setForms(data))
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новый вид
        </Modal.Title>
        <Button className="ms-4" variant="secondary" onClick={rerenderForms}>
          Обновить
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"Введите название вида"}
          />
        </Form>
        <Dropdown className="mt-2 mb-2">
          <Dropdown.Toggle>
            {product.selectedType.name || "Выберите тип"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {product.types.map((type) => (
              <Dropdown.Item
                onClick={() => product.setSelectedType(type)}
                key={type.id}
              >
                {type.name}
                {console.log}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addForm}>
          Добавить
        </Button>
      </Modal.Footer>

      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Удалить вид
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          {product.types.map((type) => (
            <>
             
                  <thead>
                    <tr>
                      <th>Тип</th>
                      <th> Название</th>
                      <th></th>
                    </tr>
                  </thead>
                  {product.forms.map((form) => 
                form.typeFormId===type.id  ?
                <>
                  <tbody key={form.id}>
                    <tr>
                      <td>{type.name}</td>
                      <td>{form.name}</td>

                      <td
                        className="bi bi-trash3-fill m-auto"
                        onClick={() => removeForm(form.id)}
                      ></td>
                    </tr>
                  </tbody>
                </>
                :
               <> </>
              )}
            </>
))}
        </Table>
      </Modal.Body>
    </Modal>
  );
});

export default CreateForm;
