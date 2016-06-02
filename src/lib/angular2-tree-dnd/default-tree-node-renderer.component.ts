import { Component, Input, Inject} from 'angular2/core';
import { TreeNode } from './index'
import {TreeNodeContentRenderer} from "./tree-node-content-renderer";

export const FIELD_NAME = "FIELD_NAME";

@Component({
  selector: 'default-tree-node-renderer',
  template: `<span (click)="toggle()">{{node.data[fieldName]}}</span>`
})
export class DefaultTreeNodeRenderer implements TreeNodeContentRenderer{
  @Input() node: TreeNode;

  constructor( @Inject(FIELD_NAME) private fieldName: string) {
  }

  ngOnInit() {
    console.log('hello `Tree node Name renderer` component ' + this.node.data[this.fieldName] + ' ' + (this.node.parent ? this.node.parent.data[this.fieldName] : "null"));
  }

  toggle() {
    this.node.toggle();
  }
}