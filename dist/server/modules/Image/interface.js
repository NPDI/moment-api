"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createImage(_a) {
    var id = _a.id, name = _a.name, description = _a.description, UserId = _a.UserId;
    return {
        id: id, name: name, description: description, UserId: UserId,
    };
}
exports.createImage = createImage;
function createImages(data) {
    return data.map(createImage);
}
exports.createImages = createImages;
function createImageById(_a) {
    var id = _a.id, name = _a.name, description = _a.description, User = _a.User, UserId = _a.UserId;
    return {
        id: id, name: name, description: description, User: User, UserId: UserId,
    };
}
exports.createImageById = createImageById;
