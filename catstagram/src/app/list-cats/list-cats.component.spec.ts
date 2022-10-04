import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCatsComponent } from './list-cats.component';

describe('ListCatsComponent', () => {
  let component: ListCatsComponent;
  let fixture: ComponentFixture<ListCatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
