const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }
    append(data) {
        let node = new Node();
        if (this._head !== null){
            node.prev = this._tail;
            this._tail.next = node;
            node.data = data;
            this._tail = node;
        } else {
            node.data = data;
            this._head = node;
            this._tail = node;
        }
        this.length++;
        return this;
    }
    head() {
        if (this._head !== null){
            return this._head.data;
        }
        return null;
    }
    tail() {
        if (this._tail !== null){
            return this._tail.data;
        }
        return null;
    }
    getNodeByIndex(index){
        let currentIndex, nodeAt;
        if (index > (this.length / 2 - 1)){
            currentIndex = this.length - 1;
            nodeAt = this._tail;
            while (currentIndex !== index){
                nodeAt = nodeAt.prev;
                currentIndex--;
            }
        } else {
            currentIndex = 0;
            nodeAt = this._head;
            while (currentIndex !== index){
                nodeAt = nodeAt.next;
                currentIndex++;
            }
        }
        return nodeAt;
    }
    at(index) {
        return this.getNodeByIndex(index).data;
    }
    insertAt(index, data) {
        if (this.length == 0 && index == 0){
            this.append(data);
            return this;
        }
        let nodeAt = this.getNodeByIndex(index);
        let node = new Node(data, nodeAt.prev, nodeAt);
        nodeAt.prev = node;
        this.length++;
        return this;
    }
    isEmpty() {
        return this._head == null;
    }

    clear() {
        this.length = 0;
        this._head = null;
        this._tail = null;
        return this;
    }
    deleteAt(index) {
        if (index == 0){
            if (this.length == 1){
                return new LinkedList();
            } else {
                this._head = this.getNodeByIndex(1);
            }
        } else {
            let toDelete = this.getNodeByIndex(index);
            toDelete.prev.next = toDelete.next; 
        }
        this.length--;
        return this;
    }
    reverse() {
        let storage = [];
        let currentNode = this._tail;
        while (currentNode){
            storage.push(currentNode.data);
            currentNode = currentNode.prev;
        }
        this.clear();
        for (let elem of storage){
            this.append(elem);
        }
        return this;
    }
    indexOf(data) {
        let current = this._head, index = 0;
        while (current){
            if (current.data === data){
                return index;
            }
            current = current.next;
            ++index;
        }
        return -1;
    }
}

module.exports = LinkedList;