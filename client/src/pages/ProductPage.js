import { observer } from "mobx-react-lite";
import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  Container,
  Image,
  Row,
  Col,
  Button,
  Form,
  Nav,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { NavLink, useHistory,useLocation, useParams } from "react-router-dom";
import { Context } from "..";
import { addProductToBasket, deleteProduct } from "../http/productAPI";
import TypeBar from "../components/TypeBar";
import { fetchOneProduct, fetchProducts } from "../http/productAPI";
import EditProduct from "../Modals/ProductEditModal";
import { LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE, PRODUCT_EDIT_ROUTE } from "../utils/consts";
import "../index.css";
import NavBarLink from "../components/NavBarLink";

const ProductPage = observer(() => {
  const [product, setProduct] = useState({ info: [] });
  const { user, basket } = useContext(Context);
  const [productEditVisible, setProductEditVisible] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
  useEffect(() => {
    fetchOneProduct(id).then((data) => setProduct(data));
  }, []);


  const isProductInBasket = () => {
    const findProduct = basket.Basket.findIndex(item => Number(item.id) === Number(product.id));
    return findProduct < 0;
}

const addProductInBasket = (product) => {
    if(user.isAuth) {
      addProductToBasket(product).then(() => basket.setBasket(product, true))
    } else {
        basket.setBasket(product);
    }
}


  const removeProduct = (id) => {
    const confirm = window.confirm("Ты действительно хочешь удалить?");
    if (confirm) {
      deleteProduct(`/${id}`)
        .then((data) => {})
        .then(() => {
          alert("Товар успешно удален");
        })
        .catch((err) => alert(err));
    }
  };

  return (
    <Row style={{ width: "100%" }}>
      <Col xs={2}>
        <TypeBar />
      </Col>

      <Col xs={10}>
      
        <Container>
        <NavBarLink/>
          <Col className="d-flex" border={"light"}>
            <Image
              className="mt-3 mr-2"
              height={350}
              src={"http://localhost:4200/" + product.img}
              style={{width: "100%", maxWidth: 400, objectFit: "cover"}}
            />
            <Card border="white" className="ml-2 mt-3" style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>
                  <Row>
                    <Col xs={8}>
                      <h4 className="d-flex mx-auto mt-2">{product.name}</h4>
                    </Col>

                    <Col xs={4}>
                      {user.role === "ADMIN"? (
                        <Button
                          className="mt-3"
                          variant="outline-danger"
                          onClick={() => removeProduct(product.id)}
                        >
                          Удалить товар
                        </Button>
                      ) : (
                        <></>
                      )}
                    </Col>
                  </Row>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <div className="d-flex">
                {/*     {product.rating} */}
                    <div className="bi bi-star-fill"></div>
                  </div>
                </Card.Subtitle>
                <Card.Text>
                  {" "}
                  {product.info.map((info, index) => (
                    <Row
                      key={info.id}
                      style={{
                        padding: 10,
                      }}
                    >
                      <h4>{info.title}</h4>
                      <p> {info.description}</p>
                    </Row>
                  ))}
                </Card.Text>
                <Row className="mt-2">
                  <Card.Subtitle className="mb-2 text-muted">
                    Количество
                  </Card.Subtitle>
                  <Col>
                    <Form.Select>
                      <option>{100}</option>
                      <option value="1">50</option>
                      <option value="2">25</option>
                    </Form.Select>
                  </Col>

                  <Col className="m-auto">
                    <Button className="align-self-end" variant="dark" disabled>
                      {product.price + " руб."}
                    </Button>
                  </Col>
                  <Col>
                  
                  {user.role === "ADMIN"? (
                      <>
                     <Button className="align-self-end" variant="secondary" onClick={()=> history.push(PRODUCT_EDIT_ROUTE + "/" + product.id)}>
                      Изменить товар
                      </Button>
                      </>
                    ) : (
                      <>
                     
                       { isProductInBasket() ?
                        <Button className="align-self-end" variant="secondary" onClick={()=> addProductInBasket(product)}>
                        Добавить в корзину
                      </Button>
                      :
                      <Button variant="outline-dark" disabled>Товар уже в корзине</Button>}
                        
                                     
                    
                                  
                       
                  </>                     
             )}
               {/*      {user.role === "ADMIN"? (
                      <>
                     <Button className="align-self-end" variant="secondary" onClick={()=> history.push(PRODUCT_EDIT_ROUTE + "/" + product.id)}>
                      Изменить товар
                      </Button>
                      </>
                    ) : (
                      <>
                      {user.role === "USER"? (
                        isProductInBasket() ?
                        <Button className="align-self-end" variant="secondary" onClick={()=> addProductInBasket(product)}>
                        Добавить в корзину
                      </Button>
                      :
                      <Button variant="outline-dark" disabled>Товар уже к корзине</Button>
                        
                      ): 
                      
                    
                      (
                        <OverlayTrigger  
                        key="top"
                        placement="top"  
                        overlay={
                          <Tooltip id={`tooltip-top`}>
                           <i>Авторизируйтесь для добавления товара в корзину</i>
                          </Tooltip>
                        }>
                        
                        <Button className="align-self-end" variant="secondary" onClick={()=> history.push(LOGIN_ROUTE)}>
                          Авторизоваться
                        </Button>
                      </OverlayTrigger>
                    
                      )                  
                      } 
                  </>                     
             )} */}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </Col>
    </Row>
  );
});

export default ProductPage;
