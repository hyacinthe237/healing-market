<template lang="html">
    <div class="flex-center full-height">
        <div class="content">
            <div class="title m-b-md">
                <i class="feather icon-alert-octagon"></i>
                404! {{ t('Page not found') }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.full-height {
    height: 100vh;
}

.flex-center {
    align-items: center;
    display: flex;
    justify-content: center;
    position: relative;
}

.content {
    text-align: center;
}

.title {
    font-size: 54px;
}
</style>
