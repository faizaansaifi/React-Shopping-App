import React,{Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import BreadcrumbItem from "react-bootstrap/es/BreadcrumbItem";

export default class OrderReciept extends Component{
    cartRoute=()=>{
        this.props.history.push("/cart");
    }
    homeRoute=()=>{
        this.props.history.push("/");
    }

    // detailRoute=()=>{
    //     this.props.history.push("/details");
    // }

    render(){
        const {obj}=this.props.reduxStore.form;
        const {products}=this.props.reduxStore;
        console.log(products);
        return(
            <div className="receipt-container">
                <Breadcrumb>
                    <BreadcrumbItem onClick={this.homeRoute}>Home</BreadcrumbItem>
                    <BreadcrumbItem onClick={this.cartRoute}>/ Your Cart</BreadcrumbItem>
                    <BreadcrumbItem onClick={this.detailRoute}>/ Details</BreadcrumbItem>
                    <BreadcrumbItem active>/ Order Receipt</BreadcrumbItem>
                </Breadcrumb>
                <h4> &#9733; Order Placed Successfully.</h4>
                <div className="order-summary">
                    <table>
                        <thead>
                        <tr>
                            <th>Products</th>
                            <th>Color</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((data)=>{
                            return <tr>
                                <td>{data.product}</td>
                                <td>{data.selectedColor}</td>
                                <td>{data.qty}</td>
                                <td>$ {data.total}</td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                {/*    <div className="net-worth">Net Worth: $ {netAmount}</div>*/}
                {/*    <div className="gst-total">Total GST (9%) : $ {gst} </div>*/}
                {/*    <div className="total-amount">Sub Total:(GST inclusive) $ {subTotal}</div>*/}
                </div>
                <h6>Shipping will be held to following Address</h6>
                {obj.shippingName?
                    <div className="order-details">
                        <div>Name: <span>{obj.shippingName}</span></div>
                        <div>Address: <span>{obj.shippingAddress}</span></div>
                        <div>City: <span>{obj.shippingCity} {obj.shippingZip}</span></div>
                        <div>Contact Info: <span>{obj.shippingMail}</span></div>
                    </div>:

                    <div className="order-details">
                        <div>Name: <span>{obj.customer}</span></div>
                        <div>Address: <span>{obj.address}</span></div>
                        <div>City: <span>{obj.city} {obj.zip}</span></div>
                        <div>Contact Info: <span>{obj.Email}</span></div>
                    </div>}


            </div>
        )
    }
}

const mapStateToProps=(reduxStore)=>({
    reduxStore
});

OrderReciept=connect(mapStateToProps,null)(OrderReciept);
withRouter(OrderReciept);

