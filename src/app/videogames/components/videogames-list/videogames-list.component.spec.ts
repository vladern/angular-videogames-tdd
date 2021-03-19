/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VideogamesListComponent } from './videogames-list.component';

describe('VideogamesListComponent', () => {
  let component: VideogamesListComponent;
  let fixture: ComponentFixture<VideogamesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideogamesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideogamesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
