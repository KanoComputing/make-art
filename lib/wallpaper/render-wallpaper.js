import language from '../language/index.js';

export function renderWallpaper(code, width, height) {
    const size = Math.min(width, height);
    const renderSettings = {};
    renderSettings.canvas = document.createElement('canvas');
    renderSettings.canvas.width = size;
    renderSettings.canvas.height = size;
    renderSettings.ctx = renderSettings.canvas.getContext('2d');
    renderSettings.width = 500;
    renderSettings.height = 500;
    renderSettings.ratio = size / 500;
    language.run(code, renderSettings);
    const bg = language.getBackground();
    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = width;
    finalCanvas.height = height;
    const ctx = finalCanvas.getContext('2d');
    ctx.fillStyle = bg || '#ffffff';
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(renderSettings.canvas, (width - size) / 2, (height - size) / 2);
    return finalCanvas;
}
