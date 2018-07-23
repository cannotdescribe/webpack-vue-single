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
        <!--:value="!!item.checked"-->
        <el-checkbox
            v-if="showCheckbox"
            v-model="node.checked"
            :indeterminate="node.indeterminate"
            :disabled="!!node.disabled"
            @click.native.stop
            @change="handleCheckChange"
        />
        <!-- @change="changeHandler(activeValue)" -->
        {{item.checked? 1:3}}
        {{item.label}}
    </li>
</template>
<script>
    export default {
        name: "CascaderNode",
        props:{
            node: {
                default() {
                    return {};
                }
            },
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
            }
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
            },
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

            this.$watch(`node.data.${childrenKey}`, () => {
                this.node.updateChildren();
            });

            this.showCheckbox = cascader.showCheckbox;

        },
        methods: {
            clickHandler(){
                this.$emit("click")
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
                    this.cascader.$emit('check', this.node.data, {
                        checkedNodes: store.getCheckedNodes(),
                        checkedKeys: store.getCheckedKeys(),
                        halfCheckedNodes: store.getHalfCheckedNodes(),
                        halfCheckedKeys: store.getHalfCheckedKeys(),
                    });
                });
            },

            handleSelectChange(checked, indeterminate) {
                if (this.oldChecked !== checked && this.oldIndeterminate !== indeterminate) {
                    this.cascader.$emit('check-change', this.node.data, checked, indeterminate);
                }
                this.oldChecked = checked;
                this.indeterminate = indeterminate;
            },
        }
    }
</script>