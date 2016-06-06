import {OpaqueToken, Type} from 'angular2/core';
import {TreeNode} from './index'
import {Observable} from 'rxjs/Observable';

export abstract class TreeService {
    getSelectedNode: () => TreeNode;
    getTreeNodeContentRenderer : (node:TreeNode) => Type | any;
    getTreeNodeChildrenRenderer : (node:TreeNode) => Type | any;
    getChildrenData: (node:TreeNode) => any;
    getChildrenCount: (node:TreeNode) => number;
    getSiblingNodes: (node:TreeNode) => TreeNode[];
    register: (node:TreeNode) => string;
}