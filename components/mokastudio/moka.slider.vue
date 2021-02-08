<template>
    <div 
        :id="doc.hasOwnProperty('anchor')? doc.anchor : doc.id"
        v-if="doc" 
        :key="doc.id" 
        :class="'max-w-screen relative flex flex-no-wrap ' + classe(doc.css)" :style="doc.style + ' ' +  background(doc)" :ref="doc.id">
        
            <template v-for="(block,i) in doc.blocks">
                
                <moka-preview-container
                class="slide flex-none top-0 left-0 right-0 bottom-0 w-full"
                v-if="block && block.hasOwnProperty('blocks') && !block.hasOwnProperty('menu')" 
                :doc="block" @action="hasSlideAction"/>
            </template>
            
            
        </div>
    </div>

</template>

<script>
import MokaElement from '@/components/mokastudio/moka.element'
import MokaPreviewContainer from '@/components/mokastudio/moka.slider.container'
import { mapState } from 'vuex'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin ( ScrollTrigger )
const plugins = [ScrollTrigger];
export default {
    name: 'MokaPreviewSlider',
    data:()=>({
        index: -1
    }),
    components: { MokaElement , MokaPreviewContainer },
    props: [ 'doc'  ],
    computed:{
        ...mapState(['moka']),
        animations(){
            
            return gsapEffects
        },
        slides(){
            return this.doc.blocks.length
        },
        
    },
    methods:{
        hasSlideAction(action){
            action === 'slider_next' ? 
                    this.next(1) : 
                        action === 'slider_prev' ? this.next(-1)
                             : null
        },
        next(n){
            this.index < (this.doc.blocks.length + n) ? this.index += n : this.index = 0
            this.index < 0 ? this.index = 0 : null
            this.index >= this.doc.blocks.length ? this.index = 0 : null
            let tl = gsap.timeline()
            tl.to ( '.slide' , { xPercent: -this.index*100 , opacity:1 , duration: 1.5 } )
            
        },
        classe(css){
            return css.hasOwnProperty('css') ? css.css + ' ' + css.container : css
        },
        stile(block,doc){
            if ( !block || !doc ) return 
            let stile = ''
            if ( block.hasOwnProperty('fontFamily')){
                stile += 'font-family:\"' + block.fontFamily + '\"; '
            }
            return block.hasOwnProperty('style') ? block.style + stile : stile
        },
        background(block){
            if ( !block ) return 
            return block.hasOwnProperty('image') ?
                ' background-image:url(' + this.$imageURL(block.image) + ');' : ''
                /*
                block.image && block.image.url ? 
                    block.image.previewUrl ? 
                        ' background-image:url(' + block.image.previewUrl + ');background-size:cover;background-repeat:no-repeat;' :
                            ' background-image:url(' + block.image.url + ');' : ''  : ''
                */        
        },
        animate(element,id){
            let vm = this
            if ( this.$refs && element.hasOwnProperty('gsap') && element.gsap.animation ){
                console.log ( 'animation for => ' , id , this.$refs[id] )
                let ani = gsap.effects[element.gsap.animation]( this.$refs[id] ,{
                    trigger: this.$refs[id],
                    duration: parseFloat(element.gsap.duration),
                    delay: parseFloat(element.gsap.delay),
                    ease: element.gsap.ease
                })
                ScrollTrigger.create({
                    id: id,
                    start: "top 99%",
                    trigger: this.$refs[id],
                    toggleActions: "play pause restart none",
                    animation:ani,
                    onEnter: ()=>{ 
                        console.log ( 'start playing animation')
                        if ( element.gsap.delay ){
                            ani.play()
                        } else {
                            ani.play(0)
                        }
                    },
                    
                });
                    
            }
        },

    },
    mounted(){
        this.next()

    }
}


/*

const slides = document.querySelectorAll("section");
const container = document.querySelector("#panelWrap");
let dur = 0.5;
let offsets = [];
let oldSlide = 0;
let activeSlide = 0;
let dots = document.querySelector(".dots");
let navDots = [];
let iw = window.innerWidth;
const mouseAnim = gsap.timeline({ repeat: -1, repeatDelay: 1 });
const handAnim = gsap.timeline({ repeat: -1, repeatDelay: 1 });
const cursorAnim = gsap.timeline({ repeat: -1, repeatDelay: 1 });
const arrowAnim = gsap.timeline({ repeat: -1, repeatDelay: 1 });

document.querySelector("#leftArrow").addEventListener("click", slideAnim);
document.querySelector("#rightArrow").addEventListener("click", slideAnim);

// set slides background colors and create the nav dots
for (let i = 0; i < slides.length; i++) {
  gsap.set(slides[i], { backgroundColor: colorArray[i] });
  let newDot = document.createElement("div");
  newDot.className = "dot";
  newDot.index = i;
  navDots.push(newDot);
  newDot.addEventListener("click", slideAnim);
  dots.appendChild(newDot);
}

// icon animations for slide 1
mouseAnim.fromTo(
  "#mouseRings circle",
  { attr: { r: 10 } },
  { attr: { r: 40 }, duration: 0.8, stagger: 0.25 }
);
mouseAnim.fromTo(
  "#mouseRings circle",
  { opacity: 0 },
  { opacity: 1, duration: 0.4, stagger:0.25 },
  0
);
mouseAnim.fromTo(
  "#mouseRings circle",
  { opacity: 1 },
  { opacity: 0, duration: 0.4, stagger:0.25 },
  0.4
);

handAnim.to("#hand", { duration: 0.75, rotation: -10, transformOrigin: "center bottom" });
handAnim.to("#hand", { duration: 0.5, rotation: 14, ease: "power3.inOut" });
handAnim.to("#hand", { duration: 1, rotation: 0, transformOrigin: "center bottom" });

cursorAnim.to("#cursor", { duration: 0.25, x: -22 });
cursorAnim.to(
  "#iconCircles circle",
  0.5,
  { duration: 0.5, attr: { r: 6 }, stagger:0.15 },
  "expand"
);
cursorAnim.to("#cursor", { duration: 1.1, x: 40 }, "expand");
cursorAnim.to("#cursor", { duration: 0.75, x: 0 }, "contract");
cursorAnim.to("#iconCircles circle", { duration: 0.5, attr: { r: 4 } }, "contract");

arrowAnim.to("#caret", {
  duration: 0.5,
  attr: { points: "60 30, 35 50, 60 70" },
  repeat: 3,
  yoyo: true,
  ease: "power2.inOut",
  repeatDelay: 0.25
});

// get elements positioned
gsap.set(".dots, .titleWrap", { xPercent: -50 });
gsap.set(".arrow", { yPercent: -50 });
gsap.set(".title", { y: 30 });

// lower screen animation with nav dots and rotating titles
const dotAnim = gsap.timeline({ paused: true });
dotAnim.to(
  ".dot",
  {
    stagger: { each: 1, yoyo: true, repeat: 1 },
    scale: 2.1,
    rotation: 0.1,
    ease: "none"
  },
  0.5
);
dotAnim.to(
  ".title",
  slides.length + 1,
  { y: -(slides.length * 30), rotation: 0.01, ease: "none" },
  0
);
dotAnim.time(1);

// make the whole thing draggable
let dragMe = Draggable.create(container, {
  type: "x",
  edgeResistance: 1,
  snap: offsets,
  inertia: true,
  bounds: "#masterWrap",
  onDrag: tweenDot,
  onThrowUpdate: tweenDot,
  onDragEnd: slideAnim,
  allowNativeTouchScrolling: false,
  zIndexBoost: false
});

dragMe[0].id = "dragger";
sizeIt();

// main action check which of the 4 types of interaction called the function
function slideAnim(e) {
  oldSlide = activeSlide;
  // dragging the panels
  if (this.id === "dragger") {
    activeSlide = offsets.indexOf(this.endX);
  } else {
    if (gsap.isTweening(container)) {
      return;
    }
    // arrow clicks
    if (this.id === "leftArrow" || this.id === "rightArrow") {
      activeSlide =
        this.id === "rightArrow" ? (activeSlide += 1) : (activeSlide -= 1);
      // click on a dot
    } else if (this.className === "dot") {
      activeSlide = this.index;
      // scrollwheel
    } else {
      activeSlide = e.deltaY > 0 ? (activeSlide += 1) : (activeSlide -= 1);
    }
  }
  // make sure we're not past the end or beginning slide
  activeSlide = activeSlide < 0 ? 0 : activeSlide;
  activeSlide = activeSlide > slides.length - 1 ? slides.length - 1 : activeSlide;
  if (oldSlide === activeSlide) {
    return;
  }
  // if we're dragging we don't animate the container
  if (this.id != "dragger") {
    gsap.to(container, dur, { x: offsets[activeSlide], onUpdate: tweenDot });
  }
}

// update the draggable element snap points
function sizeIt() {
  offsets = [];
  iw = window.innerWidth;
  gsap.set("#panelWrap", { width: slides.length * iw });
  gsap.set(slides, { width: iw });
  for (let i = 0; i < slides.length; i++) {
    offsets.push(-slides[i].offsetLeft);
  }
  gsap.set(container, { x: offsets[activeSlide] });
  dragMe[0].vars.snap = offsets;
}

gsap.set(".hideMe", { opacity: 1 });
window.addEventListener("wheel", slideAnim);
window.addEventListener("resize", sizeIt);

// update dot animation when dragger moves
function tweenDot() {
  gsap.set(dotAnim, {
    time: Math.abs(gsap.getProperty(container, "x") / iw) + 1
  });
}*/
</script>
<style>
.xslide {
  height: 100%;
  display: flex;
  align-content: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  position: relative;
  float: left;
}
</style>