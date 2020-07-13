import React, {Component} from 'react';
import {DatePicker, Select, InputNumber} from 'antd';
import {withRouter } from "react-router-dom";
import {Input} from 'antd';
import {uniqueId} from '../Common/utiliy.js';
const {TextArea} = Input;
const {Option} = Select;
const{RangePicker} = DatePicker;

class CartForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            title:'',
            adults:0,
            child:0,
            total:0,
            pickup:'',
            start_date:'',
            end_date:'',
        }
        this.handleFromSubmit   = this.handleFromSubmit.bind(this);
        this.setDates           = this.setDates.bind(this);
        this.setAdults          = this.setAdults.bind(this);
        this.setChildrens       = this.setChildrens.bind(this);
        this.setPickup          = this.setPickup.bind(this);
    }
    handleFromSubmit(e){
        e.preventDefault();
        let strDescription = 'N/A/E';
        const objForm               = new FormData(e.target);
        const strExtraInformation   = objForm.get('xtra_information');
        const strName               = objForm.get('name');
        if(strExtraInformation.length>0){
            strDescription = strExtraInformation;
        }
        if(this.state.start_date.length===0 || this.state.end_date.length===0 || strName.length===0  || this.state.adults===0){
            alert('Please fill all the fields');
        }else{
            alert(this.props.price);
            let strStartDate  = this.state.start_date;
            let strEndDate    = this.state.end_date;
            let intAdults     = this.state.adults;
            let intChilds     = this.state.child;
            let totalMembers  = this.state.child+this.state.adults;
            let intProductId  = this.props.id;
            let strTitle      = this.props.title;
            let strPickup     = this.state.pickup;
            const objData = {
                key: uniqueId(),
                id: intProductId,
                name:strName,
                title: strTitle,
                start_date: strStartDate,
                end_date: strEndDate,
                adults: intAdults,
                childs: intChilds,
                pickup: strPickup,
                description: strDescription
            }
            this.addToCart(objData);
        }
    }

    addToCart(objData){
        // Lets get cart string first and check if we have saved anything in the local storage
        let cartString = localStorage.getItem('cart');
        // if local storage has something in the cart lets convert it back to array
        if(cartString != null){
            let cartArray = JSON.parse(cartString);
            // Now we have cart array lets push new object to it
            cartArray.push(objData);
            // We have pushed new object lets convert it back to string
            let newCartString = JSON.stringify(cartArray);
            // Now we have new string lets save it back to local storage
            localStorage.setItem('cart',newCartString);
        }else{
            // This means we have null in the localstorage so lets declare empty array
            let cartArray = [];
            // lets push object to empty array
            cartArray.push(objData);
            // We have pushed object to it now lets convert it to string
            let newcartString = JSON.stringify(cartArray);
            // We have string now lets save it to local storage
            localStorage.setItem('cart',newcartString); 
        }
        this.props.history.push('/cart');
    }

    setDates(value) {
        if(value[0] != null){
            if(typeof value[0]._d != 'undefined'){
                let startDate = value[0]._d;
                this.setState({start_date:startDate});
            }
        }
        if(value[1] != null){
            if(typeof value[1]._d != 'undefined'){
                let endDate = value[1]._d;
                this.setState({end_date:endDate});
            }
        }
    }

    setAdults(value) {
        if(value != null){
            if(typeof value != 'undefined'){
                this.setState({adults:value});
            }
        }
    }

    setChildrens(value) {
        if(value != null){
            if(typeof value != 'undefined'){
                this.setState({child:value});
            }
        }
    }
    
    setPickup(value) {
        if(value != null){
            if(typeof value != 'undefined'){
                this.setState({pickup:value});
            }
        }
    }

    render(){
        return(
            <form method="post" id="cart-form" onSubmit={this.handleFromSubmit}>
                <p>
                    <Input name="name" placeholder="Name" />
                </p>

                <p>
                    <RangePicker
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm"
                        onOk={this.setDates}
                    />
                </p>

                <p>
                    Adults:
                    <InputNumber
                        name ="adults" 
                        min={0} 
                        max={10} 
                        defaultValue={0} 
                        onChange = {this.setAdults}
                    />
                </p>
                <p>
                    <span>Childrens: </span>
                    <InputNumber
                        name ="children" 
                        min={0} 
                        max={10} 
                        defaultValue={0} 
                        onChange = {this.setChildrens}
                    />
                </p>
                <p>
                    <Select
                        name  = "pickup"
                        onChange = {this.setPickup}
                        placeholder="Do you require pickup?"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                        <Option value="Yes">Yes</Option>
                        <Option value="No">No</Option>
                    </Select>
                </p>
                <TextArea name="xtra_information" rows={4} placeholder="Please tell us if you have any additonal information such as pickup location, any allergy, wheelchair etc" />
                <button type="submit" class="btn-main btn btn-primary">Add To Cart</button>
            </form>
        )
    }
}
export default withRouter(CartForm);