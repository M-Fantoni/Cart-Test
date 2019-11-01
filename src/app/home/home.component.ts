import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';
import { CartService } from '../Services/cart.service';
import { Product } from '../models/products';
import {CartItem} from '../models/cart-items'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[];
  cart: CartItem[] = new Array();

  constructor( public api: DataService, public cartService: CartService ) { }

  ngOnInit() {
    this.getProducts();
    this.getCart();
  }

  //on récupère tous les produits depuis le service de l'api
  getProducts() {
    this.api.getProducts().subscribe((data) => {
      //on limite artificiellement le nombre de résultat avec splice.
      this.products = data.splice(0,50);
      console.log(data);
    });
  }

  //on récupère le panier depuis son service
  getCart(){
    this.cartService.getCart().subscribe(x => { 
      this.cart = new Array();
      this.cart = x; 
    })
  }

  //ajout de produit dans le panier
  AddToCart(product: Product){
    console.log(product);
    this.cartService.addProductToCart(product);
    console.log(this.cart);
  }

  
}
