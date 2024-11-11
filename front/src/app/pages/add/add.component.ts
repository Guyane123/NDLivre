import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [MatButtonModule, MatButton, MatIcon],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent {
  public href: string = '';

  googleLink = `https://accounts.google.com/o/oauth2/auth?client_id=${'920323441665-igts9i5p5s2bek0p9a7uhm4metoj1m4b.apps.googleusercontent.com'}&redirect_uri=${
    this.href ? this.href : 'http:/localhost:4200'
  }&response_type=token&scope=https://www.googleapis.com/auth/books`;
  isDisabled = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.href = this.router.url;
    console.log(this.router.url);
  }
}
