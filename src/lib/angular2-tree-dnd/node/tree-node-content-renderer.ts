import {OpaqueToken, Type} from 'angular2/core';
import {TreeNode} from '../index'

export interface TreeNodeContentRenderer{
  node: TreeNode;
  onExpandedChanged(expanded:boolean):void;
  onSelectedChanged(expanded:boolean):void;
}
