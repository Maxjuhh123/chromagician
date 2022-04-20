class Palette {
    constructor(colours, createdDate, modifiedDate) {
        this.id = id;
        this.colours = colours;
        this.createdDate = createdDate;	
        this.modifiedDate = modifiedDate;
    }
};

Palette.prototype.getColours = function () {
    return this.colours;
};

Palette.prototype.getColour = function (index) {
    return this.colours[index];
};

Palette.prototype.setColours = function (colours) {
    this.colours = colours;
};

Palette.prototype.setColour = function (index, colour) {
    this.colours[index] = colour;
};

Palette.prototype.getId = function () {
    return this.id;
};

Palette.prototype.setId = function (id) {
    this.id = id;
};

Palette.prototype.getCreatedDate = function () {
    return this.createdDate;
};

Palette.prototype.setCreatedDate = function (createdDate) {
    this.createdDate = createdDate;
};

Palette.prototype.getModifiedDate = function () {
    return this.modifiedDate;
};

Palette.prototype.setModifiedDate = function (modifiedDate) {
    this.modifiedDate = modifiedDate;
};

Palette.prototype.setId = function (id) {
    this.id = id;
};

Palette.prototype.getId = function () {
    return this.id;
};

module.export = Palette;
