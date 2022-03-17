import React, {Component} from "react";

import './EditableInput.css'

class EditableInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
            editable: false,
        };
    }

    handleOnDoubleClick = (e) => {
        this.setState({
            editable: true,
        })
        // document.getElementById
    }

    handleOnBlur = (e) => {
        this.setState({
            value: e.target.innerText,
            editable: false,
        }, () => {
            this.props.onValueChange(this.state.value);
        })
    }

    render() {
        return (
            <div key={this.props.key} 
            className="edit-input" 
            contentEditable={this.state.editable} 
            placeholder={this.props.placeholder}
            style={{left:this.props.left, top:this.props.top,fontSize:this.props.fontSize,
            fontFamily:this.props.fontFamily, color:this.fontColor}}
            onClick={this.props.onClick}
            onDoubleClick={this.handleOnDoubleClick}
            onBlur={this.handleOnBlur}>
            </div>
        );
    }
}

export default EditableInput;