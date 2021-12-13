import {
  Specie,
  People,
  Starship,
  SpecieType,
  SpeciesResponse,
  VehiclesResponse,
  StarshipResponse
} from './starwars.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, ReplaySubject, Subject, forkJoin } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Params, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StarwarsService {
  public specieType = new ReplaySubject<string>(1);
  public starships = new ReplaySubject<Starship[]>(1);
  public params = new Subject<Params>();

  private speciesUrl: string = environment.speciesAPI;
  private vehiclesUrl: string = environment.vehiclesAPI;
  private starshipUrl: string = environment.starshipAPI;

  constructor(private http: HttpClient, private router: Router) {}

  public getSpecies(): Observable<Specie[]> {
    return this.http.get<SpeciesResponse>(this.speciesUrl).pipe(
      map((resp: SpeciesResponse) => {
        const selectedSpecies: Specie[] = [];

        for (const result of resp.results) {
          if (
            result.name === SpecieType.Human ||
            result.name === SpecieType.Droid ||
            result.name === SpecieType.Wookie
          ) {
            selectedSpecies.push(result);
          }
        }
        return selectedSpecies;
      }),
      catchError((error) => throwError(error))
    );
  }

  public getHumanVehicles(): Observable<VehiclesResponse> {
    return this.http.get<VehiclesResponse>(this.vehiclesUrl);
  }

  //filtering vehicles to get droid ones
  public getDroidVehicles(): Observable<any> {
    const firstReq = this.http.get('https://swapi.dev/api/vehicles/?page=2');
    const secondReq = this.http.get('https://swapi.dev/api/vehicles/?page=4');

    return forkJoin([firstReq, secondReq]).pipe(
      map((resp) => {
        const results = resp?.map((obj: VehiclesResponse) =>
          obj.results.filter(
            (result) =>
              result.name.includes('Droid') || result.name.includes('droid')
          )
        );
        return results.flat();
      })
    );
  }

  public getStarships(): Observable<StarshipResponse> {
    return this.http.get<StarshipResponse>(this.starshipUrl);
  }

  public getPeople(): Observable<any> {
    return this.getSpecies().pipe(
      map((species) => {
        const people: People[] = [];

        for (const specie of species) {
          people.push(specie.people[0]);
        }
        return people;
      }),
      exhaustMap((people) => {
        return this.processRoutes(people);
      })
    );
  }

  private processRoutes(people: People[]): Observable<string> {
    const route = this.router.url;
    const humanNameAPI = String(people[0]);
    const droidNameAPI = String(people[1]);
    const wookieNameAPI = String(people[2]);

    if (route.includes('human')) {
      return this.http.get<string>(humanNameAPI);
    } else if (route.includes('droid')) {
      return this.http.get<string>(droidNameAPI);
    } else {
      return this.http.get<string>(wookieNameAPI);
    }
  }
}
