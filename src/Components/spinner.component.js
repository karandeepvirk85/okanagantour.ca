import React, {Component} from 'react';
import Loader from 'react-loader-spinner'
export default class Spinner extends Component{
    render(){
        return(
            <Loader
                type="Audio"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={1000} //3 secs
            />
        )
    }
}