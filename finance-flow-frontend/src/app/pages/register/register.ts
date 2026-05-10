import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, RegisterRequest} from '../../services/auth';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
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
    private router: Router
  ) { }

  onSubmit() {
    
    if (this.registerForm.invalid) {
      console.log('Formulário inválido. Verifica os campos.');
      return;
    };

    if(this.registerForm.value.password !== this.registerForm.value.confirmPassword)
      {
        console.log('As passwords não coincidem.');
        return;
      }

    const backEndData: RegisterRequest = {
      name: this.registerForm.value.name!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!
    }

    this.authService.register(backEndData).subscribe({
      next: (reply) => {
        console.log('Registo bem-sucedido:', reply);
        // O token é automaticamente guardado no AuthService via tap()
        // Redirecionar para a página de login após o registo
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erro ao registar:', err);
      }
  });}
}
