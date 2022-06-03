import React from "react";

function Node(data) {
    this.data = data;
    this.children = [];
}

class Tree {
    constructor() {
        this.root = null;
    }

    add(data, toNodeData) {
        const node = new Node(data);
        // If the toNodeData arg is passed, find it. Otherwise, store null.
        const parent = toNodeData ? this.findBFS(toNodeData) : null;

        // Push new node to parent whose value matches toNodeData
        if(parent) {
            parent.children.push(node)
        } else {
            // If there's no parent, make this the root node
            if(!this.root)
                this.root = node;
            else
                return "Tried to store node as root when root already exists."
        }
    }

    findBFS(data) {
        const queue = [this.root];
        let _node = null;

        // Go thru every node in BFS
        this.traverseBFS((node) => {
            // Return match if found
            if(node.data.name === data) {
                _node = node;
            }
        })

        return _node;
    }

    traverseBFS(cb) {
        const queue = [this.root];

        if(cb)
            while(queue.length) {
                // Store current node & remove it from queue
                const node = queue.shift();

                cb(node)

                // Push children of current node to end of queue
                for(const child of node.children) {
                    queue.push(child);
                }
            }
    }

    menuTree(categories) {
        let parents = categories.filter(function(item) {
            return !item.parent;
        });
        let arr = [];

        function findCategories(parent){
            return categories.find(x => x.id == parent.slice(16));
        }

        parents.forEach(element => {
            let tree = new Tree();
            tree.add({ 'name':element.name, 'id':element.id});
            categories.map(category => {
                if (!category.parent){
                    let nothing = 'b';
                    // tree.add({ 'name':category.name, 'id':category.id});
                }else{
                    const parent = findCategories(category.parent);
                    tree.add({'name':category.name, 'id':category.id}, parent.name);
                }
            })
            arr.push(tree.root);
        })
        return arr;
    }
}

export default Tree;