/* import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Form, Table, Dropdown, Col, Row } from "react-bootstrap";
import { createForm, deleteForm, fetchForms, fetchOneProduct, fetchTypes, updateProduct } from "../http/productAPI";
import { Context } from "../index";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useParams } from "react-router-dom";

const EditProduct = observer(({ show, onHide }) => {
  const [value, setValue] = useState("");
  //const [product, setProduct] = useState({ info: [] });


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

  const selectFile = (e) => {
    setFile(e.target.files[0]);
    //console.log(file)
  };
  const changeProduct = () => {
   // console.log(JSON.stringify({...product}));
    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", `${price}`);
    formData.set("img", file);
    formData.set("formId", product.selectedForm.id);
    formData.set("typeId", product.selectedType.id);
    console.log(product.selectedForm.id);
    formData.set("info", JSON.stringify(info));
    updateProduct(formData).then((data) => onHide());
  };


  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Изменить данные товара
        </Modal.Title>
        
      </Modal.Header>

      <Modal.Body>
      <Form>
          <Col className="mt-2" style={{ width: "25%" }}>
           <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{product.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {product.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => product.setSelectedType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col className="mt-2" style={{ width: "25%" }}>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{product.selectedForm.name || "Выберите вид"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {product.forms.map(form =>
                                <Dropdown.Item
                                    onClick={() => product.setSelectedForm(form)}
                                    key={form.id}
                                >
                                    {form.name}
                                </Dropdown.Item>
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
            <Row className="mp-4" key={i.number}>
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
        
        <Button variant="outline-success" onClick={changeProduct}>
          Изменить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default EditProduct;
 */