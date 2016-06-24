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
    .dropZone{
        width: 100%;
        height: 10px;
        border: 1px solid red;
    }
  `],
    template: `
        <div class="dropZone" (drop)="dndService.drop(parent, index, $event)" (dragover)="dndService.allowDrop(parent, index, $event)"></div>
        `
})
export class DropZone {

    @Input() parent:TreeNode;
    @Input() index:number;

    constructor(private dndService:DragAndDropService) {
    }
}
