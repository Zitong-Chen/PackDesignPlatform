import React, {Component} from 'react';
import './ImageContainer.css';

class ImageContainer extends Component {
    
    render() {
        return (
            <div className='img-container' id={this.props.id}>
                <img src={this.props.img}/>
            </div>
        );
    }
}

export default ImageContainer
