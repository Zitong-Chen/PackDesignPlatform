import React, {Component, useReducer, useState} from 'react';
import ReactDOM, { render } from 'react-dom';
// import Slider from 'react-native'
import './index.css';
import {VerticalOptionBtn, HorizontalOptionBtn} from './components/OptionBtn'
import ImageContainer from './components/ImageContainer'
import OptionTabs from './OptionTabs'

import MagicIcon from './icons/line-magic.png'
import FolderIcon from './icons/folder.png'
import BoxIcon from './icons/icon-box.png'
import UserModel from './model';

  
function click() {
  alert('click');
}


/* ============ Option Head ================= */
function OptionHead(props) {
  return (
    <div className='option-header'>
      {/* <img src={img} onClick={() => click()} />
      <img src={img} /> */}
      <img src={BoxIcon} style={{marginRight:'5px'}} draggable={false}></img>
      <span>智绘包装</span>
    </div>
  );
}


/* ============ Option Footer ================= */
function OptionFooter(props) {
  return (
    <div className='option-footer'>
      <div className='option-footer-1' style={{cursor:'pointer', width:'50%'}}>
        <HorizontalOptionBtn onClick={click} icon={MagicIcon} value='收藏作品'/>
      </div>
      <div className='option-footer-2' style={{cursor:'pointer', width:'50%'}}>
        <HorizontalOptionBtn onClick={click} icon={FolderIcon} value='打开文件'/>
      </div>
    </div>
  );
}

/* ============ Display Header ================= */
function DisplayHeader(props) {
  return (
    <div className='display-header'>
      {/* <HorizontalOptionBtn onClick={click} icon={img} value='back'/>
      <HorizontalOptionBtn onClick={click} icon={img} value='next'/> */}
      <span style={{color:'lightgray'}}>展示台</span>
    </div>
  );
}

/* ============ Display Container ================= */
class DisplayContainer extends Component {
  componentDidMount() {
    this.props.onRef(this);
  }

  constructor(props) {
    super(props);
    this.state = {
      img_src: null,
    }
  }

  update() {   
    console.log('Start to render img...');
    let xhr = new XMLHttpRequest(); 
    let form = new FormData();
    form.append('image', this.props.model.img_src);
    xhr.onreadystatechange = () => {
        // 根据服务器的响应内容格式处理响应结果
        if (xhr.readyState === 4 && xhr.status === 200) {
            if(xhr.getResponseHeader('content-type')==='application/json'){
                let data = JSON.parse(xhr.responseText);
                let img = data.img[0];
                let base_dir = data.base_dir;
                console.log(base_dir+img)
                this.setState({
                  img_src: base_dir+img,
                });
            }
        }
        else {
            // console.log(xhr.responseText);
        }
    }
    xhr.open('POST', '/render', false);
    xhr.send(form); 
  }

  render() {
    return (
      <div className='display-container' >
          <ImageContainer img={this.state.img_src}/>
      </div>
    );
  }
}

/* ============== Main Page =============== */
class Body extends Component {
  constructor(props) {
    super(props);
  }

  onRef = (ref) => {
    this.child = ref;
  }

  onModelChange = () => {
    this.child.update();
    console.log("Force refresh");
  }
  
  render() {
    return (
      <div className='page'>
        <div className='option-column'>
          <OptionHead />
          <OptionTabs model={this.props.model} onModelChange={this.onModelChange}/>
          <OptionFooter />
        </div>
        <div className='display-column'>
          <DisplayHeader />
          <DisplayContainer model={this.props.model} onRef={this.onRef}/>
        </div>
      </div>

    );
  }
}

const userModel = new UserModel();
// userModel.isExist = true;
userModel.img_src = 'static/black.jpg'

userModel.materials_types = 1;
userModel.materials_names = ["老虎"];
userModel.materials_nums = [0, 4]; // accumulated urls, nums
userModel.materials_urls = ['static/materials/tiger/1.png','static/materials/tiger/2.png',
'static/materials/tiger/3.png','static/materials/tiger/4.png'];

userModel.prototypes_types = 2;
userModel.prototypes_names = ["手提袋","包装盒"];
userModel.prototypes_nums = [0, 6, 7]; // accumulated urls, nums
userModel.prototypes_urls = ['static/prototypes/bags/1.png','static/prototypes/bags/2.png',
'static/prototypes/bags/3.png','static/prototypes/bags/4.png','static/prototypes/bags/5.png',
'static/prototypes/bags/6.png', 'static/prototypes/boxes/7.png'];

console.log(userModel);

ReactDOM.render(
  <Body model={userModel}/>,
  document.getElementById('root')
);
  