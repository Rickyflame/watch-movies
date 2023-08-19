import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MoviesService } from 'src/app/service/movies.service';
import { TvService } from 'src/app/service/tv.service';

interface TvShow {
  id: number;
  name: string; 
  poster_path: string;
  vote_average: number;
  release_date: string;
  // Add other properties if necessary
}

@Component({
  selector: 'app-tv-genre',
  templateUrl: './tv-genre.component.html',
  styleUrls: ['./tv-genre.component.scss']
})

export class TvGenreComponent implements OnInit {

  _tv: TvShow[] = []; // Initialize as an empty array
  title!: string;
  public id!: number;

  constructor(
    private tvService: TvService,
    private router: ActivatedRoute

  ) { }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.title = params['name'];
      this.getTvByGenre(this.id);
    });
  }

  getTvByGenre(id: number) {
    const idAsString = id.toString(); // Convert number to string
    this.tvService.getTVShowByGenre(idAsString).subscribe((res: any) => {
        this._tv = res.results;
    });
  }

}
