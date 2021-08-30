import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  usuario: Usuario = new Usuario 
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value
  }

  cadastrar(){

    if(this.usuario.nome.length<5){
      alert("preencha o nome com pelo menos 5 caracteres")
    }

    if(this.usuario.usuario.indexOf("@") == -1 || this.usuario.usuario.indexOf(".") == -1){
      alert("preencha o campo usuario com pelo menos um @ e um .")
    }

    this.usuario.tipo = this.tipoUsuario

    if(this.usuario.senha.length<8){
      alert("preencha o campo senha com pelo menos 8 caracteres")
    }
  
    else if(this.usuario.senha != this.confirmarSenha){
      alert("As senhas estão incorretas")
    }
    else{
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario)=>{
        this.usuario = resp
        this.router.navigate(["/entrar"])
        alert("Usuario cadastrado com sucesso")
      })
    }
  
  }


}
