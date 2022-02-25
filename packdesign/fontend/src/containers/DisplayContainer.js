import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './DisplayContainer.css'

import ImageContainer from '../components/ImageContainer'

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
        if (new_size.length == 2) {
           this.size = new_size; 
        }
    }

    get material_pos() {
        return this.pos;
    }

    set material_pos(new_pos) {
        if (new_pos.length == 2) {
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
        materials: [],
        selected_material: null,

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

    addNewMaterials = (url) => {
        var container = document.getElementById('container');
        let container_center_top = container.getBoundingClientRect().top +  container.getBoundingClientRect().height / 2;
        let container_center_left = container.getBoundingClientRect().left + container.getBoundingClientRect().width / 2;
        
        var new_material = new MaterialInfo(url, [100,100], [container_center_left - 50, container_center_top - 50]);
        var material_history = this.state.materials;
        material_history.push(new_material);

        this.setState({
            materials: material_history,
        })
    }

    handleOnMaterialDrag = (material, index, e) => {
        e.preventDefault();

        // console.log(e.clientX, e.clientY);
        // material.material_pos = [(e.clientX - 50), (e.clientY - 50)];
        // console.log(this.state.materials);

        // this.forceUpdate();
    }

    handleOnMaterialDragEnd = (material, e) => {
        // console.log(e.clientX, e.clientY);
        // material.material_pos = [(e.clientX - 50), (e.clientY - 50)];
        // console.log(this.state.materials);
        // this.forceUpdate();
    }

    handleOnMaterialClick = (material) => {
        if (this.state.selected_material == null) {
            material.is_selected = true;
            this.setState({
                selected_material: material,
            })
        } else if (this.state.selected_material == material) {
            material.is_selected = false;
            this.setState({
                selected_material: null,
            })
        }
    }

    handleOnMouseOver = (e) => {
        if (this.state.selected_material != null) {
            console.log(e.clientX, e.clientY);
            
            
            this.state.selected_material.material_pos = [(e.clientX - 50), (e.clientY - 50)];
            this.forceUpdate();
        }
    }
  
    render() {
      return (
        <div className='display-container'>
            <div className='container-block' onMouseOver={this.handleOnMouseOver}>
                <ImageContainer img={this.state.img_src} id='container'/>
                {
                    this.state.materials.map((material, index) => {
                        return (
                            <div>
                                <img key={index} src={material.material_url} 
                                style={{position:'absolute', width:'100px',height:'100px',
                                left:material.material_pos[0],
                                top:material.material_pos[1],
                                border:material.is_selected ? '1px dashed black' : ''}} 
                                onClick={() => this.handleOnMaterialClick(material)}
                                onDrag={(e) => this.handleOnMaterialDrag(material,index,e)}
                                onDragEnd={(e) => this.handleOnMaterialDragEnd(material, e)}/>
                            </div>
                        );
                    })
                }
            </div>
        </div>
      );
    }
  }

  export default DisplayContainer;