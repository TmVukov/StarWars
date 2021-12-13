import { Movies } from './../starwars.model';
import { HttpClient } from '@angular/common/http';
import { StarwarsService } from './../starwars.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Starship } from '../starwars.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  public loading: boolean;
  public movies: Movies[];

  constructor(
    private swService: StarwarsService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.handeMovies();
  }

  public handeMovies(): void {
    this.loading = true;

    this.route.params.subscribe((params) => {
      this.swService.params.next(params);

      this.swService.starships.subscribe((resp) => {
        const movies = [];
        const APIs = [];
        let starships = resp;

        const result: Starship[] = starships?.filter(
          (obj) => obj.name === params.starship
        );
        movies.push(...result[0]?.films);

        for (const movie of movies) {
          APIs.push(this.http.get(movie));
        }

        forkJoin(APIs).subscribe((resp: Movies[]) => (this.movies = resp));

        this.loading = false;
      });
    });
  }
}
