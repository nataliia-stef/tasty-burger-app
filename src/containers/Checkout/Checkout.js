import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';

import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: { },
        totalPrice: 0
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;

        //to look through different query entries
        for(let param of query.entries()){
            if(param[0] === 'price') {
                price = param[1];
            } else { ingredients[param[0]] = +param[1]; }
        }

        this.setState({ingredients: ingredients, totalPrice: price});
    }

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCanceled={this.checkoutCanceledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (<ContactData ingredients={this.state.ingredients} {...props} price={this.state.totalPrice} />)} />
            </div>
        )
    }
}

export default Checkout;