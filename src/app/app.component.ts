import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public initValue: number = 11;
  public counterCtrl = new FormControl(this.initValue);

  onInput(value: string) {
    this.counterCtrl.setValue(+value);
  }
}
