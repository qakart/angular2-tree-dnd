import { Component } from '@angular/core';
import {TreeService} from '../../lib/angular2-tree-dnd/index';

@Component({
    selector: 'selected-node',
    providers: [],
    directives: [],
    pipes: [],
    styles: [],
    template: `
      <em *ngIf="treeService.selection.hasSelectedNode()">Selected node: {{treeService.selection.getSelectedNode().id}} - {{treeService.selection.getSelectedNode().data.name}}</em>
    `
})
export class SelectedNode {
    constructor(private treeService:TreeService) {
    }
}
