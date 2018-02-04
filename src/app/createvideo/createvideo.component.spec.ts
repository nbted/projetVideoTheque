import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatevideoComponent } from './createvideo.component';

describe('CreatevideoComponent', () => {
  let component: CreatevideoComponent;
  let fixture: ComponentFixture<CreatevideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatevideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatevideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
