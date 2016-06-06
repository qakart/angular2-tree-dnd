import {Type} from 'angular2/core';
import {TreeNode, IdService} from './index'

export abstract class TreeService {
    idService: IdService;
    getSelectedNode: () => TreeNode;
    getTreeNodeContentRenderer : (node:TreeNode) => Type | any;
    getTreeNodeChildrenRenderer : (node:TreeNode) => Type | any;
    getChildrenData: (node:TreeNode) => any;
    getChildrenDataCount: (node:TreeNode) => number;
    getSiblingNodes: (node:TreeNode) => TreeNode[];
    register: (node:TreeNode) => string;
    unregister: (node:TreeNode) => void;
    getNodeById: (id:string) => void;
}