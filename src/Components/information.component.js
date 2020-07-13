import React, {Component} from 'react';
import {
    InfoCircleOutlined, 
    PhoneOutlined, 
    ClockCircleOutlined, 
    EnvironmentOutlined, 
    MailOutlined,
    GlobalOutlined
} from '@ant-design/icons';
export default class Information extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="information-content">
                {this.props.location && 
                    <p>{this.props.location}</p>
                }
                {this.props.address && 
                    <p><EnvironmentOutlined /> {this.props.address}</p>
                }
                {this.props.hours && 
                    <p><ClockCircleOutlined /> {this.props.hours}</p>
                }
                {this.props.phone && 
                    <p><PhoneOutlined/> {this.props.phone}</p>
                }
                {this.props.email && 
                    <p><a href={"mailto:"+this.props.email}><MailOutlined /> {this.props.email}</a></p>
                }
                {this.props.website && 
                    <p> <a target="_blank" href={this.props.website}><GlobalOutlined /> {this.props.website}</a></p>
                }
            </div>
        )
    }
}