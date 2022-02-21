import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';

import "./PrototypeTab.css"
import ImageBlock from './components/ImageBlock';

export class PrototypeTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            prototypes:['','','',''],
        }
    }
    render() {
        return (
            <div className='console-prototypes'>    
                <div className='prototypes-list'>
                { this.state.prototypes.map((prototype, index) => {
                    return (
                        <div style={{margin:'5px'}}>
                            <ImageBlock key={index} img={prototype}
                            title={'样机'+(index+1)} prompt='test' height='100px' width='100px'/>
                        </div>
                    );
                })}
                </div>
            </div>
        );
    }
}