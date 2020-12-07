import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Fornecedor } from '../models/fornecedor.models';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  serveUrl = 'http://localhost:3002'

  baseUrl = 'http://localhost:3002/fornecedores'

  fornecedor: Fornecedor[]

  public getFornecedor(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(`${this.serveUrl}/fornecedores`)
  }

  create(create: Fornecedor): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(this.baseUrl, create).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  update(fornecedor: Fornecedor): Observable<Fornecedor> {
    const url = `${this.baseUrl}/${fornecedor.id}`
    return this.http.post<Fornecedor>(url, fornecedor).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  delete(id: number): Observable<Fornecedor> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Fornecedor>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  readById(id: number): Observable<Fornecedor> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Fornecedor>(url).pipe(
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
