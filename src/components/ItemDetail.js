import React,{Component} from 'react';
import Options from "./options";
import {addedToCart, set} from "../action/action";
import {connect} from "react-redux";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import BreadcrumbItem from "react-bootstrap/es/BreadcrumbItem";

export class ItemDetail extends Component {
    state={
        selected:0,
        size:"SMALL",
        selectedColor:this.props.reduxStore.overview.obj.selectedColor
    }
    handleColor = e => {
        const {color}=this.props.reduxStore;
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
        const {update}=this.props;
        const {product, amount, total, qty} = this.props.reduxStore.overview.obj;
        const {selectedColor, size} = this.state;
        update({product, amount, selectedColor, size, qty, total});

        const {added}=this.props;
        this.setState({
            buttonDisable:true
        },()=>added(this.state.buttonDisable))
    }
    homeRoute=()=>{
        this.props.history.push("/");
    }
    render() {
        const {images,color,sizes}=this.props.reduxStore;
        const {selected,selectedColor} = this.state;

        const {product,amount}=this.props.reduxStore.overview.obj;
        let srcArray=images.map((key) => {
            let x=[];
            Object.keys(key).map((value) => {
                if(value==selectedColor)
                    x.push(key[value])
                else
                    x.push(null)
            })
            return x;
        });
        let filteredSrc=srcArray.filter((val)=>{
            return val != "";
        })
        return (
            <div>
                <Breadcrumb>
                    <BreadcrumbItem onClick={this.homeRoute}>Home</BreadcrumbItem>
                    <BreadcrumbItem active>/ Your Cart</BreadcrumbItem>
                </Breadcrumb>
            <div className="itemBox-container">
                <div className="item-box">
                    <div className="slider">
                        <div className="slide-container">
                            {srcArray.map(() => {
                                return  <div className='item'> <img
                                    src={filteredSrc} alt="Product Image"/> </div>
                            })}
                        </div>
                    </div>
                </div>
                <div className="productDetails">
                    <div className="product-price">
                        <p>Product Name : {product}</p>
                        <p>Amount : ${amount}</p>
                    </div>
                    <div className="description">
                        <h2>Product Description</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci dolorem eaque earum, id illo ipsum iusto magnam minus molestiae odit omnis, praesentium quibusdam ratione reiciendis sapiente sed vitae voluptas!</p>
                    </div>
                    {console.log(selected,"selected")}
                    <div>
                        <Options
                            color={color}
                            size={sizes}
                            handleColor={this.handleColor}
                            handleSize={this.handleSize}
                            handleAddtoCart={this.handleAddtoCart}
                            colorIndex={selected}
                            isDisable={this.state.buttonDisable}
                        />
                    </div>
                </div>
            </div>
            </div>
        );
    }
}
const mapStateToProps=(reduxStore)=>({
    reduxStore,
})

const mapDispatchToProps=(dispatch)=>({
    update:(data)=>dispatch(set(data)),
    added:(data)=>dispatch(addedToCart(data))
})

ItemDetail=connect(mapStateToProps,mapDispatchToProps)(ItemDetail);