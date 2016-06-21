import { Component } from 'angular2/core';

@Component({
    selector: 'dnd',
    directives: [],
    styles: [`
  .container{
     border: 1px solid red;
     width: 336px;
     height: 69px;
  }
  `],
    template: `
<div id="div1" class="container" (drop)="drop($event)" (dragover)="allowDrop($event)">
<div id="drag1"draggable="true"
  (dragstart)="drag($event)">TEXT</div>
</div>

<div id="div2" class="container" (drop)="drop($event)" (dragover)="allowDrop($event)"></div>
`
})
export class DnD {

    allowDrop(ev) {
        ev.preventDefault();
    }

    drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }
}