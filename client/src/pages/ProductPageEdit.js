import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import NavBarLink from "../components/NavBarLink";
import {
  deleteProduct,
  fetchOneProduct,
  updateProducts,
} from "../http/productAPI";
import { Context } from "../index";
import { ADMIN_ROUTE } from "../utils/consts";

const ProductPageEdit = () => {
  const { product } = useContext(Context);
  const history = useHistory();
  const { id } = useParams();
  const [productCurr, setProductCurr] = useState({});
  const [showMsg, setShowMsg] = useState(false);
  const [msg, setMsg] = useState("");

  const [selectType, setSelectType] = useState({});
  const [selectForm, setSelectForm] = useState({});
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [img, setImg] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [info, setInfo] = useState([]);

  const [isDisabledPutBtn, setDisabledPutBtn] = useState(true);

  const deleteProduct = () => {
    deleteProduct(id).then(() => {
      history.push(ADMIN_ROUTE);
    });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const imgHandler = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.onload = () => {
      setImg(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    setImgFile(e.target.files[0]);
  };

  //info
  const addInfo = () => {
    setInfo([...info, { title: "", description: "", id: Date.now() }]);
  };

  const deleteInfo = (number) => {
    setInfo(info.filter((item) => item.number !== number));
  };

  const changeInfo = (key, value, number) => {
    setInfo(info.map((i) => (i.id === number ? { ...i, [key]: value } : i)));
  };

  const putProduct = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("img", imgFile);
    formData.append("typeId", selectType.id);
    formData.append("formId", selectForm.id);
    formData.append("info", JSON.stringify(info));
    updateProducts(id, formData).then((data) => {
      setShowMsg(true);
      setMsg(data);
      setTimeout(() => setShowMsg(true), 5000);
    });
  };

  const checkInfo = () => {
    let isInfoEmpty = true;
    info.forEach((item) => {
      for (let key in item) {
        if (key === "title" || key === "description") {
          if (!item[key]) {
            isInfoEmpty = false;
          }
        }
      }
    });
    return isInfoEmpty;
  };

  useEffect(() => {
    let checkInfoVal = false;
    if (productCurr.info && productCurr.info.length !== info.length) {
      checkInfoVal = checkInfo();
    }

    if (productCurr && productCurr.type && productCurr.type) {
      if (
        productCurr.type.name !== selectType.name ||
        productCurr.form.name !== selectForm.name ||
        productCurr.name !== name ||
        productCurr.price !== price ||
        checkInfoVal ||
        img
      ) {
        setDisabledPutBtn(false);
      } else {
        setDisabledPutBtn(true);
      }
    }
  }, [name, selectType, selectForm, price, img, info]);

  useEffect(() => {
    fetchOneProduct(id).then((data) => {
      setProductCurr(data);
      setSelectType(data.type);
      setSelectForm(data.form);
      setName(data.name);
      setPrice(data.price);
      setInfo(data.info);
    });
  }, [id]);

  return (
    <Container className="mt-3">
      <NavBarLink />

      <Row className="mt-3">
        <Col xs={12}>
          <Row>
            <Col xs={1} className="d-flex align-items-center">
              №:
            </Col>
            <Col xs={11}>{productCurr.id}</Col>
          </Row>
          {/*type*/}
          <Row>
            <Col xs={1} className="d-flex align-items-center">
              Тип:
            </Col>
            <Col xs={11}>
              <Dropdown className="mt-2">
                <Dropdown.Toggle>
                  {selectType.name || "Выберите тип"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {product.types.map((type) => {
                    return type.name === selectType.name ? (
                      <Dropdown.Item key={type.id} disabled>
                        {type.name}
                      </Dropdown.Item>
                    ) : (
                      <Dropdown.Item
                        key={type.id}
                        onClick={() => setSelectType(type)}
                      >
                        {type.name}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          {/*Form*/}
          <Row>
            <Col xs={1} className="d-flex align-items-center">
              Вид:
            </Col>
            <Col xs={11}>
              <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle>
                  {selectForm.name || "Выберите вид"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {product.forms.map((form) => {
                    return form.name === selectForm.name ? (
                      <Dropdown.Item key={form.id} disabled>
                        {form.name}
                      </Dropdown.Item>
                    ) : (
                      <Dropdown.Item
                        key={form.id}
                        onClick={() => setSelectForm(form)}
                      >
                        {form.name}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          {/*Name*/}
          <Row>
            <Col xs={1} className="d-flex align-items-center">
              Название:
            </Col>
            <Col xs={8}>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col xs={3} className="d-flex align-items-center">
              {name.length === 0 && (
                <b style={{ color: "red" }}>Введите название товара</b>
              )}
            </Col>
          </Row>
          {/*Name*/}
          <Row className="mt-2">
            <Col xs={1} className="d-flex align-items-center">
              Цена:
            </Col>
            <Col xs={8}>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </Col>
            <Col xs={3} className="d-flex align-items-center">
              {price === 0 && (
                <b style={{ color: "red" }}>Введите цену</b>
              )}
            </Col>
          </Row>

          {/*Name*/}
          <Row className="mt-4">
            <Col
              xs={3}
              className="d-flex flex-column justify-content-center text-center"
            >
              Текущее изображение: <br />
              <Image
                style={{ margin: "0 auto", marginTop: 15 }}
                width={150}
                src={
                  process.env.REACT_APP_API_URL ||
                  "http://localhost:4200/" + productCurr.img
                }
              />
            </Col>
            {img && (
              <Col
                xs={6}
                className="d-flex flex-column justify-content-center text-center"
              >
                Новое: <br />
                <Image
                  style={{ margin: "0 auto", marginTop: 15 }}
                  width={150}
                  src={img}
                />
              </Col>
            )}
            <Col xs={3} className="d-flex align-items-center">
              <Form.Control
                className="mt-4 mb-2"
                type="file"
                onChange={imgHandler}
              />
            </Col>
          </Row>

          {/*Characteristics*/}
          <Row className="d-flex flex-column m-3">
            <h4>Описание</h4>
            <Button variant="outline-dark" onClick={() => addInfo()}>
              Добавить новую характеристику
            </Button>
            {info.map((item, index) => (
              <Row key={index} className="mt-3">
                <Col md={4}>
                  <Form.Control
                    placeholder="Введите заголовок..."
                    value={item.title}
                    onChange={(e) =>
                      changeInfo("title", e.target.value, item.id)
                    }
                  />
                  {!info[index].title && (
                    <b style={{ color: "red" }}>Введите заголовок</b>
                  )}
                </Col>
                <Col md={4}>
                  <Form.Control
                    placeholder="Введите описание..."
                    value={item.description}
                    onChange={(e) =>
                      changeInfo("description", e.target.value, item.id)
                    }
                  />
                  {!info[index].description && (
                    <b style={{ color: "red" }}>Введите описание</b>
                  )}
                </Col>
                <Col md={4}>
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteInfo(item.number)}
                  >
                    Удалить
                  </Button>
                </Col>
              </Row>
            ))}
          </Row>

          <Row className="mt-5">
            <Col xs={2}>
              {isDisabledPutBtn ? (
                <Button disabled>Обновить</Button>
              ) : (
                <Button onClick={putProduct}>Обновить</Button>
              )}
              {/*  <Button className="ml-5" variant="danger" onClick={handleShow}>Delete product</Button> */}
            </Col>
            <Col xs={10}>
            {showMsg && <Row>{msg}</Row>}
            </Col>
           
          </Row>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete this product {productCurr.id}?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={deleteProduct}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductPageEdit;
