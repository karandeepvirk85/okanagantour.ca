import React,{Component} from 'react';
import{Link} from 'react-router-dom';
import {Navbar, Form , Button, Nav, NavDropdown, FormControl} from 'react-bootstrap';
import logo from '../logo.png'
import {ShoppingCartOutlined, CreditCardOutlined, PhoneOutlined} from '@ant-design/icons';
export default class Header extends Component{
    render(){
        return(
            <Navbar expand="sm">
                <Navbar.Brand href="/"><img src={logo}></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Link className="nav-link" to="/">              Home                </Link>
                            <Link className="nav-link" to="/wine">          Wine                </Link>
                            <Link className="nav-link" to="/activities">    Activities          </Link>
                            <Link className="nav-link" to="/about">         About               </Link>
                            <Link className="nav-link" to="/contact">       <PhoneOutlined />   </Link>
                            <Link className="nav-link" to="/cart">          <ShoppingCartOutlined/></Link>
                            <Link className="nav-link" to="/checkout">    <CreditCardOutlined /></Link>
                        </Nav>
                    </Navbar.Collapse>
            </Navbar>
        )
    }

}