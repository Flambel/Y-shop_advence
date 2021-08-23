import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'app/services/categories/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  // tslint:disable-next-line:no-input-rename
  @Input('category') category: string;

  constructor(categoryService: CategoryService ) { 
    this.categories$ = categoryService.getCategories();
  }

  ngOnInit(): void {
  }

}
