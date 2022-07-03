import { Viewer } from 'cesium';
import { defineStore } from 'pinia'


interface  ViewStore{
    viewer:Viewer| null;
}
export const useViewerStore = defineStore('viewer', {
    // 推荐使用 完整类型推断的箭头函数
    state: ():ViewStore => ({
        viewer:null
    }),
    actions:{
        setViewer(viewer:Viewer){
            this.viewer=viewer;
        },
    },
  })