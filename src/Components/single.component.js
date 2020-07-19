import React, {Component} from 'react';
import axios from 'axios';
import {Container, Row} from 'react-bootstrap';
import {returnSingleView, getSpinner} from "../Common/utiliy.js";

// All Posts
export default class Single extends Component{
    constructor(props){
        super(props);
        this.state = {
            apiLoading:true,
            objData:[]
        }
    }
    
    componentDidMount(){
        const {match:{params}} = this.props;
        var apiEndPost = 'https://okanagantour.ca/api/wp-json/wp/v2/posts?slug='+params.slug;
        axios.get(apiEndPost).then(response => {
            this.setState({apiLoading:false, objData:response.data});
        })
    }

    getPosts(){
        const dataList = this.state.objData.map((item, index) => {
            return(returnSingleView(item));  
        });

        return(
            <Container className="single-view">
                {dataList}
            </Container>
        );
    }
    
    init(){        
        if(this.state.apiLoading){
            return getSpinner();
        }
        if(!this.state.objData){
            return <div>No Data</div>
        }
        return this.getPosts();
    }

    render(){
        return this.init();
    }
}