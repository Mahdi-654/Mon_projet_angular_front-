import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueClubComponent } from './historique-club.component';

describe('HistoriqueClubComponent', () => {
  let component: HistoriqueClubComponent;
  let fixture: ComponentFixture<HistoriqueClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoriqueClubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
