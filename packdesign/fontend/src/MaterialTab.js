import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';

import ImageBlock from './components/ImageBlock'
import UploadComponent from './components/UploadComponent';
import ControlSlider from './components/rc-slider';
import './MaterialTab.css'

import CameraIcon from './icons/camera.png'

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
            layout_res: this.props.model.template_result,
            layout_state:false,
            color_res: this.props.model.color_result,
        }
    }

    handleoOnPreviewImageClick = () => {
        alert('Image click!');
    }

    handleOnUploadSuccess = () => {
        alert('Upload success!');
    }


    render() {
        return (
            <div className='console-material'>
                <div className='material-recommand'>
                    <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-between', alignContent:'center'}}>
                        <span>智能推荐</span>
                    </div>
                    <div className='materials-btns'>
                        <StyleBtn value='动物' textColor='white' backgroundColor='#1d3068' onClick={()=>{}}/>
                        <StyleBtn value='雪花' textColor='white' backgroundColor='#1d3068' onClick={()=>{}} />

                    </div>
                    <div className='recommand-result'>
                        <ImageBlock img={CameraIcon} title='1' prompt='2' onClick={() => {}}/>
                        {this.state.layout_res.map((layout_img, index) => {
                            return <ImageBlock key={index} img={layout_img} title={'布局'+(index+1)} 
                            prompt='点击选择及预览布局' onClick={() => this.handleOnTemplateClick(layout_img)}/>
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
                        <ImageBlock img={CameraIcon} title='1' prompt='2' onClick={() => {}}/>
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