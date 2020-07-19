import React, {Component} from "react";
import {Form, Input, Tooltip, Button, Checkbox} from "antd";
import {InfoCircleOutlined, UserOutlined, LockOutlined, MailOutlined} from '@ant-design/icons';
import {Container, Row, Col}  from "react-bootstrap";

const validateMessages = {
    required: 'This is required!',
    types: {
        email: 'Invalid email!',
        password: 'Password is required',
    } 
}

export default class Register extends Component{

    constructor(props){
        super(props);
    }

    onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    }

    onFinish = (values) =>{
        console.log(values);
    }
    render(){
        return(
        <Container className = "login-page">
            <h1>REGISTER</h1>
            <Row>
                <Col md={12}>
                    <Form name="basic" initialValues={{remember: true}} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed} validateMessages={validateMessages}>
                        <Form.Item name="name" rules={[{required: true}]}>
                            <Input
                                placeholder="Enter your Name"
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                suffix={
                                    <Tooltip title="Enter Your First and Last Name">
                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }
                            />
                        </Form.Item>

                        <Form.Item name="email" rules={[{required: true, type:"email"}]}>
                            <Input
                                placeholder="Enter Your Email"
                                prefix={<MailOutlined className="site-form-item-icon" />}
                                suffix={
                                    <Tooltip title="Enter your email to recieve vertification link">
                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }
                            />
                        </Form.Item>

                        <Form.Item name="password" rules={[{required: true}]}>
                            <Input.Password
                                placeholder="Enter your password"
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                            />
                        </Form.Item>
                        <Button className="btn btn-main btn-block btn-login btn-lg" type="primary" htmlType="submit">REGISTER</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
        )
    }
}