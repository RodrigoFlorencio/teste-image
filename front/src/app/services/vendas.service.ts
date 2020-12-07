import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vendas } from '../models/vendas.models';

@Injectable({
  providedIn: 'root'
})
export class VendasService {

  serverUrl = 'http://localhost:3002'

  venda: Vendas[]

  constructor(private http: HttpClient) { }

  public getVendas(): Observable<Vendas[]> {
    return this.http.get<Vendas[]>(`${this.serverUrl}/pedidos/vendas`)
  }

  public getVendasDetalhes(): Observable<Vendas[]> {
    return this.http.get<Vendas[]>(`${this.serverUrl}/pedidos`)
  }

}
