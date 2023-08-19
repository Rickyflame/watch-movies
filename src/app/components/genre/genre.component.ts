import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { ActivatedRoute, Params } from '@angular/router';
import { delay } from 'rxjs/internal/operators/delay';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})



export class GenreComponent implements OnInit {
  moviesGenre: Movie[] = [];
  title!: string;
  public id!: number;
  loader = true;

  constructor(
    private movieService: MoviesService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.title = params['name'];
      this.getMoviesGenre(this.id);
    });
  }

  getMoviesGenre(id: number) {
    const idAsString = id.toString(); // Convert number to string
    this.movieService.getMoviesByGenre(idAsString).pipe(delay(2000)).subscribe((res: any) => {
        this.moviesGenre = res.results;
        this.loader = false;
    });
  }

}
interface Movie {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string; // Assuming it's a date string
  // Add other properties if necessary
}