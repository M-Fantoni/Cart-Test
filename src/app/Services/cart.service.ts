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

  constructor() { }

  getCart(): Observable<CartItem[]>{
    return this.cartSubject.asObservable();
  }
  
  //ajout d'un produit dans le panier
  addProductToCart(product: Product){

    let cart: CartItem[] = this.cartSubject.value;

    if(this.cartSubject.value.length >= 1 ){
      let index = this.findProductInCart(product, cart);
      if(index == undefined || index == -1)
      {
        cart.push({nb: 1, product: product})
      }
      else{
        cart[index].nb += 1
      }
    }
    else{
      cart.push({nb: 1, product: product})
    }

    this.cartSubject.next(cart)
    //on compte le nombre de produit a chaque ajout
    this.countCart();
  }

  //suppression d'un produit dans le panier
  removeProductLineFromCart(product: CartItem){
    // this.cartSubject.next()

    //on compte le nombre de produit a chaque suppression
    this.countCart();
  }

  //compte le nombre de produit dans le panier
  countCart(){
    let cart: CartItem[] = this.cartSubject.value;
    let count:number = 0

    for(let i = 0; i < cart.length; i++){
      count += cart[i].nb;
    }

    this.cartCount.next(count);
  }

  //retourne la quantité de produit dans le panier
  getCartQuantity(): Observable<number>{
    return this.cartCount.asObservable();
  }

  private findProductInCart(product: Product, cart: CartItem[]){
    return cart.findIndex((obj => obj.product.id ==  product.id));
  }
  
}
