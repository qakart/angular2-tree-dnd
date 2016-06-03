import { Component, Input, Inject} from 'angular2/core';
import { TreeNode } from './index'
import {TreeNodeContentRenderer} from "./tree-node-content-renderer";

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
    template: `<span class="tree-node-content" [class.tree-node-content-with-children]="node.getChildrenCount() > 0" (click)="toggle()">{{icon}} {{node.data[fieldName]}}</span>`
})
export class DefaultTreeNodeRenderer implements TreeNodeContentRenderer {
    @Input() node:TreeNode;

    private icon:string;

    constructor(@Inject(FIELD_NAME) private fieldName:string) {
    }

    private updateIcon() {
        if (this.node.getChildrenCount() > 0) {
            if (this.node.isExpanded()) {
                this.icon = '-';
            } else {
                this.icon = '+';
            }
        } else {
            this.icon = '|';
        }
    }

    ngOnInit() {
        console.log('hello `Tree node Name renderer` component ' + this.node.data[this.fieldName] + ' ' + (this.node.parent ? this.node.parent.data[this.fieldName] : "null"));

        this.node.onExpandedChanged((expanded:boolean) => this.updateIcon());
    }

    toggle() {
        this.node.toggle();
    }
}