import React, {Component} from 'react';
import Type from '../Components/type.component.js';
// All Posts
export default class Wine extends Component{
    render(){
        // Stacks 3 means 4 columns
        return(
            <div className = "container-fluid type-fluid"> 
                <Type name="Wine" category="18" count="100" stacks="3"></Type>
            </div>
        )
    }
}