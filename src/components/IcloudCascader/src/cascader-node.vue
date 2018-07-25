<template>
    <li
        :class="{
            'el-cascader-menu__item': true,
            'el-cascader-menu__item--extensible': item.children,
            'is-active': item.value === activeValue[menuIndex],
            'is-disabled': item.disabled
        }"
        :ref="item.value === activeValue[menuIndex] ? 'activeItem' : null"
        :tabindex= "item.disabled ? null : -1"
        role="menuitem"
        :aria-haspopup="!!item.children"
        :aria-expanded="item.value === activeValue[menuIndex]"
        :id = "itemId"
        :aria-owns = "!item.children ? null : ownsId"
        @click="clickHandler"
        @focus="focusHandler"
        @keydown="keydownHandler"
        @mousedown="mousedownHandler"
    >
        <!--v-model="item.checked"-->
        <el-checkbox
            v-if="node.data.showCheckbox"
            :value="node.checked"
            :indeterminate="node.indeterminate"
            :disabled="!!node.disabled"
            @click.native.stop
            @change="handleCheckChange"
        />
        {{item.label}}
    </li>
</template>
<script>
    import Vue from "vue";
    export default {
        name: "CascaderNode",
        props:{
            itemId: {
                type: String,
                require: true
            },
            ownsId:{
                type: String
            },
            activeValue:{
                type: Array
            },
            menuIndex:{
                type: Number
            },
            store: {

            },
			text:{
			    type: String
            },
            node: {
                default() {
                    return {};
                }
            },
        },
        data(){
            return {
                oldChecked: null,
                oldIndeterminate: null,
                cascader: null
            }
        },
        watch:{
            'node.indeterminate'(val) {
                this.handleSelectChange(this.node.checked, val);
            },

            'node.checked'(val) {
                this.handleSelectChange(val, this.node.indeterminate);
            }
        },
        computed:{
            item(){
            	return this.node.data;
            }
        },
        created() {
            const parent = this.$parent;
            if (parent.isCascader) {
                this.cascader = parent;
            } else {
                this.cascader = parent.cascader;
            }

            const cascader = this.cascader;
            if (!cascader) {
                console.warn('Can not find node\'s cascader.');
            }

            const props = cascader.props || {};
            const childrenKey = props['children'] || 'children';
            this.$watch(`node.data.${childrenKey}.checked`, (e,r,t) => {
                this.node.updateChildren();
            });

            this.showCheckbox = cascader.showCheckbox;

        },
        methods: {
            clickHandler(){
                this.$emit("click");
                this.cascader.main.$emit('click', this.node.data);
            },
            focusHandler(){
                this.$emit("focus")
            },
            keydownHandler(){
                this.$emit("keydown")
            },
            mousedownHandler(){
                this.$emit("mousedown")
            },
            handleCheckChange(value, ev){
                this.node.setChecked(ev.target.checked, !this.cascader.checkStrictly);
                this.$nextTick(() => {
                    const store = this.cascader.store;
                    this.cascader.main.$emit('check', this.node.data, {
                        checkedNodes: store.getCheckedNodes(),
                        checkedKeys: store.getCheckedKeys(),
                        halfCheckedNodes: store.getHalfCheckedNodes(),
                        halfCheckedKeys: store.getHalfCheckedKeys(),
                    });
                });
            },

            handleSelectChange(checked, indeterminate) {
                if (this.oldChecked !== checked && this.oldIndeterminate !== indeterminate) {
                    this.cascader.main.$emit('check-change', this.node.data, checked, indeterminate);
                }
                this.oldChecked = checked;
                this.indeterminate = indeterminate;
            },
        }
    }
</script>