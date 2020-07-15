import React from 'react'
import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/navbar.component.js'
import './App.css'
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Components/home.component.js'
import Wine from './Components/wine.component.js'
import Activities from './Components/activities.component.js'
import About from './Components/about.component.js'
import Contact from './Components/contact.component.js'
import Single from './Components/single.component.js'
import Cart from './Components/cart.component.js'
import Checkout from './Components/checkout.component.js'
function App(){
	return (
		<div className="container-fluid">
			<Router>
				<Header/>
				<Route path ="/" exact component={Home} />                                 
				<Route path ="/wine" component={Wine} /> 
				<Route path ="/activities" component={Activities} />    
				<Route path ="/cart" component={Cart} />
				<Route path = "/checkout" component={Checkout} />
				<Route path ="/about" component={About} />              
				<Route path ="/contact" component={Contact}/>
				<Route path ="/tour/:slug" component={Single}/>          
			</Router>
		</div>
	);
}

export default App;
