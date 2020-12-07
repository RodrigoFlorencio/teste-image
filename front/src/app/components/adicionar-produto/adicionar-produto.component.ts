import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produtos } from 'src/app/models/produtos.model';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-adicionar- ',
  templateUrl: './adicionar-produto.component.html',
  styleUrls: ['./adicionar-produto.component.css']
})
export class AdicionarProdutoComponent implements OnInit {

  public addProduto: Produtos = {
    nome: '',
    preco: null,
    categoria: null,
    tipo: '',
    descricao: '',
    desconto: null,
    promo: null,
    quantidade: null,
    id_fornecedor: null,
    imagem: ''
  }

  constructor(private router: Router,
              private produtosService: ProdutosService) { }

  ngOnInit(): void {
  }

  createProduto() {
    this.produtosService.create(this.addProduto).subscribe(() => {
      this.produtosService.showMessage('Produto criado com sucesso!')
      this.router.navigate(['/produtos'])
    })
  }

  onChange(event) {
    
    // console.log(event.target.files)

    const selectFiles = <FileList>event.srcElement.files
    var image = document.getElementById('customFileLabel').innerHTML = selectFiles[0].name
    this.addProduto.imagem = image;
  }

  cancelar(): void {
    this.router.navigate(['/produtos'])
  }

}
