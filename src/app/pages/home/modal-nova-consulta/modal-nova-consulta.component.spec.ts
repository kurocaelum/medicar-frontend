import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNovaConsultaComponent } from './modal-nova-consulta.component';

describe('ModalNovaConsultaComponent', () => {
  let component: ModalNovaConsultaComponent;
  let fixture: ComponentFixture<ModalNovaConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNovaConsultaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNovaConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
