import { Component } from '@angular/core';
import { Default, Lazy } from './index';

@Component({
    selector: 'example',
    providers: [],
    directives: [Default],
    pipes: [],
    styles: [`
.card-container{
    display: flex;
    flex-direction: column;
    margin: 15px;
}
.card-container md-card{
    margin: 5px;
}
  `],
    template: `
  <div class="card-container">
  <default></default>
  <lazy></lazy>
  </div>
  `
})
export class Example {
}
