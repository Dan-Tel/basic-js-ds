const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  treeRoot = null;

  root() {
    return this.treeRoot;
  }

  add(data) {
    if (!this.treeRoot) {
      this.treeRoot = new Node(data);
      return;
    }

    function addNode(node, data) {
      if (!node) {
        return new Node(data);
      }
      
      if (node.data > data) {
        node.left = addNode(node.left, data);
      }
      else if (node.data < data) {
        node.right = addNode(node.right, data);
      }

      return node;
    }

    const node = this.treeRoot;
    addNode(node, data);
  }

  has(data) {
    function hasNode(node, data) {
      if (!node) {
        return false;
      }

      if (node.data == data) {
        return true;
      }

      if (node.data > data) {
        return hasNode(node.left, data);
      }
      else {
        return hasNode(node.right, data);
      }

    }

    const node = this.treeRoot;
    return hasNode(node, data);
  }

  find(data) {
    function findNode(node, data) {
      if (!node) {
        return null;
      }

      if (node.data == data) {
        return node;
      }

      if (node.data > data) {
        return findNode(node.left, data);
      }
      else {
        return findNode(node.right, data);
      }
    }

    const node = this.treeRoot;
    return findNode(node, data);
  }

  remove(data) {
    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (node.data > data) {
        node.left = removeNode(node.left, data);
      }
      else if (node.data < data) {
        node.right = removeNode(node.right, data);
      }

      if (node.data == data) {
        if (!node.left) {
          return node.right;
        }
        else if (!node.right) {
          return node.left;
        }
        else {
          let minRightNode = node.right;
          let minRightData = node.right.data;

          while (minRightNode.left) {
            minRightNode = minRightNode.left;
          }
          if (node.right.left) minRightData = minRightNode.data;
        
          node.right = removeNode(node.right, minRightData);
          node.data = minRightData;
        }
      }

      return node;
    }

    const node = this.treeRoot;
    this.treeRoot = removeNode(node, data);
  }

  min() {
    function minNode(node) {
      let res = node.data;

      if (node.left) {
        res = Math.min(res, minNode(node.left));
      }
      if (node.right) {
        res = Math.min(res, minNode(node.right));
      }

      return res;
    }

    const node = this.treeRoot;
    return minNode(node);
  }

  max() {
    function maxNode(node) {
      let res = node.data;

      if (node.left) {
        res = Math.max(res, maxNode(node.left));
      }
      if (node.right) {
        res = Math.max(res, maxNode(node.right));
      }

      return res;
    }

    const node = this.treeRoot;
    return maxNode(node);
  }
}

module.exports = {
  BinarySearchTree,
};
