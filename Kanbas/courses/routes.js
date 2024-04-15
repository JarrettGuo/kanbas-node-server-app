import * as courseDao from "./dao.js";

export default function CourseRoutes(app) {
    app.get("/api/courses/:id", async (req, res) => {
        try {
            const course = await courseDao.findCourseById(req.params.id);
            if (!course) {
                res.status(404).send("Course not found");
                return;
            }
            res.json(course);
        } catch (error) {
            res.status(500).json({ message: "An error occurred" });
        }
    });

    app.put("/api/courses/:id", async (req, res) => {
        try {
            const result = await courseDao.updateCourse(req.params.id, req.body);
            if (result.matchedCount === 0) {
                res.status(404).json({ message: "No matching course found to update" });
            } else if (result.modifiedCount === 0) {
                res.status(400).json({ message: "No changes detected or update failed" });
            } else {
                res.status(200).json(req.body);
            }
        } catch (error) {
            console.error('Error caught:', error);
            res.status(500).json({ message: "An error occurred", error: error });
        }
    });    
    

    app.delete("/api/courses/:id", async (req, res) => {
        try {
            const status = await courseDao.deleteCourse(req.params.id);
            res.sendStatus(status.deletedCount > 0 ? 200 : 404);
        } catch (error) {
            res.status(500).json({ message: "An error occurred" });
        }
    });

    app.post("/api/courses", async (req, res) => {
        try {
            const course = await courseDao.createCourse(req.body);
            res.json(course);
        } catch (error) {
            res.status(500).json({ message: "An error occurred" });
        }
    });

    app.get("/api/courses", async (req, res) => {
        try {
            const courses = await courseDao.findAllCourses();
            res.json(courses);
        } catch (error) {
            res.status(500).json({ message: "An error occurred" });
        }
    });
}