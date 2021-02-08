import dotenv from 'dotenv'
import path from 'path'
import axios from 'axios'
import fs from 'fs-extra'
dotenv.config()
console.log (  'Strapi CMS => ' , process.env.API_URL )

//Full Static mode and local upload copy Strapi uploads folder to static folder
function importAssets(){
  // With Promises:
  console.log ( 'Importing assets ...')
  fs.copy(process.env.UPLOADS_FOLDER ,'./static/uploads' )
  .then(() => {
    console.log('Assets imported!')
  })
  .catch(err => {
    console.error(err)
  })
}

//default dynamic routes used by nuxpresso
let dynamicRoutes = () => {
  //import assets before
  process.env.FULL_STATIC && process.env.LOCAL_ASSETS ? importAssets() : null

  //generate dynamic routes /category/<category_slug>
  return new Promise(resolve => {
    axios.get( process.env.API_URL + 'categories' ).then ( response => {
      if ( !response.data ) return false
      const cats = response.data
      axios.get( process.env.API_URL + 'articles' ).then( response => {
        const categories = cats.map ( el => {
          return {
            route: '/category/' + el.slug,
            payload: response.data
          }
        })
        resolve ( categories )
        //your dynamic route goes here example
        /*
        axios.get( process.env.API_URL + 'articles/4' ).then( response => {
          const myroute = 
            {
              route: '/' + response.data.slug,
              payload: response.data
            }
          
          resolve ( categories.concat(myroute) ) //remove resolve (categories)
        })    
        */
      })
    })
  })
}

console.log ( process.env.NODE_ENV )
export default {
  
  target: 'static',
  ssr: true,
  /*
   ** Headers of the page
   */
  env: {
    strapiBaseUri: process.env.API_URL || "http://localhost:1338",
    VERSION: "0.0.1",
    emailSender : process.env.EMAIL_SENDER,
    emailConfirm: process.env.FORM_CONFIRM,
    development : process.env.NODE_ENV === 'development' ? true : false
  },

  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "nuxpresso-nuxt",
        name: "nuxpresso static site generator",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        //Used fonts
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family="+process.env.FONT_FAMILIES
      },
      { 
        //Material Design Icons
        rel: "stylesheet" ,
        href: "https://fonts.googleapis.com/icon?family=Material+Icons"
      },
      { 
        //Bootstrap Icons
        rel: "stylesheet" ,
        href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
      }

    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loadingIndicator: {
    color: '#c3c3c3',
    background: 'white',
    continuous: true
  },
  /*
   ** Global CSS
   */
  css: [
    "~/assets/css/tailwind.css"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/utils.js" , 
    "~/plugins/moka.js" , 
    { src: "~/plugins/animations.js" , ssr: false } , 
    { src: "~/plugins/gsap.js" , ssr: false }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/recaptcha',
    '@nuxtjs/google-analytics'
  ],
  tailwindcss: {
      exposeConfig: true
  },
  recaptcha : {
    siteKey: process.env.RECAPTCHA,
    version: 3,
    size: 'invisible',
    hideBadge: true
  },
  postcss: {
    plugins: {
      'postcss-import': {},
      tailwindcss: path.resolve(__dirname, './tailwind.config.js'),
      'postcss-nested': {}
    }
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/apollo", 
    "@nuxtjs/markdownit",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/axios"
  ],
  markdownit: {
    preset: "default",
    linkify: true,
    breaks: true,
    injected: true,
    html: true
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: (process.env.API_URL ) + "graphql",
        fetchPolicy: 'cache'
      }
    }
  },
  axios: {
    baseUrl: process.env.API_URL 
  },
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS || 'UA-XXX-X'
  },
  /*
   ** Build and generate configuration
   */
  generate: {
    routes: dynamicRoutes, //add dynamic routes
    fallback: true
  },
  build: {
    /*
     ** You can extend webpack config here
     */
    srcDir: 'src',
    buildDir: 'dist',
    extractCSS: true,
    
    // this is not required, output as one css file instead of one by page.
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    extend(config, ctx) {},
    transpile: [
      "gsap"
    ],
    babel: {
      presets({ isServer }) {
        return [  
          [
            require.resolve('@nuxt/babel-preset-app'),
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 },
              useBuiltIns: "entry"
            }
          ]
        ]
      }
    }
  }
};
