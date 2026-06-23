import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, RegisterRequest} from '../../services/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink], // 👈 Injetamos as ferramentas necessárias
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  // Criar a estrutura do formulário usando FormGroup e FormControl
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  onSubmit() {
    
    if (this.registerForm.invalid) {
      this.toastr.error('Formulário inválido. Verifica os campos.');
      return;
    };

    if(this.registerForm.value.password !== this.registerForm.value.confirmPassword)
      {
        this.toastr.error('As passwords não coincidem.');
        return;
      }

    const backEndData: RegisterRequest = {
      name: this.registerForm.value.name!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!
    }

    this.authService.register(backEndData).subscribe({
      next: (reply) => {
        this.toastr.success('Registo bem-sucedido! Bem-vindo!');
        // O token é automaticamente guardado no AuthService via tap()
        // Redirecionar para a home após o registo
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.toastr.error('Erro ao registar. Tenta novamente.');
      }
  });}
}
