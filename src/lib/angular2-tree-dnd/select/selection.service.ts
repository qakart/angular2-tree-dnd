import {TreeNode} from '../index'

export abstract class SelectionService {
    onSelectedChanged:(node:TreeNode, selected:boolean) => void;
    getSelectedNode:() => TreeNode;
    setSelectedNode: (node: TreeNode) => void;
    hasSelectedNode:() => boolean;
    getSelectedNodes:() => TreeNode[];
}