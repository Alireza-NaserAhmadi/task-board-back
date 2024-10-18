import express from 'express';
const controller = require("./controller");
const validator = require("./validator");
const router = express.Router();



router.get(
    "/",
    controller.getAllTasks.bind(controller)
);
router.get(
    "/:id",
    controller.getTask.bind(controller)
);
router.post(
    "/",
    validator.taskValidator(),
    controller.validate.bind(controller),
    controller.createTask.bind(controller)
);
router.put(
    "/:id",
    controller.updateTask.bind(controller)
);

router.delete(
    "/:id",
    controller.deleteTask.bind(controller)
);

router.post(
    "/update-order",
    controller.updateTaskOrder.bind(controller)
);



module.exports = router;