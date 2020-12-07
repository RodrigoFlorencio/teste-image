import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Img, Produtos } from '../models/produtos.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "multipart/form-data"
  })

  serverUrl = 'http://localhost:3002'

  baseUrl = 'http://localhost:3002/produtos'

  imgUrl = 'http://localhost:3002/imagens'

  produtos: Produtos[]

  imagem: Img[]

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  public getProdutos(): Observable<Produtos[]> {
    return this.http.get<Produtos[]>(`${this.serverUrl}/produtos`)
  }

  public getImg(): Observable<Img[]> {
    return this.http.get<Img[]>(`${this.serverUrl}/imagens`)
  }

  create(produtos: Produtos): Observable<Produtos> {
    return this.http.post<Produtos>(this.baseUrl, produtos).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  createImg(imagem: Img): Observable<Img> {
    debugger
    return this.http.post<Img>(this.imgUrl, imagem).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  update(produto: Produtos): Observable<Produtos> {
    const url = `${this.baseUrl}/${produto.id}`
    return this.http.post<Produtos>(url, produto, { headers: this.headers }).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  delete(id: number): Observable<Produtos> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Produtos>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  readById(id: number): Observable<Produtos> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Produtos>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any> {
    console.log(e)
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY
  }

  showMessage(msg: string, isErro: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 4000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isErro ? ['msg-erro'] : ['msg-success']
    })
  }

}
