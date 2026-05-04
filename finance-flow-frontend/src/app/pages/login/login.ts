import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

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

  // Método para lidar com o envio do formulário
  onSubmit() {
    if (this.loginForm.valid) {
      // Se as regras forem cumpridas, mostramos os dados na consola!
      console.log('Sucesso! Dados a enviar:', this.loginForm.value);
    } else {
      // Se falhar (ex: password muito curta), podemos mostrar um erro
      console.log('Formulário inválido. Verifica os campos.');
    }
  }
}