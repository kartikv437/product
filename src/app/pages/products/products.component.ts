import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  cartValue: number = 0;

  productArray: any = [
    { itemId: 1, itemCount: 0, itemPrice: 73990 },
    { itemId: 2, itemCount: 0, itemPrice: 29690 },
    { itemId: 3, itemCount: 0, itemPrice: 44590 }];
  prodCount: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    let productDetails = localStorage.getItem("productDetails");
    if (productDetails) {
      this.productArray = JSON.parse(productDetails);
    }
  }

  addToCart(id: any) {
    this.productArray[id - 1].itemCount = this.productArray[id - 1].itemCount + 1;
    let cartCount = 0;
    for (let i = 0; i < this.productArray.length; i++) {
      let obj = this.productArray[i];
       if (obj.itemCount > 0) cartCount = cartCount + 1;
    }
    localStorage.setItem('count', cartCount.toString());
    localStorage.setItem("productDetails", JSON.stringify(this.productArray));
    this.router.navigateByUrl(`/cart`);
  }
}
