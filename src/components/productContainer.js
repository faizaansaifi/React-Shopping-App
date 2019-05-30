import React,{Component} from 'react';
import {item} from '../Products';
import ItemBox from "./itemBox";
import cart from "../assets/cart.svg";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {updateRow} from "../action/action";

class ProductContainer extends Component {
    handleRoute=()=>{
        const{products}=this.props.reduxStore;
        const cartItem=products.length;
        if(cartItem>0){
            this.props.history.push("/cart")
        }
        else
            alert("Cart is Empty!")
    }
    deleteItem=(rowId)=>{
        const {updateRow}=this.props;
        this.setState({
            rowId:rowId
        })
        updateRow(rowId);
    }
    render() {
        const{products}=this.props.reduxStore;
        const cartItem=products.length;
        return (
            <div className="pro-container">
                {
                    item.map((data, val) => {
                        return <ItemBox
                            image={data.images}
                            product={data.productName}
                            amount={data.amount}
                            color={data.color}
                            size={data.sizes}
                            qty={data.quantity}
                            total={data.total}
                            {...this.props}
                        />
                    })
                }
                <div className="cart" onClick={this.handleRoute}>
                    <img src={cart} alt="cart" />
                    <div className="badge">{cartItem}</div>
                </div>
                {products.length>0? <div className="selected-product-glimpse">
                    <h5>Your Order</h5>
                    <table>
                        <thead>
                        <tr>
                            <th>Products</th>
                            <th>Color</th>
                            <th>Size</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((data,index)=>{
                            return <tr>
                                <td>{data.product}</td>
                                <td>{data.selectedColor}</td>
                                <td>{data.size}</td>
                                <td>
                                    <button className="deleteItem" onClick={()=>this.deleteItem(index)}>X</button>
                                </td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>:null}

            </div>
        )
    }
}
const mapStateToProps=(reduxStore)=>({
    reduxStore
})
const mapDispatchToProps=(dispatch)=>({
    updateRow:(data)=>dispatch(updateRow(data)),
})

ProductContainer=connect(mapStateToProps,mapDispatchToProps)(ProductContainer);
export default withRouter(ProductContainer);