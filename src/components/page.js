import React, { useState, useEffect }  from 'react';
import ReactDOM from 'react';
import '../style/basic.scss';


// VARIABLES
var total = 0;
var gross = 0;
var tax = 0;

var totalFormat;
var grossFormat;
var taxFormat;

var selectedSize;
var selectedIndex;

var itemsArray = [];
var products = [{
      name: 'yellow hoodie',
      url: 'https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2019/09/26/goods-first-img/1569462128976848909.jpg',
      price: 39.99
    },{
      name: 'hat',
      url: 'https://www.ikea.com/us/en/images/products/knorva-hat__0812162_PE771942_S5.JPG?f=s',
      price: 10.99
    },{
        name: 'socks',
       url: 'https://cdn.shopify.com/s/files/1/0026/7331/1788/products/6_ac3703c5-dd8a-452f-a45d-62e37bc8c73b_grande.jpg?v=1576112155',
      price: 4.99
    },{
      name: 'Pastel shirt',
      url: 'https://i2.wp.com/heartpunk.co/wp-content/uploads/2019/03/mockup-c9d660d0.jpg?fit=1000%2C1000&ssl=1',
      price: 29.99
    }]


//SHOPPING CART - SHOPPING

class SizeButton extends React.Component{
  constructor(){
    super();
    this.state = {
      className: 'size-button',
      clicked: 0
    }
  }
  
  //ANIMATE IF SIBLING BUTTON CLICKED
  componentWillReceiveProps(nextProps){
     
    //HAS THE ADD BUTTON BEEN CLICKED
    if(nextProps.productCardIsClicked != this.state.clicked){
       
      //WAS THIS THE SIBLING BUTTON
      if(nextProps.productCardClickedIndex == this.props.value){

        //ANIMATION
        //ADD TRANSITION CLASS
        this.setState({
          className: "size-button size-alert"
        });

        //REMOVE FOR REUSABILITY
        setTimeout(() => {
          this.setState({
            clicked: this.state.clicked + 1,
            className: "size-button"
          });
        }, 300);
      }
    }
  }
  
  //SET THE DESIRED SIZE - REVERTS TO NULL AFTER APPLICATION FUNCTION
  clickHandler(size){
    selectedSize = size;
    selectedIndex = this.props.value;
  }
  
  render(){
    const sizeDisplay = this.props.productCardSize;
    const sizeLetter = sizeDisplay.charAt(0);
    const btnValue = this.props.value;
    
    return(
      <div className="product-size">
        <button className={this.state.className} onClick={this.clickHandler.bind(this, sizeDisplay, btnValue)}>{sizeLetter}</button>
      </div>
    );
  }
}

class AddToCartButton extends React.Component {
  
  render(){
    var price = this.props.productCardPrice;
    var item = this.props.productCardName;
    var index = this.props.productCardIndex;
    
    return(
      <button value={this.props.productCardIndex} onClick={this.props.productCardClick.bind(this, price, item, index)}>Add</button>
    );
  }
}

class ProductCard extends React.Component {
  
  render(){
    var url = this.props.background;
    var value = this.props.value;
    
    return(
      <div className="product-card-container">
        <div className="product-card-top" style={{backgroundImage: `url(${url})`}}>
          <div className="product-card-price">
            <div className="price-sign">
              <h4>$</h4>
            </div>
            <div className="price-amount">
              <h4>{this.props.productsPrice}</h4>
            </div>
          </div>
        </div>
        <div className="product-card-bottom">
          <div className="card-bottom-wrapper">
            <div className="card-bottom-inside">
              <div className="product-title">
                <h3>{this.props.name}</h3>
              </div>
              <div className="product-selection">
                  <div className="size-selection">
                      <SizeButton productCardIsClicked={this.props.productsIsClicked} productCardClickedIndex={this.props.productsClickedIndex} productCardSize="Small" value={value}/>
                      <SizeButton productCardIsClicked={this.props.productsIsClicked} productCardClickedIndex={this.props.productsClickedIndex} productCardSize="Medium" value={value}/>
                      <SizeButton productCardIsClicked={this.props.productsIsClicked} productCardClickedIndex={this.props.productsClickedIndex} productCardSize="Large" value={value}/>
                    </div>
                <div className="product-checkout">
                  <AddToCartButton productCardClick={this.props.productsClick} productCardPrice={this.props.productsPrice} productCardIndex={this.props.value} productCardName={this.props.name}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Products extends React.Component {
  constructor(){
    super();
    this.state = {
      clicked: 1,
      className: "size-button"
    }
  }
  
  render(){
    
    //CREATE PRODUCT CARDS
    var productElements = Object.keys(products).map((key, i) => {
      return(
        <ProductCard key={i} value={i} name={products[i].name} productsPrice={products[i].price} productsIsClicked={this.props.orderScreenIsClicked} productsClick={this.props.orderScreenClick} productsClickedIndex={this.props.orderScreenClickedIndex} background={products[i].url}/>
      );
    });
    
    return(
      <div id="products-container">
        {productElements}
     </div>
    );
  }
}

class ShoppingCart extends React.Component {
  render(){
    var grossAmount = this.props.gross;
    
    return(
      <div id="shoppingCart-container">
        <div id="shoppingCart-top">
          <h1>Shopping Cart</h1>
        </div>
        <div id="shoppingCart-bottom">
          <h3>Gross: {grossFormat}</h3>
          <h3>Tax: {taxFormat}</h3>
          <h2>Total: {totalFormat}</h2>
          <div id="checkout-button-container">
            <button id="checkout-button" onClick={this.props.orderScreenSwitch.bind(this, 1)}>Check Out</button>
          </div>
        </div>
      </div>
    );
  }
}

class OrderScreen extends React.Component {
  
  
  
  render(){
    return(
      <div id="order-container" className={this.props.applicationClass}>
        <Products orderScreenIsClicked={this.props.applicationClicked} orderScreenClick={this.props.applicationClick} orderScreenClickedIndex={this.props.applicationClickedIndex}/>
        <ShoppingCart orderScreenSwitch={this.props.applicationScreenSwitch}/>
      </div>
    );
  }
}

//SHOPPING CART - CHECK OUT
class ItemRow extends React.Component {
  render(){
    var index = this.props.checkOutIndex;
    
    return(
      <tr>
        <td data-title="name">{this.props.checkOutName}</td>
        <td data-title="size">{this.props.checkOutSize}</td>
        <td data-title="price">{this.props.checkOutPrice}</td>
        <td className="td-remove" data-title="remove">
          <button className="remove-button" onClick={this.props.checkOutRemoveClick.bind(this, index)}>-</button>
        </td>
      </tr>
    )
  }
}

class CheckOut extends React.Component {
  render(){
    var tableRows = Object.keys(itemsArray).map((key, i) => {
      
      return(<ItemRow checkOutName={itemsArray[i].itemType} checkOutSize={itemsArray[i].size.charAt(0)} checkOutPrice={itemsArray[i].price} checkOutIndex={i} checkOutRemoveClick={this.props.applicationRemoveClick}/>)
    })
    
    return(
      <div id="checkout-container">
        <div id="checkout-container-wrapper">
          <div id="checkout-container-inside">
            <div id="back-button-container">
            <button className="checkout-button" onClick={this.props.applicationScreenSwitch.bind(this, 2)}>Back</button>
            </div>
            <div id="shoppingcart-list-container">
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows}
                </tbody>
              </table>
            </div>
            <div id="shoppingcart-checkout-container">
              <div id="shoppingcart-total">
                <h2>Total: {totalFormat}</h2>
              </div>
              <div id="shoppingcart-checkout-button">
                <a href="#form"><button className="checkout-button">Check Out</button></a>
              </div>
            </div>
            <FormApp/>
          </div>
        </div>
      </div>
    )
  }
}

//SHOPPING CART - APP
class Page extends React.Component {
  constructor(){
    super();
    this.state = {
      orderFade: '',
      containerSlide: '',
      clickedIndex: null,
      items: null
    }
    
    this.screenSwitch = this.screenSwitch.bind(this);
    this.applicationClick = this.applicationClick.bind(this);
    this.removeClick = this.removeClick.bind(this);
  }
  
  //SCREEN SWITCH ANIMATION
  screenSwitch(x){
    if(x == 1){
      this.setState({
        orderFade: 'order-container-fade',
        containerSlide: 'screen-swipe'
      })
    }if(x == 2){
      this.setState({
        orderFade: '',
        containerSlide: ''
      })
    }if(x == 3){
      this.setState({
        orderFade: 'checkout-container-fade',
        containerSlide: ''
      })
    }
  }
  
  //UPDATES UI ON ADD BUTTON CLICK
  //THIS IS PASSED TO ADD BUTTON
  //GETS INFORMATION FROM SIZE BUTTONS
  applicationClick(amount, item, index){
    
    if(selectedSize != null && selectedIndex == index){
    
      //CALC TOTALS
      gross = gross + amount;
      tax = gross * .0825;
      total = gross + tax;

      grossFormat = gross.toFixed(2);
      taxFormat = tax.toFixed(2);
      totalFormat = total.toFixed(2);

      //UPDATE SHOPING CART
      itemsArray.push({
        itemType: item,
        size: selectedSize,
        price: amount
      });
    }
    
    //RESET SIZE & INDEX SO SIZE ANIMATION CAN RERUN
    selectedSize = null;
    selectedIndex = null;
    
    //UPDATE UI
    this.setState({
      clickedIndex: null,
      items: this.state.items + 1
    });
    
  }
  
  //REMOVE ITEMS IN CHECK OUT
  removeClick(index){
    //REMOVE ITEM INFO
    gross = gross - itemsArray[index].price;
    tax = gross * .0825;
    total = gross + tax;
    
    grossFormat = Math.abs(gross.toFixed(2));
    taxFormat = Math.abs(tax.toFixed(2));
    totalFormat = Math.abs(total.toFixed(2));
    
    itemsArray.splice(index, 1);
    
    this.setState({
      items: this.state.items - 1
    });
  }
  
  render(){
    return(
      <div id="app-container">
        <div id="app-container-inside" className={this.state.containerSlide}>
          <OrderScreen applicationScreenSwitch={this.screenSwitch} applicationClass={this.state.orderFade} applicationClick={this.applicationClick} applicationClickedIndex={this.state.clickedIndex} applicationIsClicked={this.state.clicked}/>
          <CheckOut applicationScreenSwitch={this.screenSwitch} applicationRemoveClick={this.removeClick}applicationClass={this.state.orderFade} applicationClick={this.applicationClick} applicationClickedIndex={this.state.clickedIndex} applicationIsClicked={this.state.clicked}/>
        </div>
      </div>
      
    )
  }
}


class FormApp extends React.Component{
  render() {
    return (
      <div id="form-container" className="container">
        <ContentBody />
      </div>  
    );
  }
}
const ContentBody = () => {

    return (
      <div className="row">
        <div className="col-md-12" id="form">
            <FormBody/>
        </div>
      </div>
    );
}

const FormBody = () => {
  const [info, setinfo] = useState([]);
  const [newInfo, setNewInfo] = useState({name: '', lastname: '', email: '', address: ''});

  function handleSave (event, type) {
      const tempInfo = {...newInfo};
      tempInfo[type] = event.target.value;
      setNewInfo(tempInfo);
  };


  const addInfo = (event) =>{
    event.preventDefault()
    const infoObject = {
      name: newInfo.name,
      lastname: newInfo.lastname,
      email: newInfo.email,
      address: newInfo.address
    }
    console.log(info, setNewInfo)
    setinfo(info.concat(infoObject))
    setNewInfo('')
    
  }
  return (
    <form name="userform" id="userform" onSubmit={event => addInfo(event, newInfo)}>
      <div className="form-group">
        <label>Name</label>
          <input type="text" className="form-control" value={newInfo.name} onChange={e => handleSave(e, "name")} placeholder="First name" />
      </div>
      <div className="form-group">
        <label>Lastname</label>
          <input type="text" className="form-control" value={newInfo.lastname} onChange={e => handleSave(e, "lastname")} placeholder="Lastname"/>
      </div>
      <div className="form-group">
        <label>Email</label>
          <input type="text" className="form-control" placeholder="Email" value={newInfo.email} onChange={e => handleSave(e, "email")}/>
      </div>
      <div className="form-group">
        <label>Address</label>
          <input type="text" className="form-control" placeholder="Address" value={newInfo.address} onChange={e => handleSave(e, "address")}/>
      </div>
      <div className="form-group">
        <input className="btn btn-primary" type="submit" value="submit" data-toggle="modal" data-target="#myModal"/>
      </div>
      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">

            
            <div className="modal-header">
              <h2>Kiitos!</h2>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>

            
            <div className="modal-body">
              <p>Tilauksesi on matkalla osoitteeseesi</p>
              <p>Saat lisätietoja sähköpostiisi</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Page;