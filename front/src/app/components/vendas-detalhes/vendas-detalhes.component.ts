import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Vendas } from 'src/app/models/vendas.models';
import { VendasService } from 'src/app/services/vendas.service';

@Component({
  selector: 'app-vendas-detalhes',
  templateUrl: './vendas-detalhes.component.html',
  styleUrls: ['./vendas-detalhes.component.css']
})


export class VendasDetalhesComponent implements OnInit {

  pedidos: Vendas[]

  chart = []

  constructor(private vendasService: VendasService) { }

  ngOnInit(): void {

    this.vendasService.getVendas().subscribe((data) => {

      let valor_total = data['vendas'].map(data => data.valor_total)
      let sub_total = data['vendas'].map(data => data.sub_total)
      let dt = data['vendas'].map(data => data.data.split('T')[0])

      let vendasData = []
      dt.forEach(data => {
        let jsdate = new Date(data)
        vendasData.push(jsdate.toLocaleDateString('pt-BR', { year: 'numeric', month: 'short', day: 'numeric' }))
      })

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: vendasData,
          datasets: [
            {
              data: valor_total,
              label: 'Valor Total',
              borderColor: '#580404',
              fill: false
            },
            {
              data: sub_total,
              label: 'Fevereiro',
              borderColor: '#de7c28',
              fill: false
            },
            {
              data: sub_total,
              label: 'Março',
              borderColor: '#99ff99',
              fill: false
            },
            {
              data: sub_total,
              label: 'Abril',
              borderColor: '#ff33cc',
              fill: false
            },
            {
              data: sub_total,
              label: 'Maio',
              borderColor: '#ccff33',
              fill: false
            },
            {
              data: sub_total,
              label: 'Junho',
              borderColor: '#993300',
              fill: false
            },
            {
              data: sub_total,
              label: 'Julho',
              borderColor: '#666633',
              fill: false
            },
            {
              data: sub_total,
              label: 'Agosto',
              borderColor: '#003300',
              fill: false
            },
            {
              data: sub_total,
              label: 'Setembro',
              borderColor: '#336699',
              fill: false
            },
            {
              data: sub_total,
              label: 'Outubro',
              borderColor: '#999966',
              fill: false
            },
            {
              data: sub_total,
              label: 'Novembro',
              borderColor: '#660066',
              fill: false
            },
            {
              data: sub_total,
              label: 'Dezembro',
              borderColor: '#ffcc00',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: true,
            labels: {
              fontSize: 15,
            }
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }]
          }
        }
      })

      this.pedidos = data['pedido']
    }, (error) => { console.log(error) })

  }

}
