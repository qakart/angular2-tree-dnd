import {TreeNode} from '../index'

export abstract class IdService {
    generateUniqueId: (node:TreeNode) => string;
}