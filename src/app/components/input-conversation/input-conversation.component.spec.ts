import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputConversationComponent } from './input-conversation.component';

describe('InputConversationComponent', () => {
  let component: InputConversationComponent;
  let fixture: ComponentFixture<InputConversationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputConversationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
