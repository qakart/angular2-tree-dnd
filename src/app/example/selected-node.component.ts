import { Component } from '@angular/core';
import {SelectionService} from '../../lib/angular2-tree-dnd/index';

@Component({
    selector: 'selected-node',
    providers: [],
    directives: [],
    pipes: [],
    styles: [],
    template: `
      <em *ngIf="selection.hasSelectedNode()">Selected node: {{selection.getSelectedNode().id}} - {{selection.getSelectedNode().data.name}}</em>
    `
})
export class SelectedNode {
    constructor(private selection:SelectionService) {
    }
}
