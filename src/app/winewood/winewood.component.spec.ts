/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WinewoodComponent } from './winewood.component';

describe('WinewoodComponent', () => {
  let component: WinewoodComponent;
  let fixture: ComponentFixture<WinewoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinewoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinewoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
