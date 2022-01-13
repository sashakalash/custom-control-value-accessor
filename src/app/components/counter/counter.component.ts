import { environment } from './../../../environments/environment.prod';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const enum ACTION_FLAG {
  INCREASE,
  DECREASE
}

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CounterComponent,
    multi: true
  }]
})
export class CounterComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @Input() placeholder: string;
  @Input() label: string;
  @ViewChild('counterInput') counterInput: ElementRef;

  public readonly MINUS_IMG_SRC = environment.default.icons.minusIcon;
  public readonly PLUS_IMG_SRC = environment.default.icons.plusIcon;
  public readonly INCREASE: ACTION_FLAG = ACTION_FLAG.INCREASE;
  public readonly DECREASE: ACTION_FLAG = ACTION_FLAG.DECREASE;

  public counter: number;
  public onChange: any;
  public value: number = 0;

  constructor() {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.counterInput.nativeElement.value = this.value;
  }

  public writeValue(value: number): void {
    this.value = value;
    if (this.counterInput) {
      this.counterInput.nativeElement.value = this.value;
      this.onChange(this.value);
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    console.log('Method not implemented.');
  }

  public onClick(flag: ACTION_FLAG) {
    if (flag === ACTION_FLAG.INCREASE) {
      this.value++;
    }
    if (flag === ACTION_FLAG.DECREASE && this.value > 0) {
      this.value--;
    }
    this.writeValue(this.value);
  }

  public onInput(value: string) {
    if (value !== '') {
      this.writeValue(+value);
    } else {
      this.writeValue(0);
    }
  }

}
