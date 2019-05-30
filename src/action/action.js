export const set=(data)=>{
    return{
        type: 'UPDATE',
        data
    }
}

export const validate=(data)=>{
    return{
        type: "VALIDATE",
        data
    }
}

export const updateCart=(data)=>{
    return{
        type: "UPDATE_CART",
        data:data,
    }
}

export const emptyCart={
        type: "EMPTY"
}

export const updateRow=(data)=>{
    return{
        type: "UPDATE_ROW",
        data,
    }
}

export const updateForm=(data)=>{
    return{
        type: "UPDATE_FORM",
        data
    }
}
export const updateQuantity=(data,index)=>{
    return{
        type: "UPDATE_QTY",
        data:data,
        index:index
    }
}
export const updateColor=(data,index)=>{
    return{
        type: "UPDATE_COLOR",
        data:data,
        index:index
    }
}

export const addedToCart=(data)=>{
    return{
        type: "ADDED_TO_CART",
        data:data,
    }
}

export const updateAmount=(gst,netAmount,subTotal)=>{
    return{
        type: "UPDATE_AMOUNT",
        gst:gst,
        netAmount:netAmount,
        subTotal:subTotal

    }
}

export const overview=(data)=>{
    return{
        type: "OVERVIEW",
        data,
    }
}


export const markSameCheck=(data)=>{
    return{
        type: "MARK_SAME",
        data
    }
}

