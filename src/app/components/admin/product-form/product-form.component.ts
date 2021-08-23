import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { finalize } from 'rxjs/operators';
import { CategoryService } from 'app/services/categories/category.service';
import { ProductService } from 'app/services/firebase/product.service';
import { ImageService } from 'app/services/image.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;

  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;
  productForm: FormGroup;
  title: string;
  price: number;
  category: string;


  constructor(
    private router: Router,
    public categoryService: CategoryService,
    private productService: ProductService,
    private storage: AngularFireStorage,
    private service: ImageService,
    private formLog: FormBuilder
    ) {
      this.categories$ = categoryService.getCategories();
      this.imgSrc = '/assets/img/image_placeholder.jpg';
    }

    save(product) {
      this.productService.saveProduct(product);
      this.router.navigate(['/admin/products']);
    }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      category: new FormControl(''),
      imageUrl: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
    });
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '/assets/img/image_placeholder.jpg';
      this.selectedImage = null;
    }
  }

  get formControls() {
    return this.productForm.controls;
  }

  onSubmit(formValue) {
    this.isSubmitted = true;
    if (this.productForm.valid) {
      var filePath = `${formValue.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      console.log(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            this.productForm.value.imageUrl = url;
            console.log('form: ', this.productForm);
            this.save(this.productForm.value);
            console.log('lien image: ', formValue.imageUrl);
            this.service.insertImageDetails(formValue);
            this.resetForm();
          });
        })
      ).subscribe();
    }
  }

  resetForm() {
    this.productForm.reset();
    this.productForm.setValue({
      imageUrl: '',
      category: 'Animal'
    });
    this.imgSrc = '/assets/img/image_placeholder.jpg';
    this.selectedImage = null;
    this.isSubmitted = false;
  }
}
