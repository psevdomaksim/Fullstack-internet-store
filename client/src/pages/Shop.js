import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Context } from "..";
import NavBarLink from "../components/NavBarLink";
import Pages from "../components/Pages";
import ProductList from "../components/ProductList";
import "../index.css";
import TypeBar from "../components/TypeBar";
import { fetchForms, fetchProducts, fetchTypes } from "../http/productAPI";
import "../index";
const Shop = observer(() => {
  const { product } = useContext(Context);

  useEffect(() => {
    
    fetchTypes().then(data => product.setTypes(data))
    fetchForms().then(data => product.setForms(data))

    fetchProducts(null, null, 1, 6).then(data => {
       product.setProducts(data.rows)
       product.setTotalCount(data.count)
    })
}, [])

useEffect(() => {
  //console.log(JSON.stringify({...product}));
  fetchProducts( product.selectedForm.id, product.page, 6).then(data => {
      product.setProducts(data.rows)
      product.setTotalCount(data.count)
  })
}, [product.page, product.selectedForm,])

  return (
    <Row style={{margin:0}}>
      <Col xs={2}>
        <TypeBar />
      </Col>
      <Col xs={10}>
        <NavBarLink/>
        <ProductList />
        <Pages/>
      </Col>

    </Row>
  );
});

export default Shop;
