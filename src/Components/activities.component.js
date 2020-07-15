import React, {Component} from 'react';
import Type from '../Components/type.component.js';
// All Posts
export default class Wine extends Component{
    render(){
        return(
            <div className = "type-container"> 
                <Type name="Activities" category="19" count="100"></Type>
            </div>
        )
    }
}