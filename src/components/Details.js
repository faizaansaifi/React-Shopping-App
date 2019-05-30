import React,{Component} from 'react';
import Input from './Input';
import {connect} from "react-redux";
import {validate,updateForm,markSameCheck} from '../action/action'
import {withRouter} from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import BreadcrumbItem from "react-bootstrap/es/BreadcrumbItem";

export default class Details extends Component {
    state={
        field:{},
    }
    handleChange=(e)=>{
        const {
            nameValidation,
            cityValidation,
            addressValidation,
            zipValidation,
            emailValidation,
        }=this.state;
        const {validate,updateForm}=this.props;
        if(e.target.name === "customer" ||e.target.name==="shippingName"){
            if(e.target.value!=="" && isNaN(e.target.value)){
                this.setState({
                    nameValidation: true,
                    [e.target.name]: e.target.value
                },()=>{
                    updateForm({...this.state})
                })
            }
            else{
                this.setState({
                    nameValidation: false,
                })
            }
        }
        else if(e.target.name === "address" ||e.target.name === "shippingAddress"){
            if(e.target.value!==""){
                this.setState({
                    addressValidation:true,
                    [e.target.name]:e.target.value
                },()=>{
                    updateForm({...this.state})
                })
            }
            else{
                this.setState({
                    addressValidation: false,
                })
            }
        }
        else if(e.target.name === "city" ||e.target.name === "shippingCity"){
            if(e.target.value!==""){
                this.setState({
                    cityValidation:true,
                    [e.target.name]:e.target.value
                },()=>{
                    updateForm({...this.state})
                })
            }
            else{
                this.setState({
                    cityValidation: false,
                })
            }
        }
        else if(e.target.name === "zip"||e.target.name === "shippingZip"){
            if(e.target.value!==""){
                this.setState({
                    zipValidation:true,
                    [e.target.name]:e.target.value
                },()=>{
                    updateForm({...this.state})
                })
            }
            else{
                this.setState({
                    zipValidation: false,
                })
            }
        }
        else if(e.target.name === "Email"||e.target.name === "shippingMail"){
            if(e.target.value!==""){
                this.setState({
                    emailValidation:true,
                    [e.target.name]:e.target.value
                },()=>{
                    updateForm({...this.state})
                })
            }
            else{
                this.setState({
                    emailValidation: false,
                })
            }
        }


        if(nameValidation && cityValidation && addressValidation && zipValidation &&emailValidation)
            {
                this.setState({
                    formValidation: true
                }, () => {
                    validate(this.state.formValidation);
                    updateForm({...this.state})
                })

            }

        else {
            this.setState({
                [e.target.name]: e.target.value,
                formValidation: false
            }, () => {
                validate(this.state.formValidation);
                updateForm({...this.state})
            })
        }
    }
    markSameAsBilling=()=>{
        const {form}=this.props.reduxStore;
        const {markSameAs}=this.props;
        this.setState({
            sameAsBilling:!this.state.sameAsBilling
        },()=>{
            if(this.state.sameAsBilling===true){
                this.setState({
                    field:{...form.obj}
                })
            }
            markSameAs(this.state.sameAsBilling)

        })
    };

    validate=()=>{
        const {inputValidation}=this.props.reduxStore;
        if(inputValidation) {
            alert("Order Successfull");
            this.setState({
                placeOrder:true
            })
        }
        else {
            alert("Please fill all the details correctly")
            return false
        }
    };
    handleOrder=()=>{
        console.log(this.props.history,"+++++")
        this.props.history.push("/reciept");
    }
    cartRoute=()=>{
        this.props.history.push("/cart");
    }
    homeRoute=()=>{
        this.props.history.push("/");
    }
    render() {
        const {field,placeOrder}=this.state;
        const style=placeOrder?{display:"block"}:{display:"none"};
        let isSame;
        const {products,netAmount,gst,subTotal}=this.props.reduxStore;

        let display= placeOrder?{display:"none"}:{display:"block"};
        let position=placeOrder?{right:"36%"}:{right:"90px"}
        return (
            <div className="detail-container">
                <Breadcrumb>
                    <BreadcrumbItem onClick={this.homeRoute}>Home</BreadcrumbItem>
                    <BreadcrumbItem onClick={this.cartRoute}>Your Cart</BreadcrumbItem>
                    <BreadcrumbItem active> Details</BreadcrumbItem>
                </Breadcrumb>
                <h3 style={display}>Your Details</h3>
                <form className="form-container" style={display}>
                    <span className="over-the-line">Billing</span>
                    <label>Name</label>
                    <Input type="text"  name="customer" onBlur={this.handleChange}/>
                    {this.state.nameValidation===false?<span className="error">Feild must not be Empty or Numerical !!</span>:""}

                    <label>Email</label>
                    <Input type="email" name="Email" onBlur={this.handleChange}/>
                    {this.state.emailValidation===false?<span className="error">Feild must not be Empty</span>:""}

                    <label>City</label>
                    <Input type="text" onBlur={this.handleChange} name="city"/>
                    {this.state.cityValidation===false?<span className="error">Feild must not be Empty</span>:""}

                    <label>Address</label>
                    <Input type="text" name="address" onBlur={this.handleChange}/>
                    {this.state.addressValidation===false?<span className="error">Feild must not be Empty</span>:""}

                    <label>ZIP Code</label>
                    <Input type="text" name="zip" onBlur={this.handleChange}/>
                    {this.state.zipValidation===false?<span className="error">Feild must not be Empty</span>:""}

                    <label>Country</label>
                    <select name="country" onBlur={this.handleChange}>
                        <option value="0">Select</option>
                        <option value="1">India</option>
                        <option value="2">USA</option>
                        <option value="3">UK</option>
                        <option value="4">UAE</option>
                    </select>
                </form>

                <div className="same-as" style={display}>
                    <label >Same as Billing <input type="checkbox" onClick={this.markSameAsBilling}/>
                    </label>
                </div>
                {this.state.sameAsBilling?isSame=true:isSame=false}
                <div className="form-container-2" style={display}>
                    <span className="over-the-line">Shipping</span>
                    <label>Name</label>
                    <Input
                        type="text"
                        name="shippingName"
                        value={field.customer}
                        markDisable={isSame}
                        onBlur={this.handleChange}/>

                    <label>Email</label>
                    <Input type="email"
                           name="shippingMail"
                           value={field.Email}
                           markDisable={isSame}
                           onBlur={this.handleChange}/>

                    <label>City</label>
                    <Input type="text"
                           name="shippingCity"
                           value={field.city}
                           markDisable={isSame}
                           onBlur={this.handleChange}/>

                    <label>Address</label>
                    <Input type="text"
                           name="shippingAddress"
                           value={field.address}
                           markDisable={isSame}
                           onBlur={this.handleChange}/>

                    <label>ZIP Code</label>
                    <Input type="text"
                           name="shippingZip"
                           value={field.zip}
                           markDisable={isSame}
                           onBlur={this.handleChange}/>

                    <label>Country</label>
                    <select name="shippingCountry"
                            value={field.country}
                            disabled={isSame}
                            onBlur={this.handleChange}>
                        <option value="0">Select</option>
                        <option value="1">India</option>
                        <option value="2">USA</option>
                        <option value="3">UK</option>
                        <option value="4">UAE</option>
                    </select>
                </div>
                <div className="order-summary" style={position}>
                    <h5>Your Order</h5>
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
                    <div className="net-worth">Net Worth: $ {netAmount}</div>
                    <div className="gst-total">Total GST (9%) : $ {gst} </div>
                    <div className="total-amount">Sub Total:(GST inclusive) $ {subTotal}</div>
                    <button className="red-button place-it" style={style} onClick={this.handleOrder}>Place Order</button>
                </div>
                <button className="red-button" onClick={this.validate} style={display}>Submit</button>
            </div>
        );
    }
}
const mapStateToProps=(reduxStore)=>({
    reduxStore
})

const mapDispatchToProps=(dispatch)=>({
    validate:(data)=>dispatch(validate(data)),
    updateForm:(data)=>dispatch(updateForm(data)),
    markSameAs:(data)=>dispatch(markSameCheck(data)),
})

Details=connect(mapStateToProps,mapDispatchToProps)(Details);
withRouter(Details);