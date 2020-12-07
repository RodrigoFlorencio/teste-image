import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Img } from 'src/app/models/produtos.model';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent implements OnInit {

  imagem: Img[]

  public addImg: Img = {
    imagem: ''
  }

  constructor(private produtosService: ProdutosService,
              private router: Router) { }

  ngOnInit(): void {
    this.produtosService.getImg().subscribe((data) => {
      this.imagem = data['imagens']
    }, (error) => {console.log(error)})
  }

  addImgs() {
    debugger
    this.produtosService.createImg(this.addImg).subscribe(() => {
      this.produtosService.showMessage('Foto adicionada')
      this.router.navigate(['/produtos'])
    })
  }

  onChange(event) {
    
    // console.log(event)

    const selectFiles = <FileList>event.srcElement.files
    var image = document.getElementById('customFileLabel').innerHTML = selectFiles[0].name
    this.addImg.imagem = image;
  }

}
