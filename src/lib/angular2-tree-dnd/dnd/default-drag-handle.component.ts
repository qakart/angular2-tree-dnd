import { Component, Input} from 'angular2/core';
import {TreeNode, DragAndDropService} from '../index';

@Component({
    selector: 'default-drag-handle',
    directives: [],
    styles: [`
    .dragHandle{
    }
  `],
    template: `
        <span class="dragHandle" draggable="true" (dragstart)="drag($event)">DRAG ME</span>
        `
})
export class DefaultDragHandle {
    @Input() node:TreeNode;

    constructor(private dndService:DragAndDropService) {
    }

    drag($event: any):void {
        this.dndService.drag(this.node, $event);
    }

}
