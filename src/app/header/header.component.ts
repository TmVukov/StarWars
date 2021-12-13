import { Router } from '@angular/router';
import { StarwarsService } from './../starwars.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public type: string;
  public name: string;
  public title: string;

  constructor(private swService: StarwarsService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserName();
    this.loadSpecieName();
    this.loadParams();
  }

  public loadUserName(): void {
    this.swService.getPeople().subscribe((resp) => (this.name = resp.name));
  }

  public loadSpecieName(): void {
    this.swService.specieType.subscribe((type) => {
      this.type = type;
      sessionStorage.setItem('specieType', this.type);
    });

    if (!this.type) {
      this.type = sessionStorage.getItem('specieType');
    }
  }

  public loadParams(): void {
    this.swService.params.subscribe((resp) => (this.title = resp.starship));
  }

  public logout(): void {
    this.router.navigate(['/']);
  }

  public getBorderColor(specie: string): string {
    switch (specie) {
      case 'Human':
        return '2px solid lightblue';
      case 'Droid':
        return '2px solid lightgrey';
      case 'Wookie':
        return '2px solid sandybrown';
      default:
        return null;
    }
  }
}
