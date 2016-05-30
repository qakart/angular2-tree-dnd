import { Component, Input, Inject} from 'angular2/core';
import { TreeNode } from './angular-tree-dnd'

export const FIELD_NAME = "FIELD_NAME";

@Component({
  selector: 'tree-node-field-renderer',
  template: `<span (click)="toggle()">{{node.data[fieldName]}}</span>`
})
export class TreeNodeFieldRenderer {
  @Input() node: TreeNode;
  private config : any;

  constructor(@Inject(FIELD_NAME) private fieldName: string){
  }

  ngOnInit() {
      console.log('hello `Tree node Name renderer` component ' + this.node.data[this.fieldName] + ' '+ (this.node.parent ? this.node.parent.data[this.fieldName] : "null"));
  }

  toggle(){
    this.node.toggle();
  }
}