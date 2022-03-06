import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';

import ImageBlock from '../components/ImageBlock'
import UploadComponent from '../components/UploadComponent';
import ControlSlider from '../components/rc-slider';
import './MaterialTab.css'

import CameraIcon from '../icons/camera.png'

/* ============ Style Buttons ================= */
class StyleBtn extends Component {
    render() {
        return (
            <div className='materials-btn-container' onClick={this.props.onClick}
            style={{backgroundColor:this.props.backgroundColor}} >
                <div className='materials-btn' >
                    <div className='text' style={{color:this.props.textColor, cursor:'default'}}>
                        {this.props.value}</div>
                </div>
            </div>
        );
    }
}


class MaterialTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            materials_types: this.props.model.materials_types,
            selected_index: 0,
            materials_names: this.props.model.materials_names,
            materials_urls: this.getMaterialsUrls(0),
            used_urls:[],
        }

    }

    getMaterialsUrls = (index) => {
        let selected_urls = [];
        for(let i = this.props.model.materials_nums[index]; i < this.props.model.materials_nums[index + 1]; ++i) {
            selected_urls.push(this.props.model.materials_urls[i]);
        }
        return selected_urls
    }

    handleoOnPreviewImageClick = () => {
        alert('Image click!');
    }

    handleOnUploadSuccess = () => {
        alert('Upload success!');
    }

    handleOnSelectedNewMaterials = (index) => {
        if(index >= 0 && index < this.props.model.materials_types) {
            this.setState({
                selected_index: index,
                materials_urls: this.getMaterialsUrls(index),
            });
        }
    }

    handleOnMaterialsClick = (material) => {
        let history = this.state.used_urls;
        let new_records = [];
        new_records.push(material);
        let max_history = 4;
        for(let i = 0; i < history.length && i < max_history - 1; ++i) {
            new_records.push(history[i]);
        }

        this.setState({
            used_urls: new_records,
        })

        this.props.onAddNewImgMaterial(material);
    }


    render() {
        return (
            <div className='console-material'>
                <div className='material-recommand'>
                    <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-between', alignContent:'center'}}>
                        <span>智能推荐</span>
                    </div>
                    <div className='materials-btns'>
                        {this.state.materials_names.map((name, index) => {
                            return <StyleBtn key={index} value={name} textColor='white' backgroundColor='#1d3068'
                            onClick={() => this.handleOnSelectedNewMaterials(index)}/>
                        })}
                    </div>
                    <div className='recommand-result'>
                        {this.state.materials_urls.map((materials, index) => {
                            return <ImageBlock key={index} img={materials} title={'素材'+(index+1)} 
                            prompt='推荐素材' onClick={() => this.handleOnMaterialsClick(materials)}/>
                        })}
                    </div>
                </div>

                <div style={{width:'100%',
                            height:'1px',
                            backgroundColor:'rgba(255,255,255,0.3)',
                            margin:"0px 0px 10px 0px"}}></div>

                <div className='material-used'>
                    <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-between', alignContent:'center'}}>
                        <span>最近使用</span>
                    </div>
                    <div className='used-result'>
                    {this.state.used_urls.map((materials, index) => {
                            return <ImageBlock key={index} img={materials} title={'最近使用'+(index+1)} 
                            prompt='最近使用素材' onClick={() => {}}/>
                        })}
                    </div>
                </div>

                <div style={{width:'100%',
                            height:'1px',
                            backgroundColor:'rgba(255,255,255,0.3)',
                            margin:"0px 0px 10px 0px"}}></div>
                
                <div className='material-edit'>
                    <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-between', alignContent:'center'}}>
                        <span>编辑素材</span>
                    </div>
                    <div className='edit-options'>
                        
                        <div className='edit-option'> 
                            <ControlSlider min={0} max={100} color='white' title='透明' 
                            percentage={true}  handleChangeValue={this.handleChange_G}/>
                        </div>

                    </div>
                </div>

                <div style={{width:'100%',
                            height:'1px',
                            backgroundColor:'rgba(255,255,255,0.3)',
                            margin:"0px 0px 10px 0px"}}></div>

                <div className='material-upload'>
                    <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-between', alignContent:'center'}}>
                        <span>自定义素材</span>
                    </div>
                    <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                        <UploadComponent icon={CameraIcon} text='自定义素材图标' width='80%' 
                        height='80px' borderWidth='2px' borderStyle='dashed' textColor='white'
                        onPreviewImageClick={this.handleoOnPreviewImageClick} uploadUrl='/upload' 
                        preview={true} onUploadSuccess={this.handleOnUploadSuccess}/>
                    </div>

                </div>
            </div>
        );
    }
}

export default MaterialTab;