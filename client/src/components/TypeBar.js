import { React, useContext, useEffect } from "react";

import { observer } from "mobx-react-lite";
import {
  Col,
  Container,
  ListGroup,
  Nav,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
  Accordion,
} from "react-bootstrap";

import { Context } from "../index";
import "../index.css";
import { useHistory } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/consts";
import { fetchForms, fetchTypes } from "../http/productAPI";

const TypeBar = observer(() => {
  const history = useHistory();
  const { product, setProduct } = useContext(Context);

/*   useEffect(() => {
    product.setSelectedForm(0)
  }, []); */

  const filterTypeTea = (form) => {
    setProduct(product.filter((product) => product.form === form));
  };
  return (
    <Container style={{ height: "100%" }}>
      <ButtonGroup
        className="col-md-2 d-none d-md-block bg-light sidebar"
        vertical
      >
              {product.types?.map((type) => (
          
          <DropdownButton
            as={ButtonGroup}
            drop="end"
            title={type.name}
            key={type.id}
            onClick={() =>  product.setSelectedType(type)}
            className="rounded me-2"
            id="bg-vertical-dropdown-1"
            variant="light"
          >
            {product.forms?.map((form) => 
           form.typeFormId===product.selectedType.id  ?
                <Dropdown.Item
                  size="lg"
                  className="rounded me-2"
                  style={{ cursor: "pointer" }}
                  key={form.id}
                  onClick={() => product.setSelectedForm(form)} // filterTypeTea
                  variant="light"
                >
                  {form.name}
                </Dropdown.Item>
                :
                <div key={form.id}></div>
           
          )}
          </DropdownButton>
        ))} 
       {/*  {product.types?.map((type) => (
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header
                key={type.id}
                onClick={() => product.setSelectedType(type)}
              >
                {type.name}
              </Accordion.Header>
              <Accordion.Body>
                {product.forms?.map((form) =>
                  form.typeFormId === product.selectedType.id ? (
                    <Dropdown.Item
                      size="lg"
                      className="rounded me-2"
                      style={{ cursor: "pointer" }}
                      key={form.id}
                      onClick={() => product.setSelectedForm(form)}
                      variant="light"
                    >
                      {form.name}
                    </Dropdown.Item>
                  ) : (
                    <></>
                  )
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))} */}
      </ButtonGroup>
    </Container>
  );
});

export default TypeBar;
