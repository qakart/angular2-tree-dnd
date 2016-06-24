import {Type} from 'angular2/core';
import {TreeNode, IdService, SelectionService } from '../index'

export abstract class RendererService {
    getTreeNodeContentRenderer : (node:TreeNode) => Type | any;
    getTreeNodeChildrenRenderer : (node:TreeNode) => Type | any;
}