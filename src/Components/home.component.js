import React, {Component} from 'react';
import Slider from '../Components/homeslider.component.js';
import Type from '../Components/type.component.js'

export default class Home extends Component{ 
    render(){
        return (
            <>
                <Slider/>
                <div className = "home-container">
                    <Type name="Activities" category="19" count="4"></Type>
                    <Type name="Wine" category="18" count="4"></Type>
                </div>
            </>
        )
    }
}