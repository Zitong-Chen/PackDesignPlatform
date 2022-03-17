import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';

import './ShapeTab.css'
import AddTitle from '../components/AddTitle';

import UpIcon from '../icons/icon-up.png'
import DownIcon from '../icons/icon-down.png'
import Polygon3 from '../icons/icon-polygon3.png'
import Polygon4 from '../icons/icon-polygon4.png'
import Polygon5 from '../icons/icon-polygon5.png'
import Circle from '../icons/icon-circle.png'
import Line from '../icons/icon-line.png'
import Pen from '../icons/icon-pen.png'



// Extract as a separate class later
class IncrementItem extends Component {
    constructor(props) {
        super(props);

        var item_values = [];
        React.Children.map(this.props.children,(child, key) => {
            item_values.push(child.props.value);
        });

        var item_icons = [];
        var item_click_func = [];
        if (this.props.isIconAvailable) {
            React.Children.map(this.props.children,(child, key) => {
                item_icons.push(child.props.icon);
                item_click_func.push(child.props.onIconClick);
            });
        }

        var initial_index = this.props.initial ? this.props.initial : 0;
        var initial_value = 'undefine';
        var isInitialMax = initial_index == item_values.length - 1 ? true : false;
        var isInitialMin = initial_index == 0 ? true : false;

        if (initial_index < item_values.length) {
            initial_value = item_values[initial_index];
        }

        this.state = {
            values_list:item_values,
            icons_list:item_icons,
            icons_click:item_click_func,
            current_index: initial_index,
            current_value: initial_value,
            isMax: isInitialMax,
            isMin: isInitialMin,
        }

        // Initial Father Props
        if (this.props.onValueChange) {
            this.props.onValueChange(initial_value);
        }
    }

    setCurrentIndexState = currentIndex =>{
        this.setState({
            isMax: currentIndex == this.state.values_list.length - 1? true : false,
            isMin: currentIndex == 0 ? true : false,
        })
        if (this.props.onValueChange) {
            this.props.onValueChange(this.state.values_list[currentIndex])
        }
    }

    handleOnIncrement = () => {
        var increase_index = this.state.current_index + 1;
        if (increase_index >= 0 && increase_index < this.state.values_list.length) {
            this.setState({
                current_index: increase_index,
                current_value: this.state.values_list[increase_index],
            }, () => this.setCurrentIndexState(this.state.current_index));
        } 
    }

    handleOnDecrement = () => {
        var decrease_index = this.state.current_index - 1;
        if (decrease_index >= 0 && decrease_index < this.state.values_list.length) {
            this.setState({
                current_index: decrease_index,
                current_value: this.state.values_list[decrease_index],
            }, () => this.setCurrentIndexState(this.state.current_index));
        } 
    }

    render() {
        return (
            <div className='increment-component-block'>
                {   this.props.isIconAvailable &&
                    <div className='component-icon'>
                        <img src={this.state.icons_list[this.state.current_index]} 
                        onClick={this.state.icons_click[this.state.current_index]}
                        style={{cursor:"pointer"}}/>
                    </div>
                }

                <div className='increment-component' style={{width:this.props.width}}>
                    <div className='component-value'>
                        <span>{this.state.current_value}</span>
                    </div>

                    <div className='component-buttons'>
                        <div className='increment' onClick={this.handleOnIncrement}>
                            <img style={{display: this.state.isMax ? 'none':'', height:'60%'}} src={UpIcon} />
                        </div>
                        <div className='decrement' onClick={this.handleOnDecrement}>
                            <img style={{display: this.state.isMin ? 'none':'', height:'60%'}} src={DownIcon}/>
                    </div>
                </div>
            </div>

            </div>
        );
    }
}


class ShapeTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // for customize fonts
            font_family: "",
            font_size: "",
            // font_color: "", // TODO: update later
        }
    }

    OnHandleFontFamilySelectionChange = (new_family) =>{
        this.setState({
            font_family: new_family,
        });
    }

    OnHandleFontSizeSelectionChange = (new_size) =>{
        this.setState({
            font_size: new_size,
        });
    }

    addNewText = (placeholder="文本", font_size="12pt", font_color="black", 
    font_family="\"Century Gothic\", Futura, sans-serif", content="") => {
        this.props.onAddNewTextMaterial(placeholder, font_size, font_color, font_family, content);
    }

    onSomethingClick = () => {
        alert("Click Event")
    }

    render() {
        return (
            <div className='console-shape'>
                <div className='add-text'>
                    <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-between', alignContent:'center'}}>
                        <span>添加文字</span>
                    </div>
                </div>

                <div className='preset-text'>
                    <AddTitle width='90%' fontsize='12pt' title='添加主标题 14pt' onClick={()=>this.addNewText("主标题","14pt")}/>
                    <AddTitle width='90%' fontsize='10pt' title='添加副标题 12pt' onClick={()=>this.addNewText("标题","12pt")}/>
                    <AddTitle width='90%' fontsize='8pt' title='添加正文 10pt' onClick={()=>this.addNewText("正文","10pt")}/>
                    
                    <div className='text-row'>
                        <IncrementItem isIconAvailable={false} width="100px" 
                        onValueChange={this.OnHandleFontFamilySelectionChange}>
                            {/* 需要在index.css中添加font-face, assets中添加字体资源 */}
                            <div icon={Line} value='字体1' />
                            <div icon={Line} value='字体2' />
                            <div icon={Line} value='字体3' />
                        </IncrementItem>

                        <IncrementItem isIconAvailable={false} width="60px"
                        onValueChange={this.OnHandleFontSizeSelectionChange}>
                            <div icon={Line} value='10pt' />
                            <div icon={Line} value='11pt' />
                            <div icon={Line} value='12pt' />
                            <div icon={Line} value='13pt' />
                            <div icon={Line} value='14pt' />
                            <div icon={Line} value='15pt' />
                            <div icon={Line} value='16pt' />
                        </IncrementItem>
                        <span className='add-text-button' 
                        onClick={()=>this.addNewText("正文",this.state.font_size,"black",this.state.font_family)}>新增</span>
                    </div>

                </div>

                <div style={{width:'100%',
                            height:'1px',
                            backgroundColor:'rgba(255,255,255,0.3)',
                            margin:"0px 0px 20px 0px"}}></div>

                <div className='add-shape'>
                    <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-between', alignContent:'center'}}>
                        <span>添加形状</span>
                    </div>
                    <div className='shapes'>
                        <div className='shape-row'>
                            <IncrementItem isIconAvailable={true}>
                                <div icon={Polygon3} value='3边' onIconClick={this.onSomethingClick}/>
                                <div icon={Polygon4} value='4边' onIconClick={()=>{alert("click4")}}/>
                                <div icon={Polygon5} value='5边' onIconClick={()=>{alert("click5")}}/>
                            </IncrementItem>
                            <img src={Circle} onClick={this.onSomethingClick} />
                            <img src={Line} onClick={this.onSomethingClick}/>
                            <img src={Pen} onClick={this.onSomethingClick}/>
                        </div>

                        {/* <div className='shape-row'>
                            <IncrementItem isIconAvailable={true}>
                                <div icon={Circle} value='3' />
                                <div icon={Circle} value='4' />
                                <div icon={Circle} value='5' />
                            </IncrementItem>
                            <span className='add-shape-button' onClick={()=>{alert("click")}}>新增</span>
                        </div>

                        <div className='shape-row'>
                            <IncrementItem isIconAvailable={true}>
                                <div icon={Line} value='3' />
                                <div icon={Line} value='4' />
                                <div icon={Line} value='5' />
                            </IncrementItem>
                            <span className='add-shape-button' onClick={()=>{alert("click")}}>新增</span>
                        </div> */}

                    </div>
                </div>
            </div>
        );
    }
}

export default ShapeTab;