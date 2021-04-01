import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productArray: any;
  totalPrice: number = 0;
  remItem = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    let productDetails = localStorage.getItem("productDetails");
    if (productDetails) {
      this.productArray = JSON.parse(productDetails);
      this.calculatePrice();
    }
  }

  addItem(selectedItemId: number) {
    let itemCount = this.productArray[selectedItemId].itemCount;
    this.productArray[selectedItemId].itemCount = itemCount + 1;
    this.setHeaderCartCount();
  }

  removeItem(selectedItemId: number) {
    let itemCount = this.productArray[selectedItemId].itemCount;
    if (itemCount > 1) this.productArray[selectedItemId].itemCount = itemCount - 1;
    else if (itemCount == 1) {
      this.productArray[selectedItemId].itemCount = 0;
      this.remItem = true;
    }
    this.setHeaderCartCount();
  }

  removeFromCart(selectedItemId: number) {
    this.productArray[selectedItemId].itemCount = 0;
    this.remItem = true;
    this.setHeaderCartCount();
  }

  backToProduct() {
    this.router.navigateByUrl(`/products`);
  }

  setHeaderCartCount() {
    let cartCount = 0;
    for (let i = 0; i < this.productArray.length; i++) {
      let obj = this.productArray[i];
      if (obj.itemCount > 0) cartCount = cartCount + 1;
    }
    localStorage.setItem('count', cartCount.toString());
    localStorage.setItem("productDetails", JSON.stringify(this.productArray));
    this.calculatePrice();
    if (this.remItem) window.location.reload();
  }

  calculatePrice() {
    this.totalPrice = 0;
    for (let i = 0; i < this.productArray.length; i++) {
      let obj = this.productArray[i];
      this.totalPrice = this.totalPrice + (obj.itemCount * obj.itemPrice);
    }
  }


}
