<template>
    <div class="tags-view-container">
        <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

        <breadcrumb class="breadcrumb-container"></breadcrumb>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Breadcrumb from '@/components/Breadcrumb'
    import Hamburger from '@/components/Hamburger'

    export default {
        components: {
            Breadcrumb,
            Hamburger
        },
        computed: {
            ...mapGetters([
                'sidebar',
//                'name',
//                'avatar'
            ])
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('toggleSideBar')
            }
        }
    }
</script>
<style>
    .hamburger-container {
        line-height: 58px;
        height: 50px;
        float: left;
        padding: 0 10px;
    }
    .tags-view-container{
        border-bottom: 1px solid #d8dce5;
        height: 50px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    }
</style>

