import {Component, OnInit} from '@angular/core';
import {ICart} from '../../../interfaces/cart';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss'],
})
export class CartDetailComponent implements OnInit {
  cart: ICart = null as any;
  isLoading = false;

  constructor(

  ) {}

  ngOnInit(): void {

  }

}
