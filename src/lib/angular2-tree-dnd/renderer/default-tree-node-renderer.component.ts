import {Component, Input, Inject, OnInit, OnDestroy} from 'angular2/core';
import {TreeNode, DefaultDragHandle} from '../index'
import {TreeNodeContentRenderer} from "../node/tree-node-content-renderer";
import {Subscription} from 'rxjs/Subscription'

export const RENDERED_FIELD_NAME = "RENDERED_FIELD_NAME";

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
    directives: [DefaultDragHandle],
    template: `
    <div class="tree-node-content" >
        <button *ngIf="node.getChildrenDataCount() > 0" (click)="node.toggleExpanded()">{{buttonIcon}}</button>
        <default-drag-handle [node]="node"></default-drag-handle>
        <span class="tree-node-content-label" [class.tree-node-content-label-selected]="selected" (click)="node.toggleSelected()">{{node.data[fieldName]}}</span>
    </div>`
})
export class DefaultTreeNodeRenderer implements TreeNodeContentRenderer, OnInit, OnDestroy {
    @Input() node:TreeNode;

    private buttonIcon:string;
    private expandedSubscription:Subscription;
    private selectedSubscription:Subscription;
    private selected:boolean = false;

    constructor(@Inject(RENDERED_FIELD_NAME) private fieldName:string) {
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

    ngOnDestroy() {
        this.expandedSubscription.unsubscribe();
        this.selectedSubscription.unsubscribe();
    }

}