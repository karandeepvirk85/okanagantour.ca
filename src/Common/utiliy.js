import React from "react";
import {Card, Collapse} from 'antd';
import {Container, Row, Col, Carousel} from 'react-bootstrap';
import Spinner from '../Components/spinner.component.js';
import {Link} from 'react-router-dom';
import CartForm from '../Components/cartform.component.js';
import {InfoCircleOutlined} from '@ant-design/icons';
import Information from '../Components/information.component.js';

const {Panel} = Collapse;
const genExtra = () => (
    <InfoCircleOutlined
        onClick={event => {
            event.stopPropagation();
        }}
    />
);

export const uniqueId = () =>{
    return '_' + Math.random().toString(36).substr(2, 9);
}

export const renderHTML = (strString) =>{
    return React.createElement(
        "div", 
        {dangerouslySetInnerHTML: { __html: strString }}
    );
}

export const priceFormat = (strPrice, display=false) =>{
    let floatPrice = parseFloat(strPrice);
    if(display == true){
        floatPrice = '$'+floatPrice.toFixed(2);
    }
    else{
        floatPrice = floatPrice.toFixed(2);
    }
    return floatPrice;
}

export const returnFourStacks  = (item, index) => {
    return(
            <Col className="tour-image" sm={12} md={6} lg={4} xl={3} key={index}>
                <Card title={renderHTML(item.title.rendered)} bordered={false}>
                {typeof item.acf.image_1 != "undefined" && item.acf.image_1 != null && <img src={item.acf.image_1.url} />}
                    <div className="info-tab">
                        <Information
                            location  = {item.acf.location}
                            address   = {item.acf.address}
                            hours     = {item.acf.hours}
                            phone     = {item.acf.phone}
                            email     = {item.acf.email}
                            website   = {item.acf.website}
                        />
                    <Link to={"tour/"+item.slug} className="btn-main btn btn-warning btn-block">Book Tour</Link>
                    </div>
                </Card>
            </Col>
    )
}

export const getSpinner = () =>{
    return (
        <Row>
            <Col className="text-center its-spinner">
                <Spinner/>
            </Col>
        </Row>
    )
}
 
export const returnSingleView = (item) =>{

    return (
        <Row>
            <Col xs={12} sm={12} md={12}>
                <h1 className="text-left post-title">{item.title.rendered}</h1>
                <Row>
                    <Col className="text-center" xs={12} sm={6} md={6}>
                        <div className="cart-area">
                            <p className="price">${item.acf.price} Per Person</p>
                            <p><CartForm title={item.title.rendered} id={item.id} price={item.acf.price}/></p>
                        </div>     
                    </Col>
                    <Col className="text-center" xs={12} sm={6} md={6}>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={item.acf.image_1.url}
                                    alt="First slide"
                                    />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={item.acf.image_2.url}
                                    alt="Third slide"
                                    />
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                    
                    <Col sm={12} md={12}>
                        <div className="tour-content">
                            {item.acf.information}
                        </div>
                    </Col>
            
                    <Col sm={12} md={12}>
                        <Collapse expandIconPosition='left'>
                            <Panel header="What is Included?" key="1" extra={genExtra()}>
                                <div>{item.acf.included}</div>
                            </Panel>
                            
                            <Panel header="What is Excluded?" key="2" extra={genExtra()}>
                                <div>{item.acf.excluded}</div>
                            </Panel>
                            
                            <Panel header="Extra Information" key="3" extra={genExtra()}>
                                <div>{item.acf.extra_information}</div>
                            </Panel>
                            
                            <Panel header="Duration" key="4" extra={genExtra()}>
                                <div>{item.acf.duration}</div>
                            </Panel>

                            <Panel header="Contact information" key="5" extra={genExtra()}>
                                <Information
                                    location  = {item.acf.location}
                                    address   = {item.acf.address}
                                    hours     = {item.acf.hours}
                                    phone     = {item.acf.phone}
                                    email     = {item.acf.email}
                                    website   = {item.acf.website}
                                />
                            </Panel>

                            <Panel header="Cancellation Policy" key="6" extra={genExtra()}>
                                <div>{item.acf.cancellation_policy}</div>
                            </Panel>
                        </Collapse>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
 