import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Fornecedor, FornecedorCreate } from 'src/app/models/fornecedor.models';
import { FornecedorService } from 'src/app/services/fornecedor.service';

@Component({
  selector: 'app-adicionar-fornecedor',
  templateUrl: './adicionar-fornecedor.component.html',
  styleUrls: ['./adicionar-fornecedor.component.css']
})
export class AdicionarFornecedorComponent implements OnInit {

  public create: Fornecedor = {
    nome: '',
    fantasia: '',
    cpfCnpj: '',
    inscEst: '',
    rg: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    codEstado: null,
    codMunicipio: null,
    fone1: null,
    fone2: null,
    fone3: null,
    email: ''
  }

  constructor(private router: Router,
              private fornecedorService: FornecedorService) { }

  ngOnInit(): void {
  }

  createFornecedor() {
    this.fornecedorService.create(this.create).subscribe(() => {
      this.fornecedorService.showMessage('Fornecedor criado com sucesso!')
      this.router.navigate(['/fornecedor'])
    })
  }

  cancelar() {
    this.router.navigate(['/fornecedor'])
  }

}
