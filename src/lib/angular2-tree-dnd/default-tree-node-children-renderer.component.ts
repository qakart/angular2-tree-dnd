import { Component, Input, EventEmitter} from 'angular2/core';
import { TreeNode, TreeNodeChildrenRenderer} from './index'

@Component({
    selector: 'default-tree-node-children-renderer',
    directives: [TreeNode],
    styles:[`
    .tree-node-children {
        margin-left: 20px;
    }
    `],
    template: `<div class="tree-node-children" *ngIf="loaded" [hidden]="!node.isExpanded()">
        <div *ngFor="let child of node.getChildren()">
          <tree-node [parent]="node" [data]="child"></tree-node>
        </div>
    </div>`
})
export class DefaultTreeNodeChildrenRenderer implements TreeNodeChildrenRenderer{
    @Input() node:TreeNode;

    private loaded:boolean = false;

    ngOnInit(){
        this.node.onExpandedChanged((expanded: boolean) => this.loaded = this.loaded || expanded);
    }
}