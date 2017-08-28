"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createImage(_a) {
    var id = _a.id, name = _a.name, url = _a.url;
    return {
        id: id, name: name, url: url,
    };
}
exports.createImage = createImage;
function createImages(data) {
    return data.map(createImage);
}
exports.createImages = createImages;
