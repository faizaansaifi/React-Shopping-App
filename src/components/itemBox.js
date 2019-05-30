import React,{Component} from 'react';
import Options from "../components/options"
import {connect} from "react-redux";
import {set,addedToCart,overview} from '../action/action'
import {ItemDetail} from "./ItemDetail";
import {withRouter} from "react-router-dom";

export default class ItemBox extends Component {
    constructor(props){
        super(props);
        const {color}=props;
        this.state = {
            selected: 0,
            size:"SMALL",
            selectedColor:color[0],
        };
    }

    handleColor = e => {
        const {color}=this.props;
        this.setState({
            selected: e.target.value,
            selectedColor:color[e.target.value]
    });

    };
    handleSize=e=>{
        this.setState({
            size:e.target.value
        })
    };
    handleAddtoCart=()=> {
        const {product, amount, total, qty, update} = this.props;
        const {selectedColor, size} = this.state;

        const {added}=this.props;
        update({product, amount, selectedColor, size, qty, total});

        // this.setState({
        //     buttonDisable:true
        // },()=>added(this.state.buttonDisable))
    }

    routeDetails=()=> {
        const {product, amount, total, qty, overlook} = this.props;
        const {selectedColor, size} = this.state;
        overlook({product, amount, selectedColor, size, qty, total});

        this.props.history.push("/items")
    }

    render() {
        const {image,product,amount,color,size}=this.props;
        const {selected} = this.state;
        const style =
            this.state.selected >= 1
                ? { transform: `translateX(-${selected * 250}px)` }
                : {};

        return (
            <div className="item-box">
                <div className="slider">
                    <div className="slide-container" style={style}>
                        {image.map((key) => {
                            return  <div className='item' > <img
                                src={Object.keys(key).map((value) => {
                                    return key[value]
                                })} alt="Product Image" onClick={this.routeDetails}/>;
                            }}/> </div>
                        })}
                    </div>
                </div>

                <div className="product-price">
                    <span className="left">{product}</span>
                    <span className="right">$ {amount}</span>
                </div>
                <div>
                    <Options
                        color={color}
                        size={size}
                        handleColor={this.handleColor}
                        handleSize={this.handleSize}
                        handleAddtoCart={this.handleAddtoCart}
                        colorIndex={selected}
                        value={product}
                        isDisable={this.state.buttonDisable}
                    />
                </div>
            </div>
        )
    }
}
const mapStateToProps=(reduxStore)=>({
     reduxStore,
})

const mapDispatchToProps=(dispatch)=>({
    update:(data)=>dispatch(set(data)),
    added:(data)=>dispatch(addedToCart(data)),
    overlook:(data)=>dispatch(overview(data))
})

ItemBox=connect(mapStateToProps,mapDispatchToProps)(ItemBox);
withRouter(ItemBox)