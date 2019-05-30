import React,{Component} from 'react';
import Table from "react-bootstrap/Table";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import {updateCart,emptyCart,updateRow,updateQuantity,updateColor,updateAmount} from "../action/action";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import BreadcrumbItem from "react-bootstrap/es/BreadcrumbItem";
class CartView extends Component {
    state={
        checkout:false,
        forUpdate:false,
        rowId:0,
        tableRow:[],
        qty:1,
        selected: 0
    }
    handleUpdateColor =(e,id) => {
        const {color} = this.props;
        const {updateColor}=this.props;
        this.setState({
            selected: e.target.value,
            upgradedColor: color[e.target.value]
        },()=>{
            console.log("Id in Button",id)
            let clr=color[this.state.selected]
            console.log("color to update",clr);
            updateColor(clr,id);
        });
    }
    handleCheckout=()=>{
        const {products}=this.props;
        if(products.length>0){
            this.props.history.push('/details')
        }
        else{
            alert("Cart is Empty. Please select items")
        }
    }
    handleContinue=()=>{
        this.props.history.push('/');
    }
    handleUpdate=(data)=>{
        const {updateCart,updateRow}=this.props;
        this.setState({
            forUpdate:!this.state.forUpdate
        },()=>{
            updateCart(this.state.forUpdate);
            updateRow(data)
        })
    }
    handleEmpty=()=>{
        const {empty}=this.props;
        empty();
    }
    addQty=(id)=>{
        const {updateQuantity,products}=this.props;
        console.log("Id in Button",id)
        let qty=products[id].qty;
        if(qty<10){
            qty=qty+1;
            console.log("Qty",qty);
            updateQuantity(qty,id);
        }
    }
    subQty=(id)=>{
        const {updateQuantity,products}=this.props;
        console.log("Id in Button",id)
        let qty=products[id].qty;
        if(this.state.qty>1){
            qty=qty-1;
            console.log(qty);
            updateQuantity(qty,id);
        }
    }

    deleteItem=(rowId)=>{
        const {updateRow}=this.props;
        this.setState({
            rowId:rowId
        })
        updateRow(rowId);
    }
    homeRoute=()=>{
        this.props.history.push("/");
    }
    render() {
        const {products,update_request}=this.props;
        const {color,images,sizes}=this.props;

        const renderRow = [];
        products.forEach((product, index) => {
            let tableData = [];
            for(let key in product) {
                let i=0;
                if (key === 'qty' && update_request===true) {
                    tableData.push(<td id={index}>
                        <button className="add-qty" onClick={()=>this.addQty(index)}>+</button>
                        <input type="text" className="qty-field" value={products[index].qty}/>
                        <button className='sub-qty' onClick={()=>this.subQty(index)}>-</button>
                    </td>)
                }
                else if(key==='product'){
                    let srcArray=images.map((key) => {
                            let x=[];
                            Object.keys(key).map((value) => {
                                if(value===product.selectedColor)
                                    x.push(key[value])
                                else
                                    x.push(null)
                            })
                        return x;
                    });

                    let filteredSrc=srcArray.filter((val)=>{
                        return val != "";
                    })
                    tableData.push(
                        <td id={index}>{product[key]}
                            <div className="item-slider">
                                <div className="item-slide-container">
                                    {images.map((key) => {
                                        return  <div className='item-container'> <img
                                            src={filteredSrc} alt="Product Image"/> </div>
                                    })}
                                </div>
                            </div>
                        </td>)
                }
                else if(key==='total' && update_request===true){
                    tableData.push(
                        <td>{product[key]}
                        <button className="deleteItem" onClick={()=>this.deleteItem(index)}>X</button>
                        </td>)
                }
                else if(key==='selectedColor' && update_request===true){
                    tableData.push(
                        <td id={index}>
                            <select onChange={(e)=>this.handleUpdateColor(e,index)} className="select-color" style={{color:product[key]}}>
                                {color.map((data,index) => {
                                    return <option value={index} style={{color:data}} >٭</option>
                                })}
                            </select>
                        </td>)
                }
                else if(key==='size' && update_request===true){
                    tableData.push(
                        <td id={index}>
                            <select className="select-size">
                                {sizes.map((data)=>{
                                    return <option value={data}>{data}</option>
                                })}
                            </select>
                        </td>)
                }
                else{
                    tableData.push(
                         <td>{product[key]}</td>
                        )
                    }
            }

            renderRow.push(<tr key={index}>{tableData}</tr>);
        });

            const {updatedSummary}=this.props;
            const totalAmount=[];
            products.forEach((product) => {
                totalAmount.push(product.total)
            })
            const subTotal=totalAmount[0]>1?totalAmount.reduce((acc,cur)=>acc+cur):0;

            const gst=Math.round((subTotal/9));
            const netAmount=Math.round(subTotal-gst);
            updatedSummary(gst,netAmount,subTotal);
            let style={
                background:"#7d1111",
                padding:"10px 20px"
            }
            let background=update_request?style:{background:"#cb3532"};
        return(
            <div className="cartview-container">
                <header>
                    <div className="logo" onClick={this.handleContinue}></div>
                    <span className="for-dev" >Makes shopping really easy</span>

                </header>
                    <Breadcrumb>
                        <BreadcrumbItem onClick={this.homeRoute}>Home</BreadcrumbItem>
                        <BreadcrumbItem active> Your Cart</BreadcrumbItem>
                    </Breadcrumb>
                <h2>Your Shopping Cart</h2>
                {products.length===0?<div className="empty-cart-notice">
                    <p>It's Empty, click on "Continue Shopping" </p>
                </div>: <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ITEM</th>
                        <th>PRICE (in $)</th>
                        <th>COLOR</th>
                        <th>SIZE</th>
                        <th>QUANTITY</th>
                        <th>AMOUNT (in $)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderRow}
                    </tbody>
                </Table>}

                <div className="net-worth">Net Worth: $ {netAmount}</div>
                <div className="gst-total">Total GST (9%) : $ {gst} </div>
                <div className="total-amount">Sub Total:(GST inclusive) $ {subTotal}</div>
                <div className="button-section">
                    <button className="red-button" style={background} onClick={()=>this.handleUpdate(renderRow)}>Update Cart</button>
                    <button className="red-button" onClick={this.handleEmpty}>Empty Cart</button>
                    <button className="red-button" onClick={this.handleContinue}>Continue Shopping</button>
                    <button className="red-button" onClick={this.handleCheckout}>Go to Checkout</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(store)=>({
    products: store.products,
    update_request:store.update_request,
    renderRow:store.renderRow,
    color:store.color,
    images:store.images,
    sizes:store.sizes
})
const mapDispatchToProps=(dispatch)=>({
    updateCart:(data)=>dispatch(updateCart(data)),
    empty:()=>dispatch(emptyCart),
    updateRow:(data)=>dispatch(updateRow(data)),
    updateQuantity:(data,id)=>dispatch(updateQuantity(data,id)),
    updateColor:(data,id)=>dispatch(updateColor(data,id)),
    updatedSummary:(gst,netAmount,subTotal)=>dispatch(updateAmount(gst,netAmount,subTotal))
})

CartView=connect(mapStateToProps,mapDispatchToProps)(CartView);

export default withRouter(CartView);