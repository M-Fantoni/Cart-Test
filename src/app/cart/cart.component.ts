import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { CartItem } from '../models/cart-items';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: CartItem[] = new Array();

  constructor(public cartService: CartService) { }

  ngOnInit() {
    this.getCart();
  }

  //récupère le panier depuis son service
  getCart(){
    this.cartService.getCart().subscribe(x => { 
      this.cart = new Array();
      this.cart = x; 
    })
  }

  //supprime une ligne de produit dans le panier
  removeProductLine(item: CartItem){
    this.cartService.removeProductLineFromCart(item);
    this.getCart();
  }
}
