import { Component, Input, EventEmitter, OnInit, OnDestroy} from 'angular2/core';
import { TreeNode, TreeNodeChildrenRenderer} from './index'
import {Subscription} from 'rxjs/Subscription'

@Component({
    selector: 'default-tree-node-children-renderer',
    directives: [TreeNode],
    styles:[`
    .tree-node-children {
        margin-left: 20px;
    }
    `],
    template: `<div class="tree-node-children" *ngIf="initialized" [hidden]="!node.isExpanded()">
        <div *ngFor="let child of node.getChildrenData(); let i = index">
          <tree-node [parent]="node" [data]="child" [index]="i"></tree-node>
        </div>
    </div>`
})
export class DefaultTreeNodeChildrenRenderer implements TreeNodeChildrenRenderer, OnInit, OnDestroy{
    @Input() node:TreeNode;

    initialized:boolean = false;
    private expandedSubscription: Subscription;

    onExpandedChanged(expanded:boolean) : void {
        this.initialized = this.initialized || expanded;
    }

    ngOnInit(){
        this.expandedSubscription = this.node.onExpandedChanged((expanded: boolean) => this.onExpandedChanged(expanded));
    }

    ngOnDestroy(){
        this.expandedSubscription.unsubscribe();
    }
}