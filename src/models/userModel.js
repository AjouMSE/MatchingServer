// Model
const BaseModel = require('@src/models/baseModel');

class UserModel extends BaseModel {
    constructor() {
        super();

        this.id = null;
        this.nickname = null;
        this.score = null;
        this.win = null;
        this.lose = null;
        this.draw = null;
        this.socketId = null;
    }
}

module.exports = UserModel;
