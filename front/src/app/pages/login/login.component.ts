import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  model,
  signal,
} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private router: Router) {}
  authService = inject(AuthService);
  inputGroup = new FormGroup({
    password: new FormControl(),
    identifiant: new FormControl(),
    isRelogin: new FormControl(),
  });

  readonly dialog = inject(MatDialog);
  readonly answear = signal('');

  openDialog(qcm: { question: string; answears: Array<string> }): void {
    const dialogRef = this.dialog.open(DialogQCM, {
      width: '250px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '200ms',
      data: qcm,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result !== undefined) {
        this.answear.set(result);
        this.authService.qcm(result).then((res) => {
          if (res == 200) {
            this.login();
            this.router.navigate(['/']);
          }
        });
      }
    });
  }

  async login() {
    const { password, isRelogin, identifiant } = this.inputGroup.value;
    const qcm = this.authService
      .login(identifiant, password, isRelogin)
      .then((v) => {
        if (!v) return;

        this.openDialog(v);
      });
  }

  hide = signal(false);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    const { password, isRelogin, identifiant } = this.inputGroup.value;

    this.login();
  }
}

@Component({
  selector: 'qcm-dialog',
  templateUrl: 'qcm-dialog.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogQCM {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { question: string; answears: Array<string> }
  ) {}

  readonly dialogRef = inject(MatDialogRef<DialogQCM>);
  readonly answear = model(this.data.answears[0]);

  v = '';

  handleInput(value: string) {
    this.v = value;
    console.log(this.v);
  }

  trackBy(index: number, v: string) {
    return v;
  }

  handleClose() {}
}
