import { Component, OnInit } from '@angular/core';
import { CartService } from './Services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'Cart-Test';
  cartQuantity: number;

  constructor( public cartService: CartService ) { }

  ngOnInit() {
    this.countCart();
  }

  //on interroge le service de pannier pour savoir la quantité
  countCart(){
    this.cartService.getCartQuantity().subscribe(x => { this.cartQuantity = x});
  }
}
