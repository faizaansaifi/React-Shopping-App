
let initialState = {
    products: [],
    inputValidation: false,
    update_request:false,
    form:{},
    buttonCount:[],
    color: ['blue','red','yellow'],
    images: [
        {blue:"https://s3.amazonaws.com/it-academy-photos-bucket/img1.jpg"},
        {red:"https://s3.amazonaws.com/it-academy-photos-bucket/img2.jpg"},
        {yellow:"https://s3.amazonaws.com/it-academy-photos-bucket/img3.jpg"}
    ],
    sizes:["SMALL","MEDIUM","LARGE"],
}

export const rootReducer = (state=initialState, action)=>{
    switch (action.type) {
        case 'UPDATE' : {
            let obj = action.data;
            const {product,selectedColor,size}=obj;
            const{products}=state;
            let productDetails=[]
            products.forEach((data,index)=>{
                for (let key in data){
                    if(data[key]===product){
                        let x=[]
                        Object.values(data).forEach((data,index)=>{
                            let itemColor=true,itemSize=true;
                            if(data===selectedColor){
                                itemColor=false;
                                x[0]=itemColor
                            }
                            else if(data===size){
                                itemSize=false;
                                x[1]=itemSize
                            }
                        })
                        productDetails.push(...x);
                    }
                }
            })
            let first=productDetails[0];
            let second=productDetails[1];
            console.log("Color",first,"Size",second," First and Second");
            if((first || second) ===false)
                alert("Already in the cart")
            else
                return {...state, products: [...state.products, obj]}
        }
        case "VALIDATE" :{
            let inputValidation = action.data;
            return { ...state, inputValidation }
        }
        case "MARK_SAME" :{
            let markSameAs = action.data;
            return { ...state, markSameAs }
        }
        case "UPDATE_CART": {
            let update_request=action.data;
            return {...state,update_request}
        }
        case "EMPTY": {
            return {...state,products:[]}
        }
        case "UPDATE_ROW": {
            let rowId=action.data;
            console.log(rowId,"Reducer rowId")
            let arr=state.products.filter((data,index)=>{
                if(rowId!==index)
                    return data
            })
            return {...state,products:[...arr]}
        }
        case "UPDATE_FORM": {
            let obj=action.data;
            return {...state,form:{...state.form,obj}}
        }
        case "UPDATE_QTY": {
            let count=action.data;
            let index=action.index;
            const {products}=state;
            let arr=products.map((data,position)=> {
                if (position === index){
                    data.qty = count;
                    data.total=Math.round(data.amount*data.qty);
                }
                return data;
            });
            return {...state,products:[...arr]}
        }
        case "UPDATE_COLOR": {
            let clr=action.data;
            let index=action.index;
            const {products}=state;
            let arr=products.map((data,position)=> {
                if (position === index){
                    data.selectedColor = clr;
                }
                return data;
            });
            return {...state,products:[...arr]}
        }
        case "ADDED_TO_CART": {
            let isAdded=action.data;
            return {...state,}
        }
        case "UPDATE_AMOUNT": {
            let gst=action.gst;
            let netAmount=action.netAmount;
            let subTotal=action.subTotal;
            return {...state,gst,netAmount,subTotal}
        }

        case "OVERVIEW": {
            let obj=action.data;
            return {...state,overview:{obj}}
        }

        default: {
            return state;
        }
    }
}
