import React,{Component} from 'react';
import {connect} from "react-redux";
class Input extends Component {
    render(){
        const {name,type,onBlur,value,markDisable}=this.props;
        return(
            <div className="input-container">
                <input
                    type={type}
                    onBlur={onBlur}
                    name={name}
                    value={value}
                    disabled={markDisable}
                />
            </div>
        )
    }
}


const mapStateToProps=(reduxState)=>({
    reduxState
})
Input=connect(mapStateToProps,null)(Input);
export default Input;