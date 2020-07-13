import React, {Component} from 'react';
import { Table } from 'antd';
import { Container } from 'react-bootstrap';
import {DeleteOutlined} from '@ant-design/icons';
// All Posts
console.log(JSON.parse(localStorage.getItem('cart')));
export default class Cart extends Component{
    constructor(props){
        super(props);
        this.state = {
            remmoved:false,
            columns:[
                {title: 'Tour', dataIndex: 'title', key: 'title'},
                {title: 'Adults', dataIndex: 'adults', key: 'adults'},
                {title: 'Children', dataIndex: 'childs', key: 'childs'},
                {
                    title: 'Action',
                    dataIndex: '',
                    key: 'x',
                    render: (record) => <a data-remove={record.key} onClick={this.removeProduct}><DeleteOutlined /></a>,
                },
            ],
            cartData:localStorage.getItem('cart')
        }
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
        this.setState({cartData: localStorage.getItem('cart')});
    }
    
    render(){
        return(
            <Container>
            <h1>CART</h1>
            <Table
                columns={this.state.columns}
                expandable={{
                    expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                    rowExpandable: record => record.description !== 'N/A/E',
                }}
                dataSource={JSON.parse(this.state.cartData)}
            />
          </Container>
        )    
    }
}