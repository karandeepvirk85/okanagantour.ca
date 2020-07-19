import React, {Component} from 'react';
import axios from 'axios';
import {Row} from 'react-bootstrap';
import {returnStacks, getSpinner} from "../Common/utiliy.js";
import {Link} from 'react-router-dom';
// All Posts
export default class Type extends Component{
    // Set States , Run defaults If any
    constructor(props){
        super(props);
        this.state = {
            ApiLoading:true,
            objData:[],
            stacks: this.props.stacks,
            category: this.props.category,
            count: this.props.count
        }
    }
    // Default Fb Function Called 
    async componentDidMount(){
        const apiEnd = "https://okanagantour.ca/api/wp-json/wp/v2/posts?categories="+this.state.category+"&per_page="+this.state.count;
        axios.get(apiEnd)
        .then(response => {
            this.setState({ApiLoading:false, objData:response.data})
        })
    }
    
    // Get Posts
    getPosts(){
        const dataList = this.state.objData.map((item, index) => {
            return(
                returnStacks(item,index,this.state.stacks)
            );
        });

        return(
            <div className="home-tiles">
                <div className="tour-title-bar">
                    <h1>{this.props.name} Tours</h1>
                    <Link to = {"/"+this.props.name.toLowerCase()} className="btn btn-main">View All {this.props.name} Tours</Link>
                </div>
                <Row>{dataList}</Row>
            </div>
        );
    }
    
    init(){        
        if(this.state.ApiLoading){
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