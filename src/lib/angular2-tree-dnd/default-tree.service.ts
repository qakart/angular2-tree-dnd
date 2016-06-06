import {Injectable} from '@angular/core';
import {DefaultTreeNodeRenderer, TreeService, TreeNode, DefaultTreeNodeChildrenRenderer, IdService, SelectionService} from './index';

@Injectable()
export class DefaultTreeService implements TreeService {

    private nodesById: {[key:string]:TreeNode} = {};

    ids: IdService;
    selection: SelectionService;

    constructor(ids: IdService, selection: SelectionService){
        this.ids = ids;
        this.selection = selection;
    }

    getTreeNodeContentRenderer(node:TreeNode):any {
        return DefaultTreeNodeRenderer;
    }

    getTreeNodeChildrenRenderer(node:TreeNode):any {
        return DefaultTreeNodeChildrenRenderer;
    }

    getChildrenData(node:TreeNode):any {
        return node.data.children;
    }

    getSiblingNodes(node:TreeNode):TreeNode[] {
        // TODO implement using ViewQuery ?
        return null; //this.getChildren(node.parent);
    }

    getChildrenDataCount(node:TreeNode):number {
        return node.data.children ? node.data.children.length : 0;
    }

    register(node:TreeNode):string {
        node.onSelectedChanged((selected:boolean) => this.selection.onSelectedChanged(node, selected));

        if (node.parent){
            node.parent.registerChildNode(node);
        }

        const id:string = this.ids.generateUniqueId(node);
        this.nodesById[id] = node;
        return id;
    }

    unregister(node:TreeNode):void {
        console.log('unregister '+node.getId());
        if (this.selection.getSelectedNode()=== node){
            //setTimeout(() => {
                // Deselect node
                this.selection.setSelectedNode(undefined);
            //}, 0);
        }
        delete this.nodesById[node.getId()];
    }

    getNodeById(id:string):TreeNode{
        return this.nodesById[id];
    }
}


