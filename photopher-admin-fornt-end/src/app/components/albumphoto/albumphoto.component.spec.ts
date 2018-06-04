import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumphotoComponent } from './albumphoto.component';

describe('AlbumphotoComponent', () => {
  let component: AlbumphotoComponent;
  let fixture: ComponentFixture<AlbumphotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumphotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumphotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
