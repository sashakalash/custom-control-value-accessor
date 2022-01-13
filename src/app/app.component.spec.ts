import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CounterComponent } from './components/counter/counter.component';
import { MockComponent } from 'ng-mocks';

export function findComponent<T>(
  fixture: ComponentFixture<T>,
  selector: string,
): DebugElement {
  return fixture.debugElement.query(By.css(selector));
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;
  let counterFixture: ComponentFixture<CounterComponent>;
  let counterComponent: CounterComponent;
  let debugCounterElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponent(CounterComponent)
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    appComponent = fixture.componentInstance;

    counterFixture = TestBed.createComponent(CounterComponent);
    debugCounterElement = fixture.debugElement.query(By.directive(CounterComponent));
    counterComponent = debugCounterElement.componentInstance;
    counterComponent.value = 0;
  });

  it('should create the app', fakeAsync(() => expect(appComponent).toBeTruthy()));

  it('should render counter component', fakeAsync(() => expect(findComponent(fixture, 'app-counter')).toBeTruthy()));

  it('should render input element in counterComponent', fakeAsync(() => expect(debugCounterElement).toBeTruthy()));

  it('should call counter component writeValue method when the app formControl value changed', fakeAsync(() => {
    spyOn(counterComponent, 'writeValue').and.callThrough();

    appComponent.counterCtrl.setValue('11');
    tick();

    expect(counterComponent.writeValue).toHaveBeenCalled();
  }));

  it('counter component writeValue method should change the app formControl value', fakeAsync(() => {
    counterComponent.writeValue(11);
    tick();

    expect(appComponent.counterCtrl.value).toBe(11);
  }));
});
