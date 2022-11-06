import {readText} from '../../util';
import {createApp} from 'vue';
import CodeViewer from './CodeViewer.vue';

/**
 * 渲染文本
 * @param buffer 文本二进制内容
 * @param target 目标
 */
export default async function renderText(buffer:ArrayBuffer, target:any) {
    const text = await readText(buffer);
    return createApp(CodeViewer, {
        value: text
    }).mount(target)
}
