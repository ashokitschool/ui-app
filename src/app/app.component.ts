import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductCategoryMenuComponent } from "./product-category-menu/product-category-menu.component";
import { SearchComponent } from "./search/search.component";
import { CartStatusComponent } from "./cart-status/cart-status.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterModule, RouterOutlet, ProductListComponent, ProductCategoryMenuComponent, SearchComponent, CartStatusComponent]
})
export class AppComponent {
  title = 'ashokit_ecomm_frontend';
}
