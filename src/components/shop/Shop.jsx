import React, { useEffect, useState } from 'react';
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

    const handleAddToCart = (product) => {
        //cart.push(product);
        const newCart = [...cart, product];
        setCart(newCart);
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