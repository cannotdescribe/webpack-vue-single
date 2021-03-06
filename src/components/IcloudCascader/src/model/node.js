import { markNodeData, NODE_KEY } from './util';
import objectAssign from 'element-ui/src/utils/merge';

export const getChildState = node => {
	let all = true;
	let none = true;
	let allWithoutDisable = true;
	for (let i = 0, j = node.length; i < j; i++) {
		const n = node[i];
		if ((n.checked !== true || n.indeterminate) && n.data.showCheckbox) {
			all = false;
			if (!n.disabled) {
				allWithoutDisable = false;
			}
		}
		if ((n.checked !== false || n.indeterminate) && n.data.showCheckbox) {
			none = false;
		}
	}

	return { all, none, allWithoutDisable, half: !all && !none };
};

const getPropertyFromData = function(node, prop) {
	const props = node.store.props;
	const data = node.data || {};
	const config = props[prop];

	if (typeof config === 'function') {
		return config(data, node);
	} else if (typeof config === 'string') {
		return data[config];
	} else if (typeof config === 'undefined') {
		const dataProp = data[prop];
		return dataProp === undefined ? '' : dataProp;
	}
};

const reInitChecked = function(node) {
	if (node.childNodes.length === 0) return;

	const {all, none, half} = getChildState(node.childNodes);
	if (all) {
		node.checked = true;
		node.indeterminate = false;
	} else if (half) {
		node.checked = false;
		node.indeterminate = true;
	} else if (none) {
		node.checked = false;
		node.indeterminate = false;
	}

	const parent = node.parent;
	if (!parent || parent.level === 0) return;

	if (!node.store.checkStrictly) {
		reInitChecked(parent);
	}
};

export default class Node {
  constructor(options) {
    this.text = null;
    this.checked = false;
    this.indeterminate = false;
    this.data = null;
    this.parent = null;
    this.visible = true;

    for (let name in options) {
      if (options.hasOwnProperty(name)) {
        this[name] = options[name];
      }
    }

    this.level = 0;
    this.loaded = false;
    this.childNodes = [];
    this.loading = false;

    if (this.parent) {
      this.level = this.parent.level + 1;
    }

		const store = this.store;

		if (store.lazy !== true && this.data) {
			this.setData(this.data);
		}

		store.registerNode(this);
  }

	setData(data) {
		if (!Array.isArray(data)) {
			markNodeData(this, data);
		}

		this.data = data;
		this.childNodes = [];

		let children;
		if (this.level === 0 && this.data instanceof Array) {
			children = this.data;
		} else {
			children = getPropertyFromData(this, 'children') || [];
		}

		for (let i = 0, j = children.length; i < j; i++) {
			this.insertChild({ data: children[i] });
		}
	}

	insertChild(child, index, batch) {
		if (!child) throw new Error('insertChild error: child is required.');

		if (!(child instanceof Node)) {
			if (!batch) {
				const children = this.getChildren(true);
				if (children.indexOf(child.data) === -1) {
					if (typeof index === 'undefined' || index < 0) {
						children.push(child.data);
					} else {
						children.splice(index, 0, child.data);
					}
				}
			}
			objectAssign(child, {
				parent: this,
				store: this.store
			});
			child = new Node(child);
		}

		child.level = this.level + 1;

		if (typeof index === 'undefined' || index < 0) {
			this.childNodes.push(child);
		} else {
			this.childNodes.splice(index, 0, child);
		}

		this.updateLeafState();
	}

	getChildren(forceInit = false) { // this is data
		if (this.level === 0) return this.data;
		const data = this.data;
		if (!data) return null;

		const props = this.store.props;
		let children = 'children';
		if (props) {
			children = props.children || 'children';
		}

		if (data[children] === undefined) {
			data[children] = null;
		}

		if (forceInit && !data[children]) {
			data[children] = [];
		}

		return data[children];
	}

	updateLeafState() {
		if (this.store.lazy === true && this.loaded !== true && typeof this.isLeafByUser !== 'undefined') {
			this.isLeaf = this.isLeafByUser;
			return;
		}
		const childNodes = this.childNodes;
		if (!this.store.lazy || (this.store.lazy === true && this.loaded === true)) {
			this.isLeaf = !childNodes || childNodes.length === 0;
			return;
		}
		this.isLeaf = false;
	}

	setChecked(value, deep, recursion, passValue) {
		this.indeterminate = value === 'half';
		this.checked = value === true;

		if (this.store.checkStrictly) return;

		if (!(this.shouldLoadData() && !this.store.checkDescendants)) {
			let { all, allWithoutDisable } = getChildState(this.childNodes);

			if (!this.isLeaf && (!all && allWithoutDisable)) {
				this.checked = false;
				value = false;
			}

			const handleDescendants = () => {
				if (deep) {
					const childNodes = this.childNodes;
					for (let i = 0, j = childNodes.length; i < j; i++) {
						const child = childNodes[i];
						if(child.data.showCheckbox){
							passValue = passValue || value !== false;
							const isCheck = child.disabled ? child.checked : passValue;
							child.setChecked(isCheck, deep, true, passValue);
						}
					}
					const { half, all } = getChildState(childNodes);
					if (!all) {
						this.checked = all;
						this.indeterminate = half;
					}
				}
			};

			if (this.shouldLoadData()) {
				// Only work on lazy load data.
				this.loadData(() => {
					handleDescendants();
					reInitChecked(this);
				}, {
					checked: value !== false
				});
				return;
			} else {
				handleDescendants();
			}
		}

		const parent = this.parent;
		if (!parent || parent.level === 0) return;

		if (!recursion) {
			reInitChecked(parent);
		}
	}


	updateChildren() {
		const newData = this.getChildren() || [];
		const oldData = this.childNodes.map((node) => node.data);

		const newDataMap = {};
		const newNodes = [];

		newData.forEach((item, index) => {
			if (item[NODE_KEY]) {
				newDataMap[item[NODE_KEY]] = { index, data: item };
			} else {
				newNodes.push({ index, data: item });
			}
		});

		oldData.forEach((item) => {
			if (!newDataMap[item[NODE_KEY]]) this.removeChildByData(item);
		});

		newNodes.forEach(({ index, data }) => {
			this.insertChild({ data }, index);
		});

		this.updateLeafState();
	}

	removeChildByData(data) {
		let targetNode = null;
		this.childNodes.forEach(node => {
			if (node.data === data) {
				targetNode = node;
			}
		});

		if (targetNode) {
			this.removeChild(targetNode);
		}
	}

	removeChild(child) {
		const children = this.getChildren() || [];
		const dataIndex = children.indexOf(child.data);
		if (dataIndex > -1) {
			children.splice(dataIndex, 1);
		}

		const index = this.childNodes.indexOf(child);

		if (index > -1) {
			this.store && this.store.deregisterNode(child);
			child.parent = null;
			this.childNodes.splice(index, 1);
		}

		this.updateLeafState();
	}
	shouldLoadData() {
		return this.store.lazy === true && this.store.load && !this.loaded;
	}

	get label() {
		return getPropertyFromData(this, 'label');
	}

	get icon() {
		return getPropertyFromData(this, 'icon');
	}

	get key() {
		const nodeKey = this.store.key;
		if (this.data) return this.data[nodeKey];
		return null;
	}

	get disabled() {
		return getPropertyFromData(this, 'disabled');
	}

	get nextSibling() {
		const parent = this.parent;
		if (parent) {
			const index = parent.childNodes.indexOf(this);
			if (index > -1) {
				return parent.childNodes[index + 1];
			}
		}
		return null;
	}

	get previousSibling() {
		const parent = this.parent;
		if (parent) {
			const index = parent.childNodes.indexOf(this);
			if (index > -1) {
				return index > 0 ? parent.childNodes[index - 1] : null;
			}
		}
		return null;
	}
}
