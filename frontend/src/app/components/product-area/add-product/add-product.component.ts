import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  public categories : CategoryModel[];
  public productForm: FormGroup;
  constructor(private productService: ProductService, private fb: FormBuilder, private router:Router) {}

  async ngOnInit() {

    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      categoryId: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0.01), Validators.max(10000)]],
      image: ['', [Validators.required, Validators.pattern('(http(s?):)([/|.|\\w|\\s|-])*\.(?:jpg|gif|png)')]]
    });
    this.categories = await this.productService.getAllCategory();
  }
  public backToMenu(){
    this.router.navigateByUrl("/layout-admin");
  }
  async onSubmit() {
    if (this.productForm.valid) {
      const newProduct: ProductModel = {
        name: this.productForm.get('name').value,
        categoryId: this.productForm.get('categoryId').value,
        price: this.productForm.get('price').value,
        image: this.productForm.get('image').value
      };
    console.log(newProduct);
    try{
      await this.productService.addProduct(newProduct);
      alert(`product ${newProduct.name} add!`);
    this.router.navigateByUrl("/products");
    }
    catch(err:any){
      console.log(err);
      alert(err);
    }
  }
}
}
