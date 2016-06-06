import { Component, Input, EventEmitter} from 'angular2/core';
import { TreeNode, TreeNodeChildrenRenderer, DefaultTreeNodeChildrenRenderer} from '../../lib/angular2-tree-dnd/index';

@Component({
    selector: 'default-tree-node-children-renderer',
    directives: [TreeNode],
    styles: [`
    .tree-node-children {
        margin-left: 20px;
    }
    `],
    template: `<div class="tree-node-children" *ngIf="initialized" [hidden]="!node.isExpanded()">
        <div *ngIf="loading">Loading ...</div>
        <div *ngIf="!loading">
            <div *ngFor="let child of children">
              <tree-node [parent]="node" [data]="child"></tree-node>
            </div>
        </div>
    </div>`
})
export class LazyTreeNodeChildrenRenderer extends DefaultTreeNodeChildrenRenderer implements TreeNodeChildrenRenderer {
    @Input() node:TreeNode;

    private loading:boolean = true;
    private children:any[];

    onExpandedChanged(expanded:boolean):void {
        super.onExpandedChanged(expanded);
        if (!this.children && expanded) {
            this.node.getChildren().subscribe((children:any[]) => {
                this.children = children;
                this.loading = false;
            });
        }
    }
}