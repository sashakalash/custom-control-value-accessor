import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CounterComponent } from './components/counter/counter.component';

describe('AppComponent', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CounterComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ],
    }).compileComponents();
  }));

  describe('initialization', () => {
    let fixture: ComponentFixture<AppComponent>;
    let appComponent: AppComponent;
    let counterFixture: ComponentFixture<CounterComponent>;
    let counterComponent: CounterComponent;
    let debugInputElement: DebugElement;
    let inputElement: HTMLInputElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      appComponent = fixture.componentInstance;

      counterFixture = TestBed.createComponent(CounterComponent);
      counterFixture.detectChanges();
      counterComponent = counterFixture.componentInstance;
      debugInputElement = fixture.debugElement.query(By.directive(CounterComponent));
      inputElement = debugInputElement.nativeElement;
      spyOn(counterFixture.debugElement.componentInstance, 'writeValue').and.callThrough();

    }));

    it('should create the app', fakeAsync(() => expect(appComponent).toBeTruthy()));

    it('should render counter component', fakeAsync(() => expect(fixture.debugElement.query(By.css('app-counter'))).toBeTruthy()));

    it('should render input element in counterComponent', fakeAsync(() => expect(debugInputElement).toBeTruthy()));

    it('should change counter component input value through the app formControl setting value', fakeAsync(() => {


      appComponent.counterCtrl.setValue('11');
      fixture.detectChanges();
      counterFixture.detectChanges();
      console.log(counterFixture.debugElement.nativeElement)

      tick();

      expect(counterComponent.writeValue).toHaveBeenCalled();

    }));
  })


});
