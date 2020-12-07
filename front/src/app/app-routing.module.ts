import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdicionarFornecedorComponent } from './components/adicionar-fornecedor/adicionar-fornecedor.component';
import { AdicionarProdutoComponent } from './components/adicionar-produto/adicionar-produto.component';
import { FornecedorDeleteComponent } from './components/fornecedor-delete/fornecedor-delete.component';
import { FornecedorEditComponent } from './components/fornecedor-edit/fornecedor-edit.component';
import { FornercedorComponent } from './components/fornercedor/fornercedor.component';
import { HomeComponent } from './components/home/home.component';
import { ImgComponent } from './components/img/img.component';
import { LoginComponent } from './components/login/login.component';
import { ProdDeleteComponent } from './components/prod-delete/prod-delete.component';
import { ProdEditComponent } from './components/prod-edit/prod-edit.component';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { TransporteComponent } from './components/transporte/transporte.component';
import { VendasDetalhesComponent } from './components/vendas-detalhes/vendas-detalhes.component';
import { VendasComponent } from './components/vendas/vendas.component';


const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    canActivate: [LoginComponent]
  },

  {
    path: "",
    component: LoginComponent
  },

  {
    path: "produtos",
    component: ProdutosComponent,
    canActivate: [LoginComponent]
  },

  {
    path: "adicionar-produto",
    component: AdicionarProdutoComponent,
    canActivate: [LoginComponent]
  },

  {
    path: "produtos/prod-edit/:id",
    component: ProdEditComponent,
    canActivate: [LoginComponent]
  },

  {
    path: "produtos/prod-delete/:id",
    component: ProdDeleteComponent,
    canActivate: [LoginComponent]
  },

  {
    path: "fornecedor",
    component: FornercedorComponent,
    canActivate: [LoginComponent]
  },

  {
    path: "adicionar-fornecedor",
    component: AdicionarFornecedorComponent,
    canActivate: [LoginComponent]
  }, 

  {
    path: "fornecedor/fornecedor-edit/:id",
    component: FornecedorEditComponent,
    canActivate: [LoginComponent]
  },

  {
    path: "fornecedor/fornecedor-delete/:id",
    component: FornecedorDeleteComponent,
    canActivate: [LoginComponent]
  },

  {
    path: "vendas",
    component: VendasComponent,
    canActivate: [LoginComponent]
  },

  {
    path: "vendas-detalhes",
    component: VendasDetalhesComponent
  },

  {
    path: "transporte",
    component: TransporteComponent,
    canActivate: [LoginComponent]
  },
  {
    path: "img",
    component: ImgComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
