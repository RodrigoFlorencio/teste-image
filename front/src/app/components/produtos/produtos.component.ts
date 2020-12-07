import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produtos } from 'src/app/models/produtos.model';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  produtos: Produtos[]

  public paginaAtual = 1

  constructor(private produtosService: ProdutosService,) { }

  ngOnInit(): void {

    this.produtosService.getProdutos().subscribe((data) => {
      this.produtos = data['produtos']
    }, (error) => {console.log(error)})

  }

}
