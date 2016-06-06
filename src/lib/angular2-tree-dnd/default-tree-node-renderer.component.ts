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
    .tree-node-content-label {
        display: inline-block;
        padding: 5px;
        cursor: pointer;
    }

    .tree-node-content-label-selected {
        background-color: lightblue;
        border: 1px solid blue;
    }
  `],
    template: `
    <div class="tree-node-content">
        <button *ngIf="node.getChildrenCount() > 0" (click)="node.toggleExpanded()">{{buttonIcon}}</button>
        <span class="tree-node-content-label" [class.tree-node-content-label-selected]="selected" (click)="node.toggleSelected()">{{node.data[fieldName]}}</span>
    </div>`
})
export class DefaultTreeNodeRenderer implements TreeNodeContentRenderer, OnInit, OnDestroy {
    @Input() node:TreeNode;

    private buttonIcon:string;
    private expandedSubscription: Subscription;
    private selectedSubscription: Subscription;
    private selected:boolean = false;

    constructor(@Inject(FIELD_NAME) private fieldName:string) {
    }

    onExpandedChanged(expanded:boolean):void {
        if (expanded) {
            this.buttonIcon = '-';
        } else {
            this.buttonIcon = '+';
        }
    }

    onSelectedChanged(selected:boolean):void {
        this.selected = selected;
    }

    ngOnInit() {
        this.expandedSubscription = this.node.onExpandedChanged((expanded:boolean) => this.onExpandedChanged(expanded));
        this.selectedSubscription = this.node.onSelectedChanged((selected:boolean) => this.onSelectedChanged(selected));
    }

    ngOnDestroy(){
        this.expandedSubscription.unsubscribe();
        this.selectedSubscription.unsubscribe();
    }

}