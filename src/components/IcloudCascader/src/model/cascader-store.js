import Node from './node';
import { getNodeKey } from './util';

export default class CascaderStore {
  constructor(options) {
		this.nodesMap = {};
    for (let option in options) {
      if (options.hasOwnProperty(option)) {
        this[option] = options[option];
      }
    }
    this.root = new Node({
      data: this.data,
      store: this
    });
		if (this.lazy && this.load) {
			const loadFn = this.load;
			loadFn(this.root, (data) => {
				this.root.doCreateChildren(data);
				this._initDefaultCheckedNodes();
			});
		} else {
			this._initDefaultCheckedNodes();
		}

  }

	getNode(data) {
		if (data instanceof Node) return data;
		const key = typeof data !== 'object' ? data : getNodeKey(this.key, data);
		return this.nodesMap[key] || null;
	}

	_initDefaultCheckedNodes() {
		const defaultCheckedKeys = this.defaultCheckedKeys || [];
		const nodesMap = this.nodesMap;

		defaultCheckedKeys.forEach((checkedKey) => {
			const node = nodesMap[checkedKey];

			if (node) {
				node.setChecked(true, !this.checkStrictly);
			}
		});
	}

	setChecked(data, checked, deep) {
		const node = this.getNode(data);
		if (node) {
			node.setChecked(!!checked, deep);
		}
	}

	getCheckedNodes(leafOnly = false) {
		const checkedNodes = [];
		const traverse = function(node) {
			const childNodes = node.root ? node.root.childNodes : node.childNodes;

			childNodes.forEach((child) => {
				if (child.checked && (!leafOnly || (leafOnly && child.isLeaf))) {
					checkedNodes.push(child.data);
				}

				traverse(child);
			});
		};

		traverse(this);

		return checkedNodes;
	}

	getCheckedKeys(leafOnly = false) {
		return this.getCheckedNodes(leafOnly).map((data) => (data || {})[this.key]);
	}

	getHalfCheckedNodes() {
		const nodes = [];
		const traverse = function(node) {
			const childNodes = node.root ? node.root.childNodes : node.childNodes;

			childNodes.forEach((child) => {
				if (child.indeterminate) {
					nodes.push(child.data);
				}

				traverse(child);
			});
		};

		traverse(this);

		return nodes;
	}

	getHalfCheckedKeys() {
		return this.getHalfCheckedNodes().map((data) => (data || {})[this.key]);
	}

	deregisterNode(node) {
		const key = this.key;
		if (!key || !node || !node.data) return;

		const childNodes = node.childNodes;
		for (let i = 0, j = childNodes.length; i < j; i++) {
			const child = childNodes[i];
			this.deregisterNode(child);
		}

		delete this.nodesMap[node.key];
	}

	registerNode(node) {
		const key = this.key;
		if (!key || !node || !node.data) return;

		const nodeKey = node.key;
		if (nodeKey !== undefined) this.nodesMap[node.key] = node;
	}
};
