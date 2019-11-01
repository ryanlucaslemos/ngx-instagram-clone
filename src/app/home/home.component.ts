import { Component, OnInit, ViewChild } from '@angular/core';
import { Autenticacao } from '../autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //decora na variavel publicacoes uma instancia do componente filho 
  //atraves de uma referencia no template 
  @ViewChild('publicacoes') public publicacoes: any
  constructor(
    private autenticacao:Autenticacao
  ) { }

  ngOnInit() {
  }
  public sair(): void{
    this.autenticacao.sair()
  }
  public atualizarTimeLine():void{
    //executar metodo atualizar timeline do componente filho (publicacoes)
    this.publicacoes.atualizarTimeLine()
  }

}
