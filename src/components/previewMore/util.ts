import renders from './renders';

const readBuffer = (file: File) => {
    // @ts-ignore
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = loadEvent => resolve(loadEvent.target.result);
        reader.onerror = e => reject(e);
        reader.readAsArrayBuffer(file);
    })

}

const readDataURL = async (buffer:ArrayBuffer) => {
    // @ts-ignore
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = loadEvent => resolve(loadEvent.target.result);
        reader.onerror = e => reject(e);
        reader.readAsDataURL(new Blob([buffer]));
    });
}

const readText = async (buffer:ArrayBuffer) => {
    // @ts-ignore
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = loadEvent => resolve(loadEvent.target.result);
        reader.onerror = e => reject(e);
        reader.readAsText(new Blob([buffer]), 'utf-8');
    });
}

const getExtend = async (name: string) => {
    const dot = name.lastIndexOf('.')
    return name.substring(dot + 1);
}

const render = async (buffer, type, target) => {
    const getTpe = await type.then(res => res)
    const handler = renders[getTpe];
    if (handler) {
        return handler(buffer, target);
    }  // @ts-ignore
    return renders.error(buffer, target, getTpe);
}


export {
    readBuffer,
    readDataURL,
    readText,
    getExtend,
    render
}