import { ActivatedRoute, Router } from '@angular/router';
import { Starship, Vehicle } from './../starwars.model';
import { StarwarsService } from './../starwars.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  public vehicles: Vehicle[];
  public storage: Vehicle[];
  public starships: Starship[];

  public type: string;
  public loading: boolean;

  constructor(
    private swService: StarwarsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.type = sessionStorage.getItem('specieType');
    this.handleSpecieData(this.type);

    this.storage = JSON.parse(
      sessionStorage.getItem(`storageData-${this.type}`)
    );
  }

  public handleSpecieData(type: string): void {
    switch (type) {
      case 'Human':
        this.handleHumanVehicles();
        break;
      case 'Droid':
        this.handeDroidVehicles();
        break;
      case 'Wookie':
        this.handleStarships();
        break;
      default:
    }
  }

  public handleHumanVehicles(): void {
    this.loading = true;

    this.swService.getHumanVehicles().subscribe(
      (resp) => {
        this.vehicles = resp.results;

        this.handlePageReload();

        this.loading = false;
      },
      (error) => console.log(error)
    );
  }

  public handeDroidVehicles(): void {
    this.loading = true;

    this.swService.getDroidVehicles().subscribe(
      (resp) => {
        this.vehicles = resp;

        this.handlePageReload();

        this.loading = false;
      },
      (error) => console.log(error)
    );
  }

  public handleStarships(): void {
    this.loading = true;

    this.swService.getStarships().subscribe(
      (resp) => {
        this.starships = resp.results;
        this.swService.starships.next(this.starships);

        this.loading = false;
      },
      (error) => console.log(error)
    );
  }

  public removeVehicle(index: number): void {
    const storageIndex = this.vehicles.length;

    this.storage = JSON.parse(
      sessionStorage.getItem(`storageData-${this.type}`)
    );
    this.storage.splice(index - storageIndex, 1);

    this.vehicles.splice(index, 1);

    sessionStorage.setItem(
      `storageData-${this.type}`,
      JSON.stringify(this.storage)
    );
  }

  public vehiclesUpdated(vehicles: Vehicle[]) {
    this.storage = vehicles;
    this.vehicles.push(...vehicles.slice(-1));
  }

  public getRoute(name: string): void {
    this.router.navigate([`${name}/films`], { relativeTo: this.route });
  }

  private handlePageReload(): void {
    const storage = JSON.parse(
      sessionStorage.getItem(`storageData-${this.type}`)
    );

    if (storage) {
      this.vehicles.push(...storage);
    }
  }
}
