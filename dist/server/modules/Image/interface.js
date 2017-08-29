"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createImage(_a) {
    var id = _a.id, name = _a.name, url = _a.url, UserId = _a.UserId;
    return {
        id: id, name: name, url: url, UserId: UserId,
    };
}
exports.createImage = createImage;
function createImages(data) {
    return data.map(createImage);
}
exports.createImages = createImages;
function createImageById(_a) {
    var id = _a.id, name = _a.name, url = _a.url, User = _a.User, UserId = _a.UserId;
    return {
        id: id, name: name, url: url, User: User, UserId: UserId,
    };
}
exports.createImageById = createImageById;
