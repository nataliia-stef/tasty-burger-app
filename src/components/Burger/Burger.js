import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    //get array from Object keys, keys are unordered
    //['salad','bacon','cheese','meat']
    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingredKey => {
            return [...Array(props.ingredients[ingredKey] )].map( (_, i) => {
                //map our Object into the array of ingredients
                return <BurgerIngredient key={ingredKey + i} type={ingredKey} />
            });
        })
        //we pass the previous value and the current value
        //accepts a function and an initial value - empty array (initial value of reduced value )
        .reduce((arr,el) => {
            return arr.concat(el)
        },[]);

        if(transformedIngredients.length === 0){
            transformedIngredients = <p>Please start adding ingredients!</p>
        }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;