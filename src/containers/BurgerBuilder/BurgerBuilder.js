import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.5,
    bacon: 1.5
};

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: null,
            totalPrice: 4,
            purchasable: false,
            purchasing: false,
            loading: false,
            error: false
        }
    }

    componentWillMount () {
        axios.get('https://tasty-burger-app.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
                console.log(response.data);
            })
            .catch(error => {
                this.setState({error: true});
            })
    }

    updatePurchaseState(ingredients){
        //we pass ingredients so we will always have the last set of ingredients
        //will create an array ['salad','bacon','cheese'];
        const sum = Object.keys(ingredients)
            .map( igKey => {
                //ingredients[bacon]// 0
                return ingredients[igKey]
            })
            //[0, 0, 0, 0]
            .reduce( (sum,el) => {
                return sum + el;
            },0)

            //either true or false
            this.setState({purchasable:sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        //if there are no Ingredients, stop removing them
        if (oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () => {
        //alert('You continue!');
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.price,
            customer: {
                name: 'Nataliia Stefurak',
                address: {
                    street: 'Blackthorn',
                    postalCode: 'N5GD3J',
                    country: 'Canada'
                },
                email: 'st@gmail.com'
            },
            delivery: 'fast'
        }

        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({loading: false, purchasing: false})
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false, purchasing: false});
            });
    }

    render(){

        //copy the object in immutable way
        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            //return true or false and we update our copied object
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
               
        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler} 
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                    ordered={this.purchaseHandler} />
                </Aux>
            );

            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients} 
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                totalPrice={this.state.totalPrice} /> ;
        }
     
        if(this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);