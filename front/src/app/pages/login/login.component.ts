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
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  readonly dialog = inject(MatDialog);
  openDialog(qcm: { question: string; answears: Array<string> }): void {
    const dialogRef = this.dialog.open(DialogQCM, {
      width: '250px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '200ms',
      data: qcm,
    });
  }

  authService = inject(AuthService);
  inputGroup = new FormGroup({
    password: new FormControl(),
    identifiant: new FormControl(),
    isRelogin: new FormControl(),
  });

  hide = signal(false);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    const { password, isRelogin, identifiant } = this.inputGroup.value;

    const qcm = this.authService
      .login(identifiant, password, isRelogin)
      .then((v) => {
        if (!v) return;

        this.openDialog(v);
      });
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogQCM {
  readonly dialogRef = inject(MatDialogRef<DialogQCM>);

  v = '';
  handleInput(value: string) {
    this.v = value;
  }

  trackBy(index: number, v: string) {
    return v;
  }

  handleClose() {}

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { question: string; answears: Array<string> }
  ) {}
}
