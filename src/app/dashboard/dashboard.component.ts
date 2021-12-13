import { Specie } from './../starwars.model';
import { StarwarsService } from './../starwars.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public species: Specie[];
  public loading: boolean;

  constructor(private swService: StarwarsService, private router: Router) {}

  ngOnInit(): void {
    this.handleSpecies();
  }

  public handleSpecies(): void {
    this.loading = true;
    this.swService.getSpecies().subscribe(
      (resp) => {
        this.species = resp;
        this.loading = false;
      },
      (error) => console.log(error)
    );
  }

  public getRoute(route: string): void {
    this.swService.specieType.next(route);

    switch (route) {
      case 'Human':
        this.router.navigate(['/human']);
        break;
      case 'Droid':
        this.router.navigate(['/droid']);
        break;
      case 'Wookie':
        this.router.navigate(['/wookie']);
        break;
      default:
        return null;
    }
  }

  public getBackgroundColor(specie: string): string {
    switch (specie) {
      case 'Human':
        return 'mintcream';
      case 'Droid':
        return 'whitesmoke';
      case 'Wookie':
        return 'papayawhip';
      default:
        return null;
    }
  }
}
