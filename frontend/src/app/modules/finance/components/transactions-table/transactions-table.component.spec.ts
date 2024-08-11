import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransacationsTableComponent } from './transactions-table.component';

describe('FinanceComponent', () => {
  let component: TransacationsTableComponent;
  let fixture: ComponentFixture<TransacationsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransacationsTableComponent],
    });
    fixture = TestBed.createComponent(TransacationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
