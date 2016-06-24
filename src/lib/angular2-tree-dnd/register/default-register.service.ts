import {Injectable} from '@angular/core';
import {RegisterService, TreeNode, IdService, SelectionService} from '../';

@Injectable()
export class DefaultRegisterService implements RegisterService {

    private nodesById:{[key:string]:TreeNode} = {};

    idService:IdService;
    selectionService:SelectionService;

    constructor(idService:IdService, selectionService:SelectionService) {
        this.idService = idService;
        this.selectionService = selectionService;
    }

    register(node:TreeNode):string {
        node.onSelectedChanged((selected:boolean) => this.selectionService.onSelectedChanged(node, selected));

        if (node.parent) {
            node.parent.registerChildNode(node);
        }

        const id:string = this.idService.generateUniqueId(node);
        this.nodesById[id] = node;
        return id;
    }

    unregister(node:TreeNode):void {
        console.log('unregister ' + node.getId());
        // TODO add a method in the selectionService to unselect a node (to handle multiple selections)
        if (this.selectionService.getSelectedNode() === node) {
            //setTimeout(() => {
            // Deselect node
            this.selectionService.setSelectedNode(undefined);
            //}, 0);
        }
        delete this.nodesById[node.getId()];
    }

    getNodeById(id:string):TreeNode {
        return this.nodesById[id];
    }
}


