import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule} from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInput, MatInputModule } from '@angular/material/input';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';

registerLocaleData(localePt);


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { HomeComponent } from './components/home/home.component';
import { ProdEditComponent } from './components/prod-edit/prod-edit.component';
import { FornercedorComponent } from './components/fornercedor/fornercedor.component';
import { ProdDeleteComponent } from './components/prod-delete/prod-delete.component';
import { AuthService } from './services/auth.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { VendasComponent } from './components/vendas/vendas.component';
import { TransporteComponent } from './components/transporte/transporte.component';
import { NgxMaskModule } from 'ngx-mask';
import { AdicionarProdutoComponent } from './components/adicionar-produto/adicionar-produto.component';
import { AdicionarFornecedorComponent } from './components/adicionar-fornecedor/adicionar-fornecedor.component';
import { FornecedorEditComponent } from './components/fornecedor-edit/fornecedor-edit.component';
import { FornecedorDeleteComponent } from './components/fornecedor-delete/fornecedor-delete.component';
import { VendasDetalhesComponent } from './components/vendas-detalhes/vendas-detalhes.component';
import { ChartModule } from 'angular2-highcharts';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ImgComponent } from './components/img/img.component';

declare var require:any;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProdutosComponent,
    HomeComponent,
    ProdEditComponent,
    FornercedorComponent,
    ProdDeleteComponent,
    SidebarComponent,
    VendasComponent,
    TransporteComponent,
    AdicionarProdutoComponent,
    AdicionarFornecedorComponent,
    FornecedorEditComponent,
    FornecedorDeleteComponent,
    VendasDetalhesComponent,
    ImgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatSnackBarModule,
    MatInputModule,
    NgxMaskModule.forRoot(),
    ChartModule.forRoot(require('highcharts')),
    NgxPaginationModule,
    MatTableModule,
    MatPaginatorModule
  ],
  
  providers: [
    AuthService,
    LoginComponent,
    {
      provide: LOCALE_ID,
      useValue: 'pt-br',
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
