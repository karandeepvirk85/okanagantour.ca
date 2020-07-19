import React, {Component} from "react";
import {Form, Input, Tooltip, Button, Checkbox} from "antd";
import {InfoCircleOutlined, UserOutlined, LockOutlined} from '@ant-design/icons';
import {Container, Row, Col}  from "react-bootstrap";

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not validate email!',
    }
}
export default class Login extends Component{
    
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
            <h1>LOGIN</h1>
            <Row>
                <Col md={12}>
                    <Form name="basic" initialValues={{remember: true}} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed} validateMessages={validateMessages}>
                        <Form.Item label="Email" name={['user', 'email']} rules={[{required: true, type:"email"}]}>
                            <Input
                                placeholder="Enter your email"
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                suffix={
                                    <Tooltip title="Enter your registered email with us">
                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }
                            />
                        </Form.Item>

                        <Form.Item label="Password" name="password" rules={[{required: true, message: "Please input your password!"}]}>
                            <Input.Password
                                placeholder="Enter your password"
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                            />
                        </Form.Item>
                    
                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Button className="btn btn-main btn-block btn-login btn-lg" type="primary" htmlType="submit">Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
        )
    }
}