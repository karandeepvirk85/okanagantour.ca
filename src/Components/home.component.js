import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {RightOutlined} from '@ant-design/icons';
import Slider from '../Components/homeslider.component.js';
import Type from '../Components/type.component.js'
import {cartOverview, priceFormat, getCartTotal, getCart} from '../Common/utiliy.js';
export default class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            cart:getCart()
        }
    }

    // Get Cart Overview
    getCartOverView = () =>{
        let objCart = JSON.parse(this.state.cart);
        var dataList = '';
        if(objCart != null){
            dataList = objCart.map((item, index)=>{
                return (
                    cartOverview(item,index)
                )
            });
        }
        return dataList;
    }
    
    // --> Render
    render(){
        return (
            <>
                <Slider/>
                <div className = "container-fluid">
                    <Row>
                        <Col md={3} className="home-left-container">
                            <div className="cart-container">
                                <h1>Order</h1>
                                {this.getCartOverView()}
                                <div class="cart-total">
                                    <p>Total</p>
                                    <p>{priceFormat(getCartTotal(),true)}</p>
                                </div>
                                <div class="cart-buttons">
                                <Link to = "/cart" class="btn btn-left btn-main">Cart <RightOutlined /></Link>
                                <Link to = "/checkout" class="btn btn-left btn-main">Checkout <RightOutlined /></Link>
                                </div>
                            </div>
                        </Col>
                        <Col md={9}>
                            <Type name="Activities" category="19" count="3" stacks="4"></Type>
                            <Type name="Wine" category="18" count="3" stacks="4"></Type>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}