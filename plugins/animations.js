import gsap from 'gsap'
const duration = .7
gsap.registerEffect({
    name: "scale",
    effect: (targets, config) => {
        return gsap.fromTo(targets, 
            {
                scale:0,
                opacity:0
            },
            {
                scale:1,
                opacity:1,
                duration: config.duration, 
                ease: config.ease,
                delay: config.delay,
                clearProps: 'opacity'
            }
        );
    },
    defaults: {duration: duration,delay:0,ease:"power1"}, //defaults get applied to any "config" object passed to the effect
    extendTimeline: true, //now you can call the effect directly on any GSAP timeline to have the result immediately inserted in the position you define (default is sequenced at the end)
});


gsap.registerEffect({
    name: "scalein",
    effect: (targets, config) => {
        return gsap.fromTo(targets, 
            {
                scale:2,
                opacity:0
            },
            {
                scale:1,
                opacity:1,
                duration: config.duration, 
                ease: config.ease,
                delay: config.delay,
                clearProps: 'opacity'
            }
        );
    },
    defaults: {duration: duration,delay:0,ease:"power1"}, //defaults get applied to any "config" object passed to the effect
    extendTimeline: true, //now you can call the effect directly on any GSAP timeline to have the result immediately inserted in the position you define (default is sequenced at the end)
});

gsap.registerEffect({
    name: "fade",
    effect: (targets, config) => {
        return gsap.fromTo(targets, 
            {
                opacity: 0,
            }, 
            {
                opacity: 1,
                duration: config.duration, 
                delay: config.delay,
                ease: config.ease,
                clearProps: 'opacity'
            }
        );
    },
    defaults: {duration: duration,delay:0,ease:"power1"}, //defaults get applied to any "config" object passed to the effect
    extendTimeline: true, //now you can call the effect directly on any GSAP timeline to have the result immediately inserted in the position you define (default is sequenced at the end)
});

gsap.registerEffect({
    name: "rotatescale",
    effect: (targets, config) => {
        return gsap.fromTo(targets, 
            {
                opacity: 0,
                scale:.5,
                x:300,
            }, 
            {
                duration: config.duration, 
                opacity: 1,
                scale:1,
                rotation: 360,
                x:0,
                ease: config.ease,
                delay: config.delay,
                clearProps: 'opacity'
            }
        );
    },
    defaults: {duration: duration , delay: 0,ease:"power1"}, //defaults get applied to any "config" object passed to the effect
    extendTimeline: true, //now you can call the effect directly on any GSAP timeline to have the result immediately inserted in the position you define (default is sequenced at the end)
});

gsap.registerEffect({
    name: "rotate",
    effect: (targets, config) => {
        return gsap.to(targets, 
            {
                rotationX: 360,
                opacity:1,
                scale:1,
                duration: config.duration,
                ease: config.ease,
                clearProps: 'all' 
            }
        );
    },
    defaults: {duration: duration}, //defaults get applied to any "config" object passed to the effect
    extendTimeline: true, //now you can call the effect directly on any GSAP timeline to have the result immediately inserted in the position you define (default is sequenced at the end)
});

gsap.registerEffect({
    name: "flipx",
    effect: (targets, config) => {
        return gsap.fromTo(targets, 
            {
                opacity:0
            },
            {
                rotationX: 360,
                opacity:1,
                scale:1,
                duration: config.duration,
                delay: config.delay,
                ease: config.ease,
                clearProps: 'all'
            }
        );
    },
    defaults: {duration: duration, delay: 0,ease:"power1"}, //defaults get applied to any "config" object passed to the effect
    extendTimeline: true, //now you can call the effect directly on any GSAP timeline to have the result immediately inserted in the position you define (default is sequenced at the end)
});

gsap.registerEffect({
    name: "flipy",
    effect: (targets, config) => {
        return gsap.fromTo(targets, 
            {
                opacity:0
            },
            {
                rotationY: 360,
                opacity:1,
                scale:1,
                duration: config.duration,
                delay: config.delay ,
                ease: config.ease,
                clearProps: 'all'
            }
        );
    },
    defaults: {duration: duration , delay: 0,ease:"power1"}, //defaults get applied to any "config" object passed to the effect
    extendTimeline: true, //now you can call the effect directly on any GSAP timeline to have the result immediately inserted in the position you define (default is sequenced at the end)
});

gsap.registerEffect({
    name: "rotatehover",
    effect: (targets, config) => {
        return gsap.fromTo(targets, 
            {
                opacity:.4,
                scaleX:2,
                rotationX:90,
            },
            {
                rotationX: 360,
                opacity:1,
                scale:1,
                duration: 1,
                delay: config.delay,
                ease: config.ease,
                clearProps: 'all' 
            }
        );
    },
    defaults: {duration: duration,delay:0,ease:"power1"}, //defaults get applied to any "config" object passed to the effect
    extendTimeline: true, //now you can call the effect directly on any GSAP timeline to have the result immediately inserted in the position you define (default is sequenced at the end)
});

gsap.registerEffect({
    name: "slideleft",
    effect: (targets, config) => {
        return gsap.fromTo( targets, 
            
            {
                
                autoAlpha: 0,
                x:300
            },
            {
                autoAlpha: 1,
                x:0,
                duration:config.duration,
                delay: config.delay,
                ease: config.ease,
                clearProps: 'all'
            }
        )
    },
    defaults: {duration: duration, delay:0,ease:"power1"}, //defaults get applied to any "config" object passed to the effect
    extendTimeline: true, //now you can call the effect directly on any GSAP timeline to have the result immediately inserted in the position you define (default is sequenced at the end)
});

gsap.registerEffect({
    name: "slideright",
    effect: (targets, config) => {
        return gsap.fromTo( targets, 
            
            {
                
                autoAlpha: 0,
                x:-300
            },
            {
                autoAlpha: 1,
                x:0,
                duration:config.duration,
                delay: config.delay,
                ease: config.ease,
                clearProps: 'all'
            }
        )
    },
    defaults: {duration: duration,delay:0,ease:"power1"}, //defaults get applied to any "config" object passed to the effect
    extendTimeline: true, //now you can call the effect directly on any GSAP timeline to have the result immediately inserted in the position you define (default is sequenced at the end)
});



gsap.registerEffect({
    name: "slidetop",
    effect: (targets, config) => {
        return gsap.fromTo( targets, 
            {
               
                autoAlpha: 0,
                y:200
            },
            {
                
                autoAlpha: 1,
                y:0,
                duration:config.duration,
                delay: config.delay,
                ease: config.ease,
                clearProps: 'all'
            }
        )
    },
    defaults: {duration: duration, delay: 0,ease:"power1"}, //defaults get applied to any "config" object passed to the effect
    extendTimeline: true, //now you can call the effect directly on any GSAP timeline to have the result immediately inserted in the position you define (default is sequenced at the end)
});

gsap.registerEffect({
    name: "slidedown",
    effect: (targets, config) => {
        return gsap.fromTo( targets, 
            {
               
                autoAlpha: 0,
                y:-200
            },
            {
                
                autoAlpha: 1,
                y:0,
                duration:config.duration,
                delay: config.delay,
                ease: config.ease,
                clearProps: 'all'
            }
        )
    },
    defaults: {duration: duration, delay: 0,ease:"power1"}, //defaults get applied to any "config" object passed to the effect
    extendTimeline: true, //now you can call the effect directly on any GSAP timeline to have the result immediately inserted in the position you define (default is sequenced at the end)
});

gsap.registerEffect({
    name: "growwidth",
    effect: (targets, config) => {
        return gsap.fromTo( targets, 
            {
               
                autoAlpha: 0,
                width:0
            },
            {
                
                autoAlpha: 1,
                width:"100%",
                duration:config.duration,
                delay: config.delay,
                ease: config.ease,
                clearProps: 'all'
            }
        )
    },
    defaults: {duration: duration, delay: 0,ease:"power1"}, //defaults get applied to any "config" object passed to the effect
    extendTimeline: true, //now you can call the effect directly on any GSAP timeline to have the result immediately inserted in the position you define (default is sequenced at the end)
});


gsap.registerEffect({
    name: "widthreverse",
    effect: (targets, config) => {
        return gsap.fromTo( targets, 
            {
               
                autoAlpha: 0,
                x:"100%",
                width:0
            },
            {
                
                autoAlpha: 1,
                x:0,
                width:"100%",
                duration:config.duration,
                delay: config.delay,
                ease: config.ease,
                clearProps: 'all'
            }
        )
    },
    defaults: {duration: duration, delay: 0,ease:"power1"}, //defaults get applied to any "config" object passed to the effect
    extendTimeline: true, //now you can call the effect directly on any GSAP timeline to have the result immediately inserted in the position you define (default is sequenced at the end)
});


gsap.registerEffect({
    name: "closeleft",
    effect: (targets, config) => {
        return gsap.fromTo( targets, 
            {
                x:0,
                width:"100%"
            },
            {
                x:"-100%",
                width:0,
                duration:config.duration,
                delay: config.delay,
                ease: config.ease,
                clearProps: 'all'
            }
        )
    },
    defaults: {duration: duration, delay: 0,ease:"power1"}, //defaults get applied to any "config" object passed to the effect
    extendTimeline: true, //now you can call the effect directly on any GSAP timeline to have the result immediately inserted in the position you define (default is sequenced at the end)
});


gsap.registerEffect({
    name: "closeright",
    effect: (targets, config) => {
        return gsap.fromTo( targets, 
            {
                x:0,
            },
            {
                x:"100%",
                duration:config.duration,
                delay: config.delay,
                ease: config.ease,
                clearProps: 'all'
            }
        )
    },
    defaults: {duration: duration, delay: 0,ease:"power1"}, //defaults get applied to any "config" object passed to the effect
    extendTimeline: true, //now you can call the effect directly on any GSAP timeline to have the result immediately inserted in the position you define (default is sequenced at the end)
});



gsap.registerEffect({
    name: "growheight",
    effect: (targets, config) => {
        return gsap.fromTo( targets, 
            {
                autoAlpha:1,
                scaleY:0
            },
            {
                autoAlpha:1,
                scaleY:1,
                duration:config.duration,
                delay: config.delay,
                ease: config.ease,
                clearProps: 'all'
            }
        )
    },
    defaults: {duration: duration , delay: 1,ease:"power1"}, //defaults get applied to any "config" object passed to the effect
    extendTimeline: true, //now you can call the effect directly on any GSAP timeline to have the result immediately inserted in the position you define (default is sequenced at the end)
});



const gsapEffects = [ 'fade' , 'scale' , 'scale-in' , 'flip-x' , 'flip-y' , 'slide-left' , 'slide-right' , 'slide-top' , 'slide-down', 'rotate' , 'rotate-scale' , 'rotate-hover' , 'grow-width' , 'width-reverse' , 'close-left' , 'close-right' , 'grow-height' ]
const gsapEase = [ 'none' , 'power1' , 'power2' , 'power3' , 'power4' , 'back' , 'elastic','bounce','rough','slow','steps','circ','expo','sine' ]
export default { gsapEffects , gsapEase }