import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceComponent } from './transactions-table.component';

describe('FinanceComponent', () => {
  let component: FinanceComponent;
  let fixture: ComponentFixture<FinanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinanceComponent],
    });
    fixture = TestBed.createComponent(FinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
