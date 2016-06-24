import {Injectable} from '@angular/core';
import {DefaultTreeNodeRenderer, RendererService, TreeNode, DefaultTreeNodeChildrenRenderer} from '../index';

@Injectable()
export class DefaultRendererService implements RendererService {

    getTreeNodeContentRenderer(node:TreeNode):any {
        return DefaultTreeNodeRenderer;
    }

    getTreeNodeChildrenRenderer(node:TreeNode):any {
        return DefaultTreeNodeChildrenRenderer;
    }
}


