import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHierarchyComponent } from './search-hierarchy.component';

describe('SearchHierarchyComponent', () => {
  let component: SearchHierarchyComponent;
  let fixture: ComponentFixture<SearchHierarchyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchHierarchyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
