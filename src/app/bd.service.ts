import * as firebase from 'firebase'
import { Injectable } from '@angular/core';
import { Progresso } from './progresso.service';

@Injectable()
export class Bd {

    constructor(private progresso: Progresso) {

    }

    public publicar(publicacao: any): void {

        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({ titulo: publicacao.titulo })
            .then((resposta: any) => {
                let nomeImagem = resposta.key
                firebase.storage().ref()
                    .child(`imagens/${nomeImagem}`)
                    .put(publicacao.imagem)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,
                        //acompanhamento do processo de upload
                        (snapshot: any) => {
                            this.progresso.status = 'andamento'
                            this.progresso.estado = snapshot
                        },
                        (error) => {
                            this.progresso.status = 'erro'
                            //console.log(error)
                        },
                        () => {
                            //finalização do processo
                            this.progresso.status = 'concluido'
                            //console.log('uplaod completo')

                        }
                    )
            })


    }
    public consultaPublicacoes(emailUsuario: string): Promise<any> {
        return new Promise((resolve, reject) => {
            //consultar as publicacoes em database
            firebase.database().ref(`publicacoes/`)
                .orderByKey()
                .once('value')
                .then((snapshot: any) => {
                    //console.log(snapshot.val())
                    let publicacoes: Array<any> = [];

                    snapshot.forEach((childSnapshot: any) => {

                        let returnedPublicacoes = childSnapshot.val()
                        Object.keys(returnedPublicacoes).map(function (objectKey, index) {
                            let publicacao = returnedPublicacoes[objectKey];
                            publicacao.key = objectKey;
                            publicacao.user_key = childSnapshot.key;
                            publicacoes.push(publicacao)
                        });
                    })
                    //resolve(publicacoes)
                    //devolve o array na ordem inversa
                    return publicacoes.reverse()
                })
                .then((publicacoes: any) => {
                    publicacoes.forEach((publicacao) => {
                        console.log(publicacao);
                        firebase.storage().ref()
                            .child(`imagens/${publicacao.key}`)
                            .getDownloadURL()
                            .then((url: string) => {
                                publicacao.url_imagem = url
                                //consultar o nome do usuario
                                firebase.database().ref(`usuario_detalhe/${publicacao.user_key}`)
                                    .once('value')
                                    .then((snapshot: any) => {
                                        publicacao.nome_usuario = snapshot.val().nome_usuario
                                    })
                            })
                    })
                    resolve(publicacoes)

                })
        })

    }
}