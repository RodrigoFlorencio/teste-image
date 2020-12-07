import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produtos } from 'src/app/models/produtos.model';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-prod-delete',
  templateUrl: './prod-delete.component.html',
  styleUrls: ['./prod-delete.component.css']
})
export class ProdDeleteComponent implements OnInit {

  produto: Produtos

  constructor(private router: Router,
              private route: ActivatedRoute,
              private produtosService: ProdutosService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.produtosService.readById(id).subscribe(produto => {
      this.produto = produto["produto"]
    })
  }

  deleteProduto(): void {
    this.produtosService.delete(this.produto.id).subscribe(()=> {
      this.produtosService.showMessage('Produto excluido com sucesso!')
      this.router.navigate(['/produtos'])
    })
  }

  cancelar(): void {
    this.router.navigate(['/produtos'])
  }

}
