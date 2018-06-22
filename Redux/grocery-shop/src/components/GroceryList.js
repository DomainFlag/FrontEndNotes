import React from "react"
import { Component } from "react"
import {connect} from "react-redux"
import { ACTIONS } from "./../reducers/products"

import ProductAdder from "./../assets/shopping-cart.svg"

export class GroceryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleCart : "none",
            product : "",
            value : "content-form-pop"
        };

    }

    onChange = () => {
        if(this.state.toggleCart === "none")
            this.setState({ toggleCart : "initial" });
        else this.setState({ toggleCart : "none" });
    };

    onInputChange = (e) => {
        this.setState({ product: e.target.value });
    };

    onAdd = () => {
        this.props.onAddProduct(this.state.product, "3.14");
        this.setState({ product: "" })
    };

    render() {
        let {quotation} = this.props.availableCurrencies.filter((currency) => {
            return currency.currency === this.props.usedCurrency;
        })[0];

        return <div className="grocery-list">
            {
                this.props.groceries.map((product, index) => (
                    <div key={index} className="product">
                        <p className="productName">{product.productName}</p>
                        <p className="productPrice">{(product.productPrice*quotation).toFixed(2) + " " + this.props.usedCurrency}</p>
                    </div>
                ))
            }

            <div className="cart-manage">
                <img id="content-adder" className="product-adder" src={ProductAdder} onClick={this.onChange}/>

                <div className={`content-form ${this.state.value}`} style={{display: this.state.toggleCart}}>
                    <input className="form-input" type="text" onChange={this.onInputChange} value={this.state.product}/>
                    <button className="form-submit" onClick={this.onAdd}>Submit</button>
                </div>
            </div>
        </div>
    }
}

const mapDispatchToProps = (dispatch) => ({
    onAddProduct : (productName, productPrice) => dispatch(ACTIONS.ADD_PRODUCT(productName, productPrice))
});

const mapStateToProps = state => ({
    "groceries" : state.products,
    "usedCurrency" : state.currency.usedCurrency,
    "availableCurrencies" : state.currency.availableCurrencies
});

export default connect(mapStateToProps, mapDispatchToProps)(GroceryList);