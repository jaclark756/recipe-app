import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionalStickerComponent } from './nutritional-sticker.component';

describe('NutritionalStickerComponent', () => {
  let component: NutritionalStickerComponent;
  let fixture: ComponentFixture<NutritionalStickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutritionalStickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionalStickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
