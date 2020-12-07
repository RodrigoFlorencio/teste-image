import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fornecedor } from 'src/app/models/fornecedor.models';
import { FornecedorService } from 'src/app/services/fornecedor.service';

@Component({
  selector: 'app-fornecedor-edit',
  templateUrl: './fornecedor-edit.component.html',
  styleUrls: ['./fornecedor-edit.component.css']
})
export class FornecedorEditComponent implements OnInit {

  fornecedor: Fornecedor

  constructor(private fornecedorService: FornecedorService,
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.fornecedorService.readById(id).subscribe(fornecedor => {
      this.fornecedor = fornecedor["fornecedor"]
    })
  }

  editarFornecedor(): void {
    this.fornecedorService.update(this.fornecedor).subscribe(() => {
      this.fornecedorService.showMessage('Produto editado com successo')
      this.router.navigate(['/fornecedor'])
    })
  }

  cancelar() {
    this.router.navigate(['/fornecedor'])
  }

}
