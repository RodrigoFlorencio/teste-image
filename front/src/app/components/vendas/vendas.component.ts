import { Component, OnInit } from '@angular/core';
import { Vendas } from 'src/app/models/vendas.models';
import { VendasService } from 'src/app/services/vendas.service';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css']
})
export class VendasComponent implements OnInit {

  vendas: Vendas[]

  constructor(private vendasService: VendasService) { }

  ngOnInit(): void {

    this.vendasService.getVendas().subscribe((data) => {
      this.vendas = data['vendas']
    }, (error) => {console.log(error)})

  }

}
