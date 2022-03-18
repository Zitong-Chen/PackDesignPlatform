import React, {Component} from 'react'
import './EditPane.css'

import ControlSlider from './rc-slider';

class EditPane extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseOver: false,
        }
    }

    handleMouseOver = () => {
        this.setState({
            mouseOver: true,
        })
    }

    handleMouseLeave = () => {
        this.setState({
            mouseOver: false,
        })
    }

    handleSliderChangeValue = (value) => {
        

    }

    render() {
        return(
            <div className='edit-pane' onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
                <span style={{color:'white'}} >细调</span>
                <div className='style-adjust'>
                    <ControlSlider min={0} max={100} color='white' title='模糊' percentage={true} 
                    handleChangeValue={this.handleSliderChangeValue}/>
                    <ControlSlider min={0} max={100} color='white' title='抽象' percentage={true}/>
                    <ControlSlider min={0} max={100} color='white' title='颗粒大小' percentage={true}/>
                    <ControlSlider min={0} max={100} color='white' title='透明' percentage={true}
                    handleChangeValue={this.handleSliderChangeValue}/>
                </div>
            </div>
        )
    }

}

export default EditPane;