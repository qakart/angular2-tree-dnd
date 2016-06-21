import {Type} from 'angular2/core';
import {TreeNode, IdService, SelectionService } from '../index'

export abstract class TreeService {
    idService: IdService;
    selectionService: SelectionService;
    getTreeNodeContentRenderer : (node:TreeNode) => Type | any;
    getTreeNodeChildrenRenderer : (node:TreeNode) => Type | any;
    register: (node:TreeNode) => string;
    unregister: (node:TreeNode) => void;
    getNodeById: (id:string) => void;
}