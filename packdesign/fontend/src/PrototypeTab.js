import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';

import "./PrototypeTab.css"
import ImageBlock from './components/ImageBlock';

/* ============ Style Buttons ================= */
class StyleBtn extends Component {
    render() {
        return (
            <div className='prototypes-btn-container' onClick={this.props.onClick}
            style={{backgroundColor:this.props.backgroundColor}} >
                <div className='prototypes-btn' >
                    <div className='text' style={{color:this.props.textColor, cursor:'default'}}>
                        {this.props.value}</div>
                </div>
            </div>
        );
    }
}

class PrototypeTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            prototypes_types: this.props.model.prototypes_types,
            selected_index: 0,
            prototypes_names: this.props.model.prototypes_names,
            prototypes_urls: this.getProtoypesUrls(0),
            used_urls:[],
        }

    }

    getProtoypesUrls = (index) => {
        let selected_urls = [];
        for(let i = this.props.model.prototypes_nums[index]; i < this.props.model.prototypes_nums[index + 1]; ++i) {
            selected_urls.push(this.props.model.prototypes_urls[i]);
        }
        return selected_urls
    }

    handleOnSelectedNewPrototypes= (index) => {
        if(index >= 0 && index < this.props.model.prototypes_types) {
            this.setState({
                selected_index: index,
                prototypes_urls: this.getProtoypesUrls(index),
            });
        }
    }


    render() {
        return (
            <div className='console-prototypes'>    
                <div className='prototypes-btns'>
                    {this.state.prototypes_names.map((name, index) => {
                        return <StyleBtn key={index} value={name} textColor='white' backgroundColor='#1d3068'
                        onClick={() => this.handleOnSelectedNewPrototypes(index)}/>
                    })}
                </div>
                <div className='prototypes-list'>
                { this.state.prototypes_urls.map((prototype, index) => {
                    return (
                        <div key={index} style={{margin:'5px'}}>
                            <ImageBlock  img={prototype}
                            title={'样机'+(index+1)} prompt='test' height='140px' width='140px'/>
                        </div>
                    );
                })}
                </div>
            </div>
        );
    }
}

export default PrototypeTab;