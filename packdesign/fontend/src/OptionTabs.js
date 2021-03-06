import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';
import ReactDOM, { render } from 'react-dom';
import './OptionTabs.css';

import Slider from './components/Slider'
import ImageBlock from './components/ImageBlock'
import StyleTab from './tabs/StyleTab'
import LayoutTab from './tabs/LayoutTab';
import MaterialTab from './tabs/MaterialTab';
import PrototypeTab from './tabs/PrototypeTab';
import ShapeTab from './tabs/ShapeTab';

import img from './icons/magic-wand.png'
import StarIcon from './icons/icon-star.png'
import StyleIcon from './icons/icon-style.png'
import TempIcon from './icons/icon-temp.png'
import PicIcon from './icons/icon-pic.png'
import ColorIcon from './icons/icon-color.png'
import PenIcon from './icons/icon-pen.png'


/* ============ Tab Buttons ================= */
class TabBtn extends Component {
    render() {
        return (
            <div className='tab-btn-container' onClick={this.props.onClick}
            style={{backgroundColor:this.props.backgroundColor}} >
                <div className='tab-btn' >
                    <div className='image'>
                        <img src={this.props.icon}/>
                    </div>
                    <div className='text' style={{color:this.props.textColor, cursor:'default'}}>{this.props.value}</div>
                </div>
            </div>
        );
    }
}

/* ============ Tab Contents ================= */
class TabContent extends Component {
    static propTypes = {
        children: PropTypes.instanceOf(Array).isRequired
    }
    
    constructor(props) {
        super(props);

        this.state = {
            activeTab: this.props.children[0].props.tabName,
        };
    }

    handleOnClick = (tabName) => {
        this.setState({
            activeTab: tabName,
        });
    }

    render() {
        const items = this.props.children;
        return (
            <div className='option-operation-row'>
                <div className='option-btns'>
                    {items.map((item, idx)=>{
                        return (
                        <TabBtn 
                        key={idx} 
                        onClick={() => this.handleOnClick(item.props.tabName)} 
                        icon={item.props.icon} 
                        value={item.props.label} 
                        textColor={item.props.textColor}
                        backgroundColor={this.state.activeTab === item.props.tabName?'#162654':'transparent'}/>)
                    })}
                </div>
                <div className='option-console'>
                    {items.map((item, idx)=>{
                        return (<div key={idx} style={{display:this.state.activeTab===item.props.tabName?'':'none'}}>{item.props.children}</div>);
                    })}
                </div>
            </div>
        )
    }
}

class OptionTabs extends Component {
    constructor(props) {
        super(props);
                                                                                                                                                                                                                                                    
    }
    render() {
        return (
            <TabContent>

                <div icon={StarIcon} label='??????' textColor='white' tabName='console-style' >
                    <StyleTab model={this.props.model} onModelChange={this.props.onModelChange}/>
                </div>

                <div icon={TempIcon} label='??????' textColor='white' tabName='console-temp'>
                    <PrototypeTab  model={this.props.model} onModelChange={this.props.onModelChange}/>
                </div>

                <div icon={StyleIcon} label='??????' textColor='white' tabName='console-prototype'>
                    <LayoutTab model={this.props.model} onModelChange={this.props.onModelChange}/>
                </div>

                <div icon={PicIcon} label='??????' textColor='white' tabName='console-material'>
                    <MaterialTab model={this.props.model} onModelChange={this.props.onModelChange}
                    onAddNewImgMaterial={this.props.onAddNewImgMaterial}/>
                </div>

                <div icon={PenIcon} label='??????' textColor='white' tabName='console-shape'>
                    <ShapeTab onAddNewTextMaterial={this.props.onAddNewTextMaterial}/>
                </div>
            </TabContent>
        );
    }
}


export default OptionTabs