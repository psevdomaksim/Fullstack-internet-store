import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Dropdown,
  Col,
  FormControl,
  DropdownButton,
  ButtonGroup,
  Row,
} from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import {
  createForm,
  createProduct,
  fetchForms,
  fetchProducts,
  fetchTypes,
} from "../http/productAPI";
import { Context } from "../index";

const CreateProduct = observer(({ show, onHide }) => {
  const { product } = useContext(Context);
  const [info, setInfo] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchTypes().then((data) => product.setTypes(data));
    fetchForms().then((data) => product.setForms(data));
  }, []);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };
  
  const clearForms = () => {
    setInfo([])
    setName("")
    setPrice(0)
    setFile(null)
    product.setSelectedType(0)
    product.setSelectedForm(0)
    onHide()
  };


  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };
  const addProduct = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("img", file);
    formData.append("formId", product.selectedForm.id);
    formData.append("typeId", product.selectedType.id);
    formData.append("info", JSON.stringify(info));
    createProduct(formData).then((data) => 
    clearForms()
)};

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новый продукт
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Col className="mt-2" style={{ width: "25%" }}>
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
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col className="mt-2" style={{ width: "25%" }}>
            <Dropdown className="mt-2 mb-2">
              <Dropdown.Toggle>
                {product.selectedForm.name || "Выберите вид"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {product.forms.map((form) =>
                  form.typeFormId === product.selectedType.id ? (
                    <Dropdown.Item
                      onClick={() => product.setSelectedForm(form)}
                      key={form.id}
                    >
                      {form.name}
                    </Dropdown.Item>
                  ) : (
                    <div key={form.id}></div>
                  )
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-4 mb-2"
            placeholder="Введите название продукта"
          />
          <Form.Control
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-4 mb-2"
            placeholder="Введите  стоимость продукта"
          />
          <Form.Control
            className="mt-4 mb-2"
            type="file"
            onChange={selectFile}
          />

          <Button variant="outline-success" onClick={addInfo}>
            Добавить описание
          </Button>
          {info.map((i) => (
            <Row className="mt-2" key={i.number}>
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) =>
                    changeInfo("title", e.target.value, i.number)
                  }
                  placeholder="Введите заголовок"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) =>
                    changeInfo("description", e.target.value, i.number)
                  }
                  placeholder="Введите описание"
                />
              </Col>
              <Col md={4}>
                <Button
                  variant="outline-danger"
                  onClick={() => removeInfo(i.number)}
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addProduct}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateProduct;
