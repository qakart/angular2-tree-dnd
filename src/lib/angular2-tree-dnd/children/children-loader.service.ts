import {TreeNode} from '../index'

export abstract class ChildrenLoaderService {
    getChildrenData: (node:TreeNode) => any;
    getChildrenDataCount: (node:TreeNode) => number;
    addChildData: (node:TreeNode, index, data) => void;
}