import { Request, Response } from 'express';
import TaskController from "../controller";



module.exports = new (class extends TaskController {
    async getAllTasks(req: Request, res: Response) {
        try {
            const tasks = await this.Task.find({}, { _id: 0, id: "$_id", title: 1, description: 1, completed: 1 }).sort({ order: 1 });
            return this.response({
                res,
                message: "success",
                data: {
                    tasks,
                },
            });
        } catch (err) {
            return res.status(500).send({ message: "somethings went wrong" });
        }
    }

    async createTask(req: Request, res: Response) {
        try {
            const { title, description } = req.body
            const completed = false;
            const order = await this.Task.countDocuments() + 1
            const newTask = new this.Task({ title, description, completed, order });
            await newTask.save();
            return this.response({
                res,
                message: "create task successfully",
            });
        } catch (err) {
            return res.status(500).send({ message: "somethings went wrong" });
        }
    }

    async getTask(req: Request, res: Response) {
        try {
            const task = await this.Task.findById(req.params.id, { _id: 0, id: "$_id", title: 1, description: 1, completed: 1 });
            if (!task) return res.status(404).json({ message: 'Task not found' });
            return this.response({
                res,
                message: "success",
                data: {
                    task,
                },
            });
        } catch (err) {
            return res.status(500).send({ message: "somethings went wrong" });
        }
    }

    async updateTask(req: Request, res: Response) {
        try {
            const { title, description, completed } = req.body;
            const task = await this.Task.findByIdAndUpdate(
                req.params.id,
                { title, description, completed },
                { new: true }
            );
            if (!task) return res.status(404).json({ message: 'Task not found' });
            return this.response({
                res,
                message: "update task successfully",
            });
        } catch (err) {
            return res.status(500).send({ message: "somethings went wrong" });
        }
    }

    async deleteTask(req: Request, res: Response) {
        try {
            const task = await this.Task.findByIdAndDelete(req.params.id);
            if (!task) return res.status(404).json({ message: 'Task not found' });
            return this.response({
                res,
                message: "delete task successfully",
            });
        } catch (err) {
            return res.status(500).send({ message: "somethings went wrong" });
        }
    }

    async updateTaskOrder(req: Request, res: Response) {
        const { tasks } = req.body;
        try {
            const bulkOps = tasks.map((task: { id: string; order: number }) => ({
                updateOne: {
                    filter: { _id: task.id },
                    update: { $set: { order: task.order } },
                },
            }));

            await this.Task.bulkWrite(bulkOps);
            return this.response({
                res,
                message: "update tasks order successfully",
            });
        } catch (err) {
            console.log("err", err)
            return res.status(500).send({ message: "somethings went wrong" });
        }
    }
})();



