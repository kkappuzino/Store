import React from 'react';
import '../style/basic.scss';
import Products from './Products';
import pinimg from '../img/pin.jpg';
import hodimg from '../img/hoodie.jpg';
import shimg from '../img/shirt.jpg';
import mimg from '../img/mug.jpg';

const pin = {id:0, name:"Pin", size:"10cm", color:"white", price:"10€", img:pinimg};
const hoodie = {id:1, name:"Hoodie", size:"32-44", color:"mustard", price:"30€", img:hodimg};
const shirt = {id:2, name:"Shirt", size:"32-44", color:"pastel pink", price:"25€", img:shimg};
const mug = {id:3, name:"Mug", size:"One Size", color:"white", price:"15€", img:mimg};
const products = [pin, hoodie, shirt, mug];

export default function Page() {
    return(
        <div className="container-fluid">
            <Products products={products}/>

        </div>

    )


}