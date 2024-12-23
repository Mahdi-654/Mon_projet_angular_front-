import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterJouerComponent } from './consulter-jouer.component';

describe('ConsulterJouerComponent', () => {
  let component: ConsulterJouerComponent;
  let fixture: ComponentFixture<ConsulterJouerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsulterJouerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsulterJouerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
