import React, {Component, Suspense} from 'react'
import ReactDOM  from 'react-dom';

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import html2canvas from "html2canvas"

import './DisplayContainer.css'

import ImageContainer from '../components/ImageContainer'
import EditableInput from '../components/EditableInput';

import ModelPackingBag from '../mockLibrary/ModelPackingBag'
import HDRI from '../assets/royal_esplanade_1k.hdr'

// Editable Div Material
class TextMaterial {
    constructor(pos=[0, 0], font_size="12pt", font_color="black", 
        font_family="\"Century Gothic\", Futura, sans-serif", 
        placeholder="文本", content="") {

        this.pos = pos; // (left, top)
        this.font_size = font_size; // font size, unit: pt
        this.font_color = font_color
        this.font_family = font_family;
        this.content = "";
        this.placeholder = placeholder;
        this.isSelected = false;

        
    }

    get material_pos() {
        return this.pos;
    }

    set material_pos(new_pos) {
        if (new_pos.length === 2) {
            this.pos = new_pos;
        }
    }

    get text_size() {
        return this.font_size;
    }

    set text_size(new_size) {
        this.font_size = new_size;
    }

    get text_color() {
        return this.font_color;
    }

    set text_color(new_color) {
        if (new_color.length === 2) {
           this.text_color = new_color;
        }
    }

    get text_family() {
        return this.font_family;
    }

    set text_family(new_family) {
        this.font_family = new_family;
    }

    get text_content() {
        return this.content;
    }

    set text_content(new_content) {
        this.content = new_content;
    }

    get text_placeholder() {
        return this.placeholder;
    }

    set text_placeholder(new_placeholder) {
        this.placeholder = new_placeholder;
    }

    get is_selected() {
        return this.isSelected;
    }

    set is_selected(new_state) {
        this.isSelected = new_state;
    }
}


// Image Material
class MaterialInfo {
    // constructor() {
    //     this.url = '';
    //     this.size = [0, 0]; // array length: two
    //     this.pos = [0, 0]; // (left, top)
    // }

    constructor(url, size, pos) {
        this.url = url;
        this.size = size; // array length: two
        this.pos = pos; // (left, top)
        this.isSelected = false;
    }

    get material_url() {
        return this.url;
    }

    set material_url(new_url) {
        this.url = new_url;
    }

    get material_size() {
        return this.size;
    }

    set material_size(new_size) {
        if (new_size.length === 2) {
           this.size = new_size; 
        }
    }

    get material_pos() {
        return this.pos;
    }

    set material_pos(new_pos) {
        if (new_pos.length === 2) {
            this.pos = new_pos;
        }
    }

    get is_selected() {
        return this.isSelected;
    }

    set is_selected(new_state) {
        this.isSelected = new_state;
    }
}

/* ============ Display Container ================= */
class DisplayContainer extends Component {
    componentDidMount() {
      this.props.onRef(this);
    }
  
    constructor(props) {
      super(props);
      this.state = {
        img_src: 'static/black.jpg',
        img_materials: [],
        text_materials:[],
        selected_material: null,
        material_size: null,
        material_drag: false,

      }
    }
  
    update() {   
    //   console.log('Start to render img...');
    //   let xhr = new XMLHttpRequest(); 
    //   let form = new FormData();
    //   form.append('image', this.props.model.img_src);
    //   xhr.onreadystatechange = () => {
    //       // 根据服务器的响应内容格式处理响应结果
    //       if (xhr.readyState === 4 && xhr.status === 200) {
    //           if(xhr.getResponseHeader('content-type')==='application/json'){
    //               let data = JSON.parse(xhr.responseText);
    //               let img = data.img[0];
    //               let base_dir = data.base_dir;
    //               console.log(base_dir+img)
    //               this.setState({
    //                 img_src: base_dir+img,
    //               });
    //           }
    //       }
    //       else {
    //           // console.log(xhr.responseText);
    //       }
    //   }
    //   xhr.open('POST', '/render', false);
    //   xhr.send(form); 

      this.setState({
        img_src: this.props.model.img_src,
      });
    }

    // New Image Materials
    addNewImgMaterial = (url) => {
        var container = document.getElementById('container');
        let container_center_top = container.getBoundingClientRect().height / 2 ;
        let container_center_left = container.getBoundingClientRect().width / 2 ;
        
        var new_material = new MaterialInfo(url, [100,100], [container_center_left - 50, container_center_top - 50]);
        var material_history = this.state.img_materials;
        material_history.push(new_material);

        this.setState({
            img_materials: material_history,
        })
    }

    // New Text Material
    addNewTextMaterial = (placeholder, font_size, font_color, font_family, content) => {
        var container = document.getElementById('container');
        let container_center_top = container.getBoundingClientRect().height / 2;
        let container_center_left = container.getBoundingClientRect().width / 2;
        let pos = [container_center_left - 10, container_center_top - 5]
        
        var new_material = new TextMaterial(pos, font_size, font_color, font_family, placeholder, content);
        var material_history = this.state.text_materials;
        material_history.push(new_material);

        this.setState({
            text_materials: material_history,
        })
    }

    handleOnContainerClick = (e) => {
        if (this.state.selected_material != null) {
            this.state.selected_material.is_selected = false;
            this.setState({
                selected_material: null,
                material_size: null,
            })
        }
    }

    handleOnMaterialMouseDown = (material, e) => {
        if (this.state.selected_material != null) {
            this.state.selected_material.is_selected = false;
        }
        material.is_selected = true;
        this.setState({
            selected_material: material,
            material_size: [e.currentTarget.getBoundingClientRect().width, 
                e.currentTarget.getBoundingClientRect().height],
            material_drag: true,
        })
        e.stopPropagation();
    }

    handleOnMaterialMouseUp = (e) =>{
        if (this.state.selected_material != null) {
            this.setState({
                material_drag: false,
            })
        }
        e.stopPropagation();
    }

    handelOnMaterialClick = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }


    handleOnMouseMove = (e) => {
        if (this.state.selected_material != null && this.state.material_drag) {
            let material_left = e.clientX - this.state.material_size[0] / 2;
            let material_top = e.clientY - this.state.material_size[1] / 2;
            let container = document.getElementById('container');
            let container_top = container.getBoundingClientRect().top;
            let container_left = container.getBoundingClientRect().left;

            let x = material_left - container_left;
            x = x >= 0 ? x : 0;

            let y = material_top - container_top;
            y = y >= 0 ? y : 0;

            this.state.selected_material.material_pos = [x, y];
            this.forceUpdate();
        }
    }

    handleOnTextChange = new_text => {
        // Update text information
    }

    handleOnSaveImage = () => {
        html2canvas(document.querySelector("#container")).then(canvas => {
            let url = canvas.toDataURL();
            let a = document.createElement('a');
            let currentTime = new Date();
            let filename = `${currentTime.getFullYear()}_${currentTime.getMonth()}_${currentTime.getDate()}_` + 
            `${currentTime.getHours()}_${currentTime.getMinutes()}_${currentTime.getSeconds()}`
            a.setAttribute('href', url);
            a.setAttribute('download', filename);
            a.click();
        });
    }
  
    render() {
      return (
        <div className='display-container' >
            <div className='container-block' id="container"
            style={{ background: 'white'}} onMouseMove={this.handleOnMouseMove} 
            onClick={this.handleOnContainerClick}>
                <div className="canvas" style={{ height:'100%', width:'100%'}}>
                    {/* <Canvas>
                    <Suspense fallback={null}>
                        <ModelPackingBag  childData={this.state.img_src}/>
                        <OrbitControls />
                        <Environment files={HDRI} />
                    </Suspense>
                    </Canvas> */}
                </div>
                {
                    this.state.img_materials.map((material, index) => {
                        return (
                            <div>
                                <img key={index} src={material.material_url} 
                                draggable={false}
                                style={{position:'absolute', width:'100px',height:'100px',
                                left:material.material_pos[0],
                                top:material.material_pos[1],
                                border:material.is_selected ? '1px dashed gray' : '',
                                cursor: this.state.material_drag ? 'move' : 'default',}} 
                                // onClick={(e) => this.handleOnMaterialClick(material, e)}
                                onMouseDown = {(e) => this.handleOnMaterialMouseDown(material, e)}
                                onMouseUp={this.handleOnMaterialMouseUp}
                                onClick={this.handelOnMaterialClick}/>
                            </div>
                        );
                    })
                }
                {
                    this.state.text_materials.map((material, index) => {
                        return (
                            <EditableInput key={index} 
                            placeholder={material.text_placeholder} 
                            left={material.material_pos[0]}
                            top={material.material_pos[1]}
                            fontSize={material.font_size}
                            fontFamily={material.font_family}
                            fontColor={material.font_color}
                            onValueChange={this.handleOnTextChange}
                            onMouseDown = {(e) => this.handleOnMaterialMouseDown(material, e)}
                            onMouseUp={this.handleOnMaterialMouseUp}
                            onClick={this.handelOnMaterialClick}
                            is_drag={this.state.material_drag}/>
                        );
                    })
                }

            </div>
            <div className='save-img-btn' onClick={this.handleOnSaveImage}>
                <span>保存图片</span>
            </div>
        </div>
      );
    }
  }

  export default DisplayContainer;