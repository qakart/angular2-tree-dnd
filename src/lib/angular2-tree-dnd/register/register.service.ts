import {Type} from 'angular2/core';
import {TreeNode, IdService, SelectionService } from '../index'

export abstract class RegisterService {
    idService: IdService;
    selectionService: SelectionService;
    register: (node:TreeNode) => string;
    unregister: (node:TreeNode) => void;
    getNodeById: (id:string) => TreeNode;
}