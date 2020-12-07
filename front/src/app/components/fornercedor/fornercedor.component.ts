import { Component, OnInit } from '@angular/core';
import { Fornecedor } from 'src/app/models/fornecedor.models';
import { FornecedorService } from 'src/app/services/fornecedor.service';

@Component({
  selector: 'app-fornercedor',
  templateUrl: './fornercedor.component.html',
  styleUrls: ['./fornercedor.component.css']
})
export class FornercedorComponent implements OnInit {

  fornecedor: Fornecedor[]

  constructor(private fornecedorService: FornecedorService) { }

  ngOnInit(): void {

    this.fornecedorService.getFornecedor().subscribe((data) => {
      this.fornecedor = data['fornecedores']
    }, (error) => {console.log(error)})

  }

}
