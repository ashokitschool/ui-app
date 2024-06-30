import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  constructor(private router: Router){}

  doSearch(value: string){
      this.router.navigateByUrl(`/search/${value}`);
  }

}
