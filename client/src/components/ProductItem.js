import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import {
  Row,
  Col,
  Container,
  Card,
  Image,
  Button,
  Form,
} from "react-bootstrap";
import { Context } from "../index";
import NavBar from "./NavBar";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useHistory } from "react-router-dom";
import { PRODUCT_ROUTE } from "../utils/consts";
import "../index.css";
const ProductItem = ({ product }) => {

  const history = useHistory();
  const [countValue, setCountValue]=useState();
  return (
    <Col md={4}>
      <Card
        className="mt-4 shadow_element"
        style={{ width: 302, cusror: "poiner" }}
        border={"light"}
      >
        <div className="d-flex justify-content-between align-items-center" style={{height:50}}>
          <h5 className="m-auto">{product.name} </h5>
         {/*  <div className="d-flex">
          {product.rating} 
            <div className="bi bi-star-fill"></div>
          </div> */}
        </div>

        <Image
          className="mt-2"
          style={{ width: 300, height:225, objectFit: "cover", cursor: "pointer"}}
          src={"http://localhost:4200/" + product.img}
          onClick={() => history.push(PRODUCT_ROUTE + "/" + product.id)}
        />
        <Row className="mt-2">
          <Col>
            <Form.Select>
              <option>{100}</option>
              <option value="1">50</option>
              <option value="2">25</option>
            </Form.Select>
          </Col>

          <Col className="m-auto">
            {" "}
            <p className="m-auto">
              <b>{product.price + " руб."}</b>
            </p>
          </Col>
          <Col>
            <Button className="align-self-end" variant="secondary">
              Купить
            </Button>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default ProductItem;
