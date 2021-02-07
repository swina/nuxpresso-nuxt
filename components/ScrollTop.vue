<template>
    <i class="material-icons cursor-pointer text-black bg-white shadow rounded-full fixed bottom-0 right-0 m-2 z-50" style="font-size:3rem;" @click="scrollTop" v-if="visible">keyboard_arrow_up</i>
</template>

<script>
export default {
    name: 'NuxpScrollTop',
    data:()=>({
        visible: false,
        visibleoffset: 120,
        visibleoffsetbottom:0
    }),
    methods:{
        catchScroll(){
            const pastTopOffset = window.pageYOffset > parseInt(this.visibleoffset)
            const pastBottomOffset = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - parseInt(this.visibleoffsetbottom)
            this.visible = parseInt(this.visibleoffsetbottom) > 0 ? pastTopOffset && !pastBottomOffset : pastTopOffset
        },
        scrollTop(){
            window.scrollTo(0,0)
        }
    },
    destroy(){
        window.removeEventListener('scroll')
    },
    mounted(){
        window.smoothscroll = () => {
        let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
        if (currentScroll > 0) {
            window.requestAnimationFrame(window.smoothscroll)
            window.scrollTo(0, Math.floor(currentScroll - (currentScroll / 5)))
        }
        }
        //this.visibleoffset = window.innerHeight
        window.addEventListener('scroll', this.catchScroll)
    }
}
</script>