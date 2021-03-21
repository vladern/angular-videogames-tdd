import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { columnVideogamesConfigList } from '@configs';
import { VideogamesService } from '@core/services';
import { ConfirmAlertComponent } from '@shared/components/confirm-alert/confirm-alert.component';
import { ColumnConfig } from '@shared/models/table';
import { Genre, Videogame } from '@shared/models/videogames';

@Component({
  selector: 'app-videogames-list',
  templateUrl: './videogames-list.component.html',
  styleUrls: ['./videogames-list.component.scss'],
})
export class VideogamesListComponent implements OnInit {
  public columnConfigList: ColumnConfig[] = columnVideogamesConfigList;
  public dataSource = [];
  public genreList: Genre[] = [];
  public dialogRef: MatDialogRef<ConfirmAlertComponent>;

  constructor(private _videogamesService: VideogamesService, private _dialog: MatDialog) {}

  ngOnInit() {
    this.columnConfigList.find(elem => elem.id === 'delete').callback = this.openConfirmAlert.bind(this);
    this._getGenreList();
  }

  private _getGenreList(): void {
    this._videogamesService.getGenres().subscribe(({ body }) => {
      this.genreList = body;
      this._getVideogames();
    });
  }

  private _getVideogames() {
    this._videogamesService.getVideogames().subscribe(({ body }) => {
      this.dataSource = this._mapVideogameListToDatasource(body);
    });
  }

  private _mapVideogameListToDatasource(videogameList: Videogame[]) {
    return videogameList.map(elem => {
      return {
        ...elem,
        genreName: this.genreList.find(genre => genre.id === elem.genreId).name,
        releaseDate: new Date(elem.releaseDate)
      }
    });
  }

  public openConfirmAlert(index: number) {
     this.dialogRef = this._dialog.open(ConfirmAlertComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this element?' }
    });

    this.dialogRef.afterClosed().subscribe(result => this.removeElement(index, result));
  }

  public removeElement(index: number, remove: boolean) {
      if (remove === true) {
        this.dataSource.splice(index, 1);
      }
  }
}
