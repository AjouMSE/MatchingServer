// Model
const BaseModel = require('@src/models/baseModel');

class UserModel extends BaseModel {
    constructor() {
        super();

        this.idx = null;
        this.name = null;
        this.score = null;
        this.socketId = null;
    }
}

module.exports = UserModel;
