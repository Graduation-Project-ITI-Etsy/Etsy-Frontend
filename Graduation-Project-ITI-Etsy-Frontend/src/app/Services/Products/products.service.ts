import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { IOneProductAPI, IProductAPI, ProductChangeStockAPI } from '../../Models/products';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiProductURL = environment.ProductApiUrl;
  constructor(private _HttpClient: HttpClient) { }

  GetAllProductsPagination(items: number, page: number): Observable<IProductAPI> {
    return this._HttpClient.get<IProductAPI>(`${this.apiProductURL}/${items},${page}`)
  }

  GetAllProductsByCategory(CategoryId: number,items: number, page: number): Observable<IProductAPI> {
    return this._HttpClient.get<IProductAPI>(`${this.apiProductURL}/FilterProduct/${CategoryId}/${items},${page}`)
  }

  GetOneProductByID(ProductID: number): Observable<IOneProductAPI> {
    return this._HttpClient.get<IOneProductAPI>(`${this.apiProductURL}/${ProductID}`)
  }

  GetProductsPriceAscending(ProductID: number,items: number, page: number): Observable<IProductAPI> {
    return this._HttpClient.get<IProductAPI>(`${this.apiProductURL}/PriceAscending/${ProductID}/${items},${page}`)
  }

  GetProductsPriceDescending(ProductID: number,items: number, page: number): Observable<IProductAPI> {
    return this._HttpClient.get<IProductAPI>(`${this.apiProductURL}/PriceDescending/${ProductID}/${items},${page}`)
  }

  GetProductsCustomerReview(ProductID: number,items: number, page: number): Observable<IProductAPI> {
    return this._HttpClient.get<IProductAPI>(`${this.apiProductURL}/Reviews/${ProductID}/${items},${page}`)
  }

  GatProductsByName(ProductName : string) : Observable<IOneProductAPI>
  {
    return this._HttpClient.get<IOneProductAPI>(`${this.apiProductURL}/${ProductName}`)
  }

  ChangeProductStockNumber(productDTO : ProductChangeStockAPI) : Observable<ProductChangeStockAPI>
  {
    return this._HttpClient.post<ProductChangeStockAPI>(this.apiProductURL,productDTO);
  }
}
