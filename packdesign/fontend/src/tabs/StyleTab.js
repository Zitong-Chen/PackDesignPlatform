import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';

// import Slider, {Range} from 'rc-slider'
// import 'rc-slider/assets/index.css';

import ControlSlider from '../components/rc-slider';

import ImageBlock from '../components/ImageBlock';
import UploadComponent from '../components/UploadComponent';
import './StyleTab.css'

import CameraIcon from '../icons/camera.png'
import BlackIcon from '../icons/black.jpg'


// import styled from 'styled-components';

/* ============ Style Buttons ================= */
class StyleBtn extends Component {
    render() {
        return (
            <div className='style-btn-container' onClick={this.props.onClick}
            style={{backgroundColor:this.props.backgroundColor}} >
                <div className='style-btn' >
                    <div className='text' style={{color:this.props.textColor, cursor:'default'}}>
                        {this.props.value}</div>
                </div>
            </div>
        );
    }
}

class StyleTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: 1,
            style_imgs: [],
            new_color:false,
            R: 0,
            G: 0,
            B: 0,
            color_img: 'static/black.jpg',
            upload_img: CameraIcon,
        };
    }

    generateDesign = style => {
        console.log('Start to generate style imgs...');
        let xhr = new XMLHttpRequest(); 
        xhr.onreadystatechange = () => {
            // 根据服务器的响应内容格式处理响应结果
            if (xhr.readyState === 4 && xhr.status === 200) {
                if(xhr.getResponseHeader('content-type')==='application/json'){
                    var res_imgs = [];
                    let data = JSON.parse(xhr.responseText);
                    let status = data.status;
                    if (status) {
                        let imgs = data.img;
                        let base_dir = data.base_dir;

                        for(let i = 0; i < imgs.length; ++i) {
                            res_imgs.push(base_dir+imgs[i]);
                        }
                        this.setState({
                            style:style,
                            style_imgs:res_imgs,
                        }); 
                    }
                }
            }
            else {
                // console.log(xhr.responseText);
            }
        }
        xhr.open('GET', '/generate/style='+style, true);
        xhr.send(null);   
    }

    generateColorImg = () => {
        console.log('Start to generate single color img...');
        let xhr = new XMLHttpRequest(); 
        let form = new FormData();
        form.append('R', this.state.R);
        form.append('G', this.state.G);
        form.append('B', this.state.B);
        xhr.onreadystatechange = () => {
            // 根据服务器的响应内容格式处理响应结果
            if (xhr.readyState === 4 && xhr.status === 200) {
                if(xhr.getResponseHeader('content-type')==='application/json'){
                    let data = JSON.parse(xhr.responseText);
                    let img = data.img;
                    let base_dir = data.base_dir;

                    this.setState({
                        color_img: base_dir+img,
                    }); 
                }
            }
            else {
                // console.log(xhr.responseText);
            }
        }
        xhr.open('POST', '/single-color', true);
        xhr.send(form);   
        console.log(this.state);
    }

    handleChange_R = (new_R) => {
        console.log("New R:", new_R);
        this.setState({
            R: new_R,
        }, () => {
            console.log("New State:", this.state);
            this.props.model.single_color_R = new_R;
            this.generateColorImg();
        });
    }

    handleChange_G = (new_G) => {
        this.setState({
            G: new_G,
        }, () => {
            this.props.model.single_color_G = new_G;
            this.generateColorImg();
        });
    }

    handleChange_B = (new_B) => {
        this.setState({
            B: new_B,
        }, () => {
            this.props.model.single_color_B = new_B;
            this.generateColorImg();
        });
    }

    onImageClick = (new_img_src) => {
        console.log("New Source:"+new_img_src);
        this.props.model.select_background = new_img_src;
        this.props.model.img_src = new_img_src ;
        this.props.onModelChange();
    }

    handleUploadSuccess = (new_upload_img) => {
        console.log(new_upload_img);
        this.props.model.upload_img_url = new_upload_img;
    }

    render() {
        return (
            <div style={{display:'flex', flexDirection:'column'}} >
                <div className='console-style'>
                    <span style={{color:'white'}}>风格选择</span>
                    <div className='style-btns'>
                        <StyleBtn value='渲染' textColor='white' backgroundColor='#1d3068' onClick={()=>this.generateDesign(1)}/>
                        <StyleBtn value='抽象' textColor='white' backgroundColor='#1d3068' onClick={()=>this.generateDesign(2)} />

                    </div>
                    <div className='style-generate'>
                        <div className='generate-img-block' >
                            {
                            this.state.style_imgs.map((style_img, index) => {
                                return <ImageBlock key={index} img={style_img} title={'生成图片'+(index+1)} 
                                prompt='点击预览效果' onClick={() => this.onImageClick(style_img)}/>
                            })
                            }
                        </div>
                    </div>
                    <div style={{width:'100%',
                    height:'1px',
                    backgroundColor:'rgba(255,255,255,0.3)',
                    marginBottom:"25px"}}></div>
                    <span style={{color:'white'}}>风格细调</span>
                    <div className='style-adjust'>
                        <ControlSlider min={0} max={100} color='white' title='模糊' percentage={true}/>
                        <ControlSlider min={0} max={100} color='white' title='抽象' percentage={true}/>
                        <ControlSlider min={0} max={100} color='white' title='颗粒大小' percentage={true}/>
                        <ControlSlider min={0} max={100} color='white' title='透明' percentage={true}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default StyleTab;