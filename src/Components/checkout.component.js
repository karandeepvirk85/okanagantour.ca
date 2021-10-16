import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Cards from "react-credit-cards";
import { Input, Alert } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import "react-credit-cards/es/styles-compiled.css";
import { priceFormat, getCartTotal } from "../Common/utiliy.js";

class PaymentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cvc: "",
            expiry: "",
            focus: "",
            name: "",
            number: "",
            pay: getCartTotal(),
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    };
    render() {
        if (this.state.pay == 0) {
            return (
                <Container className="checkout">
                    <Row>
                        <Col>
                            <h1>CHECKOUT Now</h1>
                            <Alert
                                message="Informational Notes"
                                description="Please add some items in the cart before checkout"
                                type="info"
                                showIcon
                            />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md={6}>
                            <Link
                                to="/wine"
                                class="btn-block btn btn-left btn-main"
                            >
                                <LeftOutlined /> Wine Tours
                            </Link>
                        </Col>
                        <Col md={6}>
                            <Link
                                to="/activities"
                                class="btn-block btn btn-left btn-main"
                            >
                                <LeftOutlined /> Activity Tours
                            </Link>
                        </Col>
                    </Row>
                </Container>
            );
        } else {
            return (
                <Container className="checkout">
                    <h1>CHECKOUT</h1>
                    <h2></h2>
                    <div id="PaymentForm">
                        <Row>
                            <Col>
                                <Cards
                                    cvc={this.state.cvc}
                                    expiry={this.state.expiry}
                                    focused={this.state.focus}
                                    name={this.state.name}
                                    number={this.state.number}
                                />
                                <br />
                                <form>
                                    <h2>
                                        <span>Pay </span>
                                        {priceFormat(this.state.pay, true)}{" "}
                                        <span>To Checkout</span>
                                    </h2>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <p>
                                                <Input
                                                    name="name"
                                                    type="text"
                                                    placeholder="Enter Your Name"
                                                    onChange={
                                                        this.handleInputChange
                                                    }
                                                    onFocus={
                                                        this.handleInputFocus
                                                    }
                                                />
                                            </p>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <p>
                                                <Input
                                                    name="email"
                                                    type="email"
                                                    placeholder="Enter Your Email"
                                                    onChange={
                                                        this.handleInputChange
                                                    }
                                                    onFocus={
                                                        this.handleInputFocus
                                                    }
                                                />
                                            </p>
                                        </Col>
                                        <Col xs={12} md={12}>
                                            <p>
                                                <Input
                                                    name="number"
                                                    type="tel"
                                                    placeholder="Enter Credit Card"
                                                    onChange={
                                                        this.handleInputChange
                                                    }
                                                    onFocus={
                                                        this.handleInputFocus
                                                    }
                                                />
                                            </p>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <p>
                                                <Input
                                                    name="expiry"
                                                    type="text"
                                                    placeholder="Enter Expiry"
                                                    onChange={
                                                        this.handleInputChange
                                                    }
                                                    onFocus={
                                                        this.handleInputFocus
                                                    }
                                                />
                                            </p>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <p>
                                                <Input
                                                    name="cvc"
                                                    type="text"
                                                    placeholder="CVC"
                                                    onChange={
                                                        this.handleInputChange
                                                    }
                                                    onFocus={
                                                        this.handleInputFocus
                                                    }
                                                />
                                            </p>
                                        </Col>
                                        <Col xs={12} md={12}>
                                            <p>
                                                <button
                                                    type="submit"
                                                    className="btn-main btn btn-warning btn-block"
                                                >
                                                    {" "}
                                                    Click to Pay (
                                                    {priceFormat(
                                                        this.state.pay,
                                                        true
                                                    )}
                                                    )
                                                </button>
                                            </p>
                                        </Col>
                                    </Row>
                                </form>
                            </Col>
                        </Row>
                    </div>
                </Container>
            );
        }
    }
}
export default withRouter(PaymentForm);
