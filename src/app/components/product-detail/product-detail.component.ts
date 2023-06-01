import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  id :any;
  productDetail:any;
  constructor(private appService:AppService, private activedRouter: ActivatedRoute ) { }

  ngOnInit(): void {
    this.activedRouter.paramMap.subscribe((queryParams:any) => {
      this.id = queryParams.get("id")
      this.appService.getProductsDetail(this.id).subscribe((res:any) => {
      this.productDetail =  res.result[0] 
      console.log(res.result[0]   );
      
      })
    })
}

  }
