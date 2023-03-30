import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Card from '../Card/Card';

import Products from '../Product/Product';

import './Shop.css'

const Shop = () => {
    const [products, setProducts]= useState([]);
    const [cart, setCart] = useState([])


    useEffect( () =>{
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))

    }, [])

    useEffect( () =>{
        
        const storedCart = getShoppingCart();
        const savedCart = [];
        //step1: get id of the addedProduct
        for(const id in storedCart){
            
        const addedProduct = products.find(product => product.id === id)
        if(addedProduct){
            //setp 3: add quantity
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            //step 4: add th addedProduct to the saved cart
            savedCart.push(addedProduct);
        }
        //console.log('added Product', addedProduct)
        }
        //step5: set the cart
        setCart(savedCart);
    } , [products])

    const handleAddToCart = (product) => {
        //cart.push(product);
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id)
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Products
                    key={product.id}
                    product={product}
                    handleAddToCart={handleAddToCart}
                    ></Products>)
                }
            </div>
            <div className='cart-container'>
                <Card cart={cart}></Card>
            </div>
            
        </div>
    );
};

export default Shop;