import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produtos } from 'src/app/models/produtos.model';
import { ProdutosService } from 'src/app/services/produtos.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-prod-edit',
  templateUrl: './prod-edit.component.html',
  styleUrls: ['./prod-edit.component.css']
})

export class ProdEditComponent implements OnInit {

  files: Set<File>;

  public produto: Produtos = {
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

  constructor(private produtosService: ProdutosService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.produtosService.readById(id).subscribe(produto => {
      this.produto = produto["produto"]
    })
  }

  editarProduto(): void {
    debugger
    this.produtosService.update(this.produto).subscribe(() => {
      this.produtosService.showMessage('Produto criado com sucesso!')
      this.router.navigate(['/produtos'])
    })
  }

  onChange(event) {

    console.log(event.target.files)

    const selectFiles = <File>event.srcElement.files
    this.files = new Set();
    this.files.add(selectFiles)


    var image = document.getElementById('customFileLabel').innerHTML = selectFiles[0].name

    this.produto.imagem = image



  }

  formImagem;

  /* fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);

      debugger
    }
  } */

  cancelar(): void {
    this.router.navigate(['/produtos'])
  }

}
