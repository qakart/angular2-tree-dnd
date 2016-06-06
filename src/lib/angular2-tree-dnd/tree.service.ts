import {Type} from 'angular2/core';
import {TreeNode, IdService, SelectionService} from './index'

export abstract class TreeService {
    ids: IdService;
    selection: SelectionService;
    getTreeNodeContentRenderer : (node:TreeNode) => Type | any;
    getTreeNodeChildrenRenderer : (node:TreeNode) => Type | any;
    getChildrenData: (node:TreeNode) => any;
    getChildrenDataCount: (node:TreeNode) => number;
    getSiblingNodes: (node:TreeNode) => TreeNode[];
    register: (node:TreeNode) => string;
    unregister: (node:TreeNode) => void;
    getNodeById: (id:string) => void;
}