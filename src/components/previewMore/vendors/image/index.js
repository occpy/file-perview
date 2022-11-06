import {createApp} from 'vue';
import ImageViewer from './ImageViewer.vue';
import {readDataURL} from '../../util';

/**
 * 图片渲染
 */
export default async function renderImage(buffer, target) {
  const url = await readDataURL(buffer);
  return createApp(ImageViewer,{
  image: url ,
  }).mount(target)
}
