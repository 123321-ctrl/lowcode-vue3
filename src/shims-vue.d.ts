/* eslint-disable */
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}  

declare module '@/config/templatesConfig.js'
declare module '@/config/propertyRegister.js'
declare module '@/utils/util.js'