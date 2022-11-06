import {createApp} from 'vue';
import PdfView from './PdfView.vue';

export default async function renderPdf(buffer, target) {
    return createApp(PdfView, {
        data: buffer,
    }).mount(target)
}
