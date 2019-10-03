import React from 'react';
import '../style/basic.scss';

const Box = (props) => {
    return(
        <div className="col-3 col-sm-3 col-md-3 box">
            <img className=" py-5" src={props.product.img} alt={props.product.name}/>
            <div className="info pt-4">
                <h2>{props.product.name}</h2>
                <h3>{props.product.price}</h3>
                <br/>
                <p>{props.product.color}</p>
            </div>
        </div>
    )
}

export default function Products (props){
    return(
        <div className="row">
            {props.products.map(c => (
                <Box product = {c} key = {c.id}/>
            ))}
        </div>
    )

}