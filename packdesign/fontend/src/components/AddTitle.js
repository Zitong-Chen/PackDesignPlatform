import React, {Component, useState} from 'react';

import './AddTitle.css'

class AddTitle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title ? this.props.title : '添加标题',
            fontsize: this.props.fontsize ? this.props.fontsize : '12pt',
        }
    }

    render() {
        return (
            <div className='text-block' 
            style={{width:`${this.props.width}`,
            height:`${this.props.height}`}}
            onClick={this.props.onClick}>
                <span style={{fontSize:`${this.state.fontsize}`}}>{this.state.title}</span>
            </div>
        );
    }
}

export default AddTitle;