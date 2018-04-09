import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    //could be functional component
    componentWillUpdate() {
        console.log('OS will update!');
    }
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map( ingKey => {
            return <li key={ingKey}>
                        <span style={{ textTransform: 'capitalize' }}>{ingKey}</span>: {this.props.ingredients[ingKey]}
                    </li>
        })

        return (
            <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total price:  <span style={{'fontWeight': 'bold'}}>${this.props.totalPrice.toFixed(2)}</span></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </Aux>
        );
    }
} 
   
   
export default OrderSummary;