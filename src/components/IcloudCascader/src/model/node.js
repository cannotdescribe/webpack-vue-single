export const getChildState = node => {
	let all = true;
	let none = true;
	let allWithoutDisable = true;
	for (let i = 0, j = node.length; i < j; i++) {
		const n = node[i];
		if (n.checked !== true || n.indeterminate) {
			all = false;
			if (!n.disabled) {
				allWithoutDisable = false;
			}
		}
		if (n.checked !== false || n.indeterminate) {
			none = false;
		}
	}

	return { all, none, allWithoutDisable, half: !all && !none };
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
						passValue = passValue || value !== false;
						const isCheck = child.disabled ? child.checked : passValue;
						child.setChecked(isCheck, deep, true, passValue);
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



}
