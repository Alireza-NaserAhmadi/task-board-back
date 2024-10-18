const expressValidator = require("express-validator");
const check = expressValidator.check;

module.exports = new (class {

    taskValidator() {
        return [
            check("title").notEmpty().withMessage("title is required"),
            check("description").notEmpty()
                .withMessage("description is required"),
        ];
    }


})();
