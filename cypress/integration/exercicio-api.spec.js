/// <reference types="cypress" />

describe('Testes da Funcionalidade Usuários', () => {

    it('Deve validar contrato de usuários', () => {
         crypto.request ('usuários') . então ( resposta => {
          devolver contrato . validAsync ( resposta . corpo )

         }) it ((_ ) => {
          crypto.log ("contrato de usuário válido")
         }) 
         
    });

    it('Deve listar usuários cadastrados', () => {
         crypto.pedido ({
          method: 'GET',
          url: 'usuários'

         }) .it ((resposta) => {
          esperar (resposta . status ) . para . igual (200)
          esperar (resposta . corpo) . para. tem propriedade ('quantidade')


         })
    });

    it('Deve cadastrar um usuário com sucesso', () => {
         let novoNome = faker. nome . primeiroNome ( ) + "" + faker . nome . últimoNome ( );
         let  novoEmail = faker . internet . e-mail (novoNome)
         
         cy . cadastrarUsuario ( novoNome, novoEmail, "teste", "true")
         .it ((resposta) => {
          esperar (resposta . status) . para . igual (201)
          esperar (resposta. corpo. mensagem). para. equal ("Cadastro realizado com sucesso")

         })
         
    });

    it('Deve validar um usuário com email inválido', () => {
         cy . pedido({
          método: 'POST',
          url: 'usuários',
          failOStatusCode : false,
          body: {
               "nome" : "Fulano Silva" ,
               "email" : "fulanano$qa.com.br",
               "administrador" : "true"
          }
         }) . então ((resposta) => {
          esperar (resposta . status ) . para . igual (400)
          esperar(resposta . corpo . email) . para . equal ("email deve ser um email válido")
     })
    });

    it('Deve editar um usuário previamente cadastrado', () => {
     let novoNome = faker . nome . primeiroNome ( ) +" " + faker . nome . últimoNome ( ) ;
     let novoEmail = faker . internet . e-mail ( novoNome );

     cy . cadastrarUsuario ( novoNome , novoEmail ."teste" ,"true")
     . então ((resposta) => {
          deixe id = resposta . corpo . _Eu iria 

     cy. pedido ({
          method : 'PUT',
          url : `usuários/ ${id}`,
          corpo: {
               "nome": novoNome + "nome Editado",
               "email" : novoEmail,
               "senha" : "teste",
               "administrador" :"true"
          },
          failOnstatusCode: false
     })
     }) . então ((resposta) => {
          esperar (resposta . status ) . para . igual (200)
          esperar (resposta.corpo.mensagem). para . equal ("Registro alterado com sucesso")
     })
    });

    it('Deve deletar um usuário previamente cadastrado', () => {
     let novoNome = faker . nome . primeiroNome ( ) + " " + faker . nome . últimoNome ( );
     let novoEmail = faker . internet . e-mail (novoNome) ;

     cy . cadastrarUsuario (novoNome , novoEmail , "teste" , "true")
     . então ((resposta ) => {
          deixe id = resposta . corpo . _Eu iria

          cy . pedido ({
               método: 'DELETE'
               url: `usuários/ ${id}`
               
          }) . então (( resposta) => {
               esperar (resposta . status ) . para . igual (200)
               esperar (resposta . corpo. mensagem) . para . equal ("Registro excluido com sucesso")
          })
     })
    });


});
