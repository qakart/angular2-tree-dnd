import {
    Component,
    Input
} from 'angular2/core';
import {
    DragAndDropService,
    TreeNode
} from '../index';

@Component({
    selector: 'drop-zone',
    directives: [],
    styles: [`
    .drop-zone{
        width: 100%;
        height: 5px;
        background-color: rgba(50, 50, 150, 0.5);;
        /*border: 1px dashed red;*/
    }
    /* TODO drop-zone-active !!!*/
    .drop-zone:hover{
        height: 20px;
        border: 1px solid blue;
        -webkit-transition: all 50ms, -webkit-transform 50ms;
        transition: all 50ms, transform 50ms;
    }
  `],
    template: `
        <div class="drop-zone" [class.drop-zone-active]="active" (drop)="dndService.drop(parent, index, $event)" (dragover)="dndService.allowDrop(parent, index, $event)" (mouseover)="a()" (mouseenter)="a()" (mouseleave)="b()"></div>
        `
})

export class DropZone {

    @Input() parent:TreeNode;
    @Input() index:number;

    // TODO active only on dragover
    private active:boolean = false;

    constructor(private dndService:DragAndDropService) {
    }

}
