import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';

export const routes: Routes = [

    { path: 'category/:id', component: ProductListComponent },
    { path: 'category', component: ProductListComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'search/:keyword', component: ProductListComponent },
    { path: 'products/:id', component: ProductDetailsComponent },
    { path: 'cart-details', component: CartDetailsComponent },
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: '**', redirectTo: '/products', pathMatch: 'full' }
];
