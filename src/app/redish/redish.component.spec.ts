/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RedishComponent } from './redish.component';

describe('RedishComponent', () => {
  let component: RedishComponent;
  let fixture: ComponentFixture<RedishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
