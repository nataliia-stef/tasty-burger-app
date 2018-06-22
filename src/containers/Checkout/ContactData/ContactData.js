import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        const order = {
            //received from the Checkout, now we can get the data from props
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Nataliia Stefurak',
                address: {
                    street: 'Blackthorn',
                    postalCode: 'N5GD3J',
                    country: 'Canada'
                },
                email: 'st@gmail.com'
            },
        //     delivery: 'fast'
        }

        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({ loading: false });
                //by default it will not be passed, but we passed props in render to <ContactData {...props} />
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false });
            });
    }

    render () {
        let form = (
            <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                    <input className={classes.Input}type="email" name="email" placeholder="Your Email" />
                    <input className={classes.Input}type="text" name="street" placeholder="Your Street" />
                    <input className={classes.Input}type="text" name="postal" placeholder="Your Postal code" />

                    <Button 
                        btnType="Success"
                        clicked={this.orderHandler}>ORDER</Button>
                </form>
        );
        if(this.state.loading) {
            form = <Spinner />
        }
        return (

            <div className={classes.ContactData}>
                <h4>Enter you contact data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;