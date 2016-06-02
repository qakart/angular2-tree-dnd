import { Component, Input, EventEmitter} from 'angular2/core';
import { TreeNode } from './../angular-tree-dnd'

@Component({
    selector: 'tree-node-field-renderer',
    directives: [TreeNode],
    template: `<ul *ngIf="loaded" [hidden]="!node.isExpanded()">
        <li *ngFor="let child of node.getChildren()">
          <tree-node [parent]="node" [data]="child"></tree-node>
        </li>
    </ul>`
})
export class TreeNodeChildrenRenderer {
    @Input() node:TreeNode;

    private loaded:boolean = false;

    ngOnInit(){
        this.node.onExpandedChanged((expanded: boolean) => this.loaded = this.loaded || expanded);
    }
}