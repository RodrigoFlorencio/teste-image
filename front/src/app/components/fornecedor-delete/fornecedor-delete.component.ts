import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fornecedor } from 'src/app/models/fornecedor.models';
import { FornecedorService } from 'src/app/services/fornecedor.service';

@Component({
  selector: 'app-fornecedor-delete',
  templateUrl: './fornecedor-delete.component.html',
  styleUrls: ['./fornecedor-delete.component.css']
})
export class FornecedorDeleteComponent implements OnInit {

  fornecedor: Fornecedor

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fornecedorService: FornecedorService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.fornecedorService.readById(id).subscribe(fornecedor => {
      this.fornecedor = fornecedor["fornecedor"]
    })
  }

  deleteFornecedor(): void {
    this.fornecedorService.delete(this.fornecedor.id).subscribe(()=> {
      this.fornecedorService.showMessage('Fornecedor excluido com sucesso!')
      this.router.navigate(['/fornecedor'])
    })
  }

  cancelar() {
    this.router.navigate(['/fornecedor'])
  }

}
