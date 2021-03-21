/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideogamesListComponent } from './videogames-list.component';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { VideogamesRoutingModule } from '../../videogames-routing.module';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { VideogamesService } from '@core/services/videogames/videogames.service';

const genreStub = [
  {
    id: '1',
    name: 'RPG',
  },
  {
    id: '2',
    name: 'Adventure',
  },
];

const videogamesStub = [
  {
    id: '1',
    title: 'Hades',
    genreId: '1',
    price: 16.79,
    releaseDate: '2020-09-17',
    tags: ['Action roguelike', 'roguelike', 'Action', 'indie'],
  },
  {
    id: '2',
    title: 'Valheim',
    genreId: '2',
    price: 16.79,
    releaseDate: '2021-02-02',
    tags: ['Open World Survival Craft', 'Online Co-Op', 'Survival'],
  },
];

describe('VideogamesListComponent', () => {
  let component: VideogamesListComponent;
  let fixture: ComponentFixture<VideogamesListComponent>;
  let videogameServiceSpy: jasmine.SpyObj<VideogamesService>;
  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('VideogamesService', [
      'getGenres',
      'getVideogames',
    ]);
    TestBed.configureTestingModule({
      declarations: [VideogamesListComponent],
      providers: [
        { provide: VideogamesService, useValue: spy },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
      imports: [
        CommonModule,
        VideogamesRoutingModule,
        CoreModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    videogameServiceSpy = TestBed.inject(
      VideogamesService
    ) as jasmine.SpyObj<VideogamesService>;

    fixture = TestBed.createComponent(VideogamesListComponent);
    component = fixture.componentInstance;

    videogameServiceSpy.getGenres.and.returnValue(
      new Observable((observer) => {
        observer.next( genreStub);
      })
    );
    videogameServiceSpy.getVideogames.and.returnValue(
      new Observable((observer) => {
        observer.next(videogamesStub);
      })
    );

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has table', () => {
    const htmlElement: HTMLElement = fixture.nativeElement;
    const table = htmlElement.querySelector('app-table');
    expect(table).toBeTruthy();
  });

  it('on init component should getGenres', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.genreList.length > 0).toBeTruthy();
    expect(videogameServiceSpy.getGenres.calls.count()).toBe(2);
  });

  it('on init component should getVideogames', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.dataSource.length > 0).toBeTruthy();
    expect(videogameServiceSpy.getVideogames.calls.count()).toBe(2);
  });

  it('on click delete button openConfirmAlert should be triggered', () => {
    spyOn(component, 'openConfirmAlert');
    const table = fixture.debugElement.query(By.css('app-table'));
    const tr = table.queryAll(By.css('tr'));
    const td = tr[1].queryAll(By.css('td'));
    const button = td[td.length - 1].query(By.css('button')).nativeElement;
    button.click();
    fixture.detectChanges();
    expect(component.openConfirmAlert).toHaveBeenCalledTimes(0);
  });

  it('on click delete button should be open the alert modal', () => {
    const table = fixture.debugElement.query(By.css('app-table'));
    const tr = table.queryAll(By.css('tr'));
    const td = tr[1].queryAll(By.css('td'));
    const button = td[td.length - 1].query(By.css('button')).nativeElement;
    button.click();
    fixture.detectChanges();
    expect(component.dialogRef).toBeTruthy();
    component.dialogRef.close();
    fixture.detectChanges();
  });

  it('on accept allert element should be removed', async () => {
    const spy = spyOn(component, 'removeElement');
    const table = fixture.debugElement.query(By.css('app-table'));
    const tr = table.queryAll(By.css('tr'));
    const td = tr[1].queryAll(By.css('td'));
    const button = td[td.length - 1].query(By.css('button')).nativeElement;
    button.click();
    fixture.detectChanges();
    component.dialogRef.close(true);
    component.dialogRef.afterClosed().subscribe(() => {
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith(0, true);
      expect(component.dataSource.length).toBe(1);
    });
  });
});
