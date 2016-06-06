import { Component, Input, Inject, OnInit, OnDestroy} from 'angular2/core';
import { TreeNode } from './index'
import {TreeNodeContentRenderer} from "./tree-node-content-renderer";
import {Subscription} from 'rxjs/Subscription'

export const FIELD_NAME = "FIELD_NAME";

@Component({
    selector: 'default-tree-node-renderer',
    styles: [`
    .tree-node-content {
        padding: 5px;
    }
    .tree-node-content-with-children {
        cursor: pointer;
    }
  `],
    template: `<span class="tree-node-content" [class.tree-node-content-with-children]="node.getChildrenCount() > 0" (click)="node.toggleExpanded()">{{icon}} {{node.data[fieldName]}}</span>`
})
export class DefaultTreeNodeRenderer implements TreeNodeContentRenderer, OnInit, OnDestroy {
    @Input() node:TreeNode;

    private icon:string;
    private expandedSubscription: Subscription;

    constructor(@Inject(FIELD_NAME) private fieldName:string) {
    }

    onExpandedChanged(expanded:boolean):void {
        if (this.node.getChildrenCount() > 0) {
            if (expanded) {
                this.icon = '-';
            } else {
                this.icon = '+';
            }
        } else {
            this.icon = '|';
        }
    }

    ngOnInit() {
        this.expandedSubscription = this.node.onExpandedChanged((expanded:boolean) => this.onExpandedChanged(expanded));
    }

    ngOnDestroy(){
        this.expandedSubscription.unsubscribe();
    }

}