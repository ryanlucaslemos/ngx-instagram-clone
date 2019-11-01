import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('animacao-banner', [
      state('criado', style({
        opacity: 1
      })),
      //estado reservado void
      transition('void=>criado', [
        style({ opacity: 0, transform: 'translate(-50px, 0px)'}),
        animate('500ms 0s ease-in-out') //duracao, delay e aceleração(easing)
      ])
    ]),
    trigger('animacao-painel', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(50px, 0px)'}),
        animate('1.5s 0s ease-in-out', keyframes([
          style({offset:0.15, opacity: 1, transform:'translateX(0)'}),
          style({offset:0.86, opacity: 1, transform:'translateX(0)'}), 
          style({offset:0.88, opacity: 1, transform:'translateY(-10px)'}),
          style({offset:0.90, opacity: 1, transform:'translateY(10px)'}),
          style({offset:0.92, opacity: 1, transform:'translateY(-10px)'}),
          style({offset:0.94, opacity: 1, transform:'translateY(10px)'}),    
          style({offset:0.96, opacity: 1, transform:'translateY(-10px)'}),
          style({offset:0.98, opacity: 1, transform:'translateY(10px)'})
        ])) //duracao, delay e aceleração(easing), e keyframes
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {
  
  public estadoBanner:string = 'criado'
  public estadoPainel: string = 'criado'
  public cadastro:boolean = false
  
  constructor() { }

  ngOnInit() {
  }
  public exibirPainel(event:string):void{
    this.cadastro = event ==='cadastro'? true : false
  }
  //metodos de calback das animações
  public inicioDaAnimacao():void{
    //console.log('inicio da animação')
  }
  public fimDaAnimacao():void{
    //console.log('fim da animação')
  }
}
