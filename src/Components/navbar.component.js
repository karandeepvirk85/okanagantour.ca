import React,{Component} from 'react';
import{Link} from 'react-router-dom';
import {Navbar, Form , Button, Nav, NavDropdown, FormControl} from 'react-bootstrap';
import logo from '../logo.png'
import {ShoppingCartOutlined, CreditCardOutlined, PhoneOutlined, LoginOutlined, UserAddOutlined} from '@ant-design/icons';
export default class Navigation extends Component{
    render(){
        return(
            <Navbar expand="sm">
                <Navbar.Brand href="/"><img src={logo}></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Link className="nav-link" to="/">              Home                </Link>
                            <NavDropdown title="Tours" id="basic-nav-dropdown">
                                <Link className="nav-link" to="/activities">    Activity Tours          </Link>
                                <Link className="nav-link" to="/wine">          Wine Tours              </Link>
                            </NavDropdown>
                            <Link className="nav-link" to="/cart">          <ShoppingCartOutlined/> Cart </Link>
                            <Link className="nav-link" to="/checkout">      <CreditCardOutlined />  Checkout </Link>
                            <Link className="nav-link" to="/login">         <LoginOutlined />       Login </Link>
                            <Link className="nav-link" to="/register">      <UserAddOutlined />     Register  </Link>
                        </Nav>
                    </Navbar.Collapse>
            </Navbar>
        )
    }
}