import React, {Component} from 'react';
import {Table, message} from 'antd';
import {Link} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import {DeleteOutlined, LeftOutlined, RightOutlined} from '@ant-design/icons';
import {priceFormat, getCartTotal, getCart} from '../Common/utiliy.js';

// All Posts
export default class Cart extends Component{
    constructor(props){        
        super(props);
        this.state = {
            remmoved:false,
            columns:[
                {title: 'Tour', dataIndex: 'title', key: 'title'},
                {title: 'Adults', dataIndex: 'adults', key: 'adults'},
                {title: 'Children', dataIndex: 'childs', key: 'childs'},
                {title: 'Total', dataIndex: 'total_member', key: 'total_member'},
                {title: 'Name', dataIndex: 'name', key: 'name'},
                {title: 'Price', dataIndex: 'price_string', key: 'price_string'}, 
                {
                    title: 'Action',
                    dataIndex: '',
                    key: 'x',
                    render: (record) => <a data-remove={record.key} onClick={this.removeProduct}><DeleteOutlined /></a>,
                },
            ],
            cartData:getCart(),
            cartTotal:getCartTotal()
        }
        this.removeProduct = this.removeProduct.bind(this);
    }
    
    removeProduct = (e) =>{
        const strProductId = e.currentTarget.getAttribute('data-remove');
        const items = JSON.parse(this.state.cartData);
        items.map((item, index) => {
            if(item.key === strProductId){
                items.splice(index, 1);
            }
        });
        localStorage.setItem('cart', JSON.stringify(items));
        this.setState({cartData: getCart()});
        this.setState({cartTotal: getCartTotal()});
        message.success('Item is removed from cart');
    }

    render(){
        return(
            <Container className="cart-page">
                <h1>CART</h1>
                <Table
                    columns={this.state.columns}
                    expandable={{
                        expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                        rowExpandable: record => record.description !== 'N/A/E',
                    }}
                    dataSource={JSON.parse(this.state.cartData)}
                />
                <h2 className="text-right"><span>Your Total:</span> {priceFormat(this.state.cartTotal,true)}</h2>
                <Row>
                    <Col md={4}>
                        <Link to = "/wine" class="btn-block btn btn-left btn-main"><LeftOutlined /> Wine Tours</Link>
                    </Col>
                    <Col md={4}>
                        <Link to = "/activity" class="btn-block btn btn-left btn-main"><LeftOutlined /> Activity Tours</Link>
                    </Col>
                    <Col md={4}>
                        <Link to = "/checkout" class="btn-block btn btn-right btn-main">Proceed To Checkout <RightOutlined /></Link>
                    </Col>
                </Row>
            </Container>
        )    
    }
}