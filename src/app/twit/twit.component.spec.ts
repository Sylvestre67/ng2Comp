/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TwitComponent } from './twit.component';

describe('TwitComponent', () => {
  let component: TwitComponent;
  let fixture: ComponentFixture<TwitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
