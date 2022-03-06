import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './DisplayContainer.css'

import ImageContainer from '../components/ImageContainer'
import EditableInput from '../components/EditableInput';

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
        img_src: null,
        img_materials: [],
        text_materials:[],
        selected_material: null,
        material_size: null,

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

    // New Image Materials
    addNewImgMaterial = (url) => {
        var container = document.getElementById('container');
        let container_center_top = container.getBoundingClientRect().top +  container.getBoundingClientRect().height / 2;
        let container_center_left = container.getBoundingClientRect().left + container.getBoundingClientRect().width / 2;
        
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
        let container_center_top = container.getBoundingClientRect().top +  container.getBoundingClientRect().height / 2;
        let container_center_left = container.getBoundingClientRect().left + container.getBoundingClientRect().width / 2;
        let pos = [container_center_left - 10, container_center_top - 5]
        
        var new_material = new TextMaterial(pos, font_size, font_color, font_family, placeholder, content);
        var material_history = this.state.text_materials;
        material_history.push(new_material);

        this.setState({
            text_materials: material_history,
        })
    }

    handleOnMaterialClick = (material, e) => {
        console.log(e.target.getBoundingClientRect())
        if (this.state.selected_material == null) {
            material.is_selected = true;
            this.setState({
                selected_material: material,
                material_size: [e.currentTarget.getBoundingClientRect().width, 
                    e.currentTarget.getBoundingClientRect().height],
            })
        } else if (this.state.selected_material === material) {
            material.is_selected = false;
            this.setState({
                selected_material: null,
                material_size: null,
            })
        }
    }

    handleOnMouseMove = (e) => {
        if (this.state.selected_material != null) {
            var x = e.clientX - this.state.material_size[0] / 2;
            var y = e.clientY - this.state.material_size[1] / 2;
            this.state.selected_material.material_pos = [x, y];
            this.forceUpdate();
        }
    }

    handleOnTextChange = new_text => {
        // Update text information
    }
  
    render() {
      return (
        <div className='display-container'>
            <div className='container-block' onMouseMove={this.handleOnMouseMove}>
                <ImageContainer img={this.state.img_src} id='container'/>
                {
                    this.state.img_materials.map((material, index) => {
                        return (
                            <div>
                                <img key={index} src={material.material_url} 
                                draggable={false}
                                style={{position:'absolute', width:'100px',height:'100px',
                                left:material.material_pos[0],
                                top:material.material_pos[1],
                                border:material.is_selected ? '1px dashed gray' : ''}} 
                                onClick={(e) => this.handleOnMaterialClick(material, e)}/>
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
                            onValueChange={this.handleOnTextChange}
                            onClick={(e) => this.handleOnMaterialClick(material, e)}/>
                        );
                    })
                }

            </div>
        </div>
      );
    }
  }

  export default DisplayContainer;