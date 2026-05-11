import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, LoginRequest } from '../../services/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule], // 👈 Injetamos as ferramentas necessárias
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})

export class Login {
  // Criar a  estrutura do formulário usando FormGroup e FormControl
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), // Campo de email com validação
    password: new FormControl('', [Validators.required, Validators.minLength(6)]) // Campo de senha com validação
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  // Método para lidar com o envio do formulário
  onSubmit() {
    if (this.loginForm.valid) {
      // Se as regras forem cumpridas, podemos preparar os dados para enviar ao backend
      const backEndData = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!
      }

      //Chamar o serviço de autenticação para tentar fazer login
      this.authService.login(backEndData).subscribe({
        next: (reply) => {
          this.toastr.success('Login bem-sucedido!');
          // O token é automaticamente guardado no AuthService via tap()
          // Redirecionar para a página principal ou dashboard após o login
          this.router.navigate(['/dashboard']);
        },
        error: (erro) => {
          this.toastr.error('Falha no login. Verifica as tuas credenciais.');
        }
      });


    } else {
      // Se falhar (ex: password muito curta), podemos mostrar um erro
      this.toastr.error('Formulário inválido. Verifica os campos.');
    }
  }
}