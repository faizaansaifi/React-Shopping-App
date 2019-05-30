import React,{Component} from 'react';
import './App.css';
import ProductContainer from "./components/productContainer";
import {ItemDetail} from "./components/ItemDetail";
class App extends Component {
  render() {
    return (
        <div className="App">
          <ProductContainer/>
          {/*<CartView/>*/}
          {/*<Details/>*/}
          {/*<ItemDetail/>*/}
        </div>
    );
  }
}

export default App;
