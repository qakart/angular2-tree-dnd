import { Component, Input} from 'angular2/core';
import {TreeNode} from '../index';

@Component({
    selector: 'default-drag-handle',
    directives: [],
    styles: [`
    .dragHandle{
    }
  `],
    template: `
        <div draggable="true" (dragstart)="node.drag($event)">DRAG ME</div>
        `
})
export class DefaultDragHandle {
    @Input() node:TreeNode;
}
