import React from 'react';
import {connect} from "react-redux";

let Options=(props)=>{
    const {color,size,isDisable,value}=props;
    let defaultColor=color[props.colorIndex];
    return(
        <div className="options">
            <select onChange={props.handleColor} className="select-color" style={{color:defaultColor}}>
                {color.map((data,index) => {
                    return <option value={index} style={{color:data}} >٭</option>
                })
                }
            </select>

            <select onChange={props.handleSize} className="select-size">
                {size.map((data)=>{
                    return <option value={data}>{data}</option>
                })}
            </select>
            <button
                onClick={props.handleAddtoCart}
                className="add-to-cart "
                value={value}
                disabled={isDisable}>
                <span className="add-to">Add to cart</span>
                <span className="added">Added ✅</span>
            </button>
        </div>
    )
}
const mapStateToProps=(reduxStore)=>({
    reduxStore
})

Options=connect(mapStateToProps,null)(Options);
export default Options;