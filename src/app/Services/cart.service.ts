import { Injectable } from '@angular/core';
import { Observable, throwError, Subject, BehaviorSubject, of } from 'rxjs';
import { Product } from '../models/products';
import { CartItem } from '../models/cart-items';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject([]);
  private cartCount: BehaviorSubject<number> = new BehaviorSubject(0);
  private cart: CartItem[];

  constructor() { }

  getCart(): Observable<CartItem[]>{
    this.GetLocalStorage();

    this.cartSubject.next(this.cart);

    return this.cartSubject.asObservable();
  }
  
  //ajout d'un produit dans le panier
  addProductToCart(product: Product){
    this.GetLocalStorage();

    if(this.cartSubject.value.length >= 1 ){
      let index = this.findProductInCart(product, this.cart);
      if(index == undefined || index == -1)
      {
        this.cart.push({nb: 1, product: product})
      }
      else{
        this.cart[index].nb += 1
      }
    }
    else{
      this.cart.push({nb: 1, product: product})
    }

    localStorage.setItem("cart", JSON.stringify(this.cart));
    this.cartSubject.next(this.cart)
    

    //on compte le nombre de produit a chaque ajout
    this.countCart();
  }

  //suppression d'un produit dans le panier
  removeProductLineFromCart(product: CartItem){
    this.GetLocalStorage();

    if(this.cart == null){
      this.cart = [];
    }

    this.cart = this.cart.filter(function(item) {
      return item !== product
    });

    localStorage.setItem("cart", JSON.stringify(this.cart));

    //on compte le nombre de produit a chaque suppression
    this.countCart();
  }

  //compte le nombre de produit dans le panier
  countCart(){
    this.GetLocalStorage();

    let count:number = 0

    for(let i = 0; i < this.cart.length; i++){
      count += this.cart[i].nb;
    }

    this.cartCount.next(count);
  }

  //retourne la quantité de produit dans le panier
  getCartQuantity(): Observable<number>{
    this.countCart();

    return this.cartCount.asObservable();
  }

  private findProductInCart(product: Product, cart: CartItem[]){
    return cart.findIndex((obj => obj.product.id ==  product.id));
  }

  private GetLocalStorage(){
    this.cart = JSON.parse(localStorage.getItem("cart"));

    if(this.cart == null){
      this.cart = [];
    }
  }
  
}
