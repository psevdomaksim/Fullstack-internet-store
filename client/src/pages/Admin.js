import React, {useState} from "react";
import { Button, Container } from "react-bootstrap";
import CreateType from "../Modals/TypeModal";
import CreateForm from "../Modals/FormModal";
import CreateProduct from "../Modals/ProductModal";
import CreateUsers from "../Modals/UsersModal";
import { observer } from "mobx-react-lite";
import NavBarLink from "../components/NavBarLink";

const Admin = observer(() =>{
  const [typeVisible, setTypeVisible] = useState(false);

  const [formVisible, setFormVisible] = useState(false);

  const [productVisible, setProductVisible] = useState(false);

  const [userVisible, setUsersVisible] = useState(false);

    return(
        <Container className="d-flex flex-column mt-2">
             <NavBarLink/>
            <Button variant="outline-dark" className="mt-3 p-2" onClick={()=> setTypeVisible(true)}>Добавить тип</Button>
            <Button variant="outline-dark" className="mt-3 p-2" onClick={()=> setFormVisible(true)}>Добавить вид</Button>
            <Button variant="outline-dark" className="mt-3 p-2" onClick={()=> setProductVisible(true)}>Добавить товар</Button>
            <Button variant="outline-dark" className="mt-3 p-2" onClick={()=> setUsersVisible(true)}>Пользователи</Button>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateForm show={formVisible} onHide={() => setFormVisible(false)}/>
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)}/>
            <CreateUsers show={userVisible} onHide={() => setUsersVisible(false)}/>
        </Container>
    ); 

});

export default Admin;