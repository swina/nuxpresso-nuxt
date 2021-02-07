<template>
    <div>
        <i :class="el.css + ' material-icons moka-icons z-max fixed text-3xl md:hidden top-0 right-0 m-2 '" v-if="el.element === 'menu' && el.responsive" @click="showmenu" style="font-size:3rem;">menu</i>
        <transition name="fade">
            <nav v-if="menu_show" :class="el.css.responsive"> 
                <i :class="'bi-list moka-icons text-3xl z-max md:hidden top-0 right-0 m-1 ' + el.css.responsive" v-if="el.element === 'menu' && el.responsive" @click="showmenu"></i>
                <div v-for="(item,i) in el.items" :class="el.css.css + ' cursor-pointer relative p-1'"> 
                    
                    <nuxt-link :class="el.css.css" :to="item.link">{{ item.label }}</nuxt-link>
                    <div v-if="item.submenu && item.submenu.length" :class="el.css.css + ' ml-2 flex flex-col'"> 
                        <div v-for="sub in item.submenu">
                            <nuxt-link :class="el.css.css" :to="sub.link">{{ sub.label }}</nuxt-link>
                        </div>
                    </div>
                </div>
            </nav>
        </transition>
    </div>
</template>