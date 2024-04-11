// 导入数据库操作方法
import * as dao from "./dao.js";

export default function CourseRoutes(app) {
  // 创建课程
  const createCourse = async (req, res) => {
    const course = await dao.createCourse(req.body);
    res.json(course);
  };

  // 删除课程
  const deleteCourse = async (req, res) => {
    const status = await dao.deleteCourse(req.params.id);
    res.json(status);
  };

  // 查询所有课程
  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    res.json(courses);
  };

  // 通过ID查询课程
  const findCourseById = async (req, res) => {
    const course = await dao.findCourseById(req.params.id);
    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }
    res.json(course);
  };

  // 更新课程信息
  const updateCourse = async (req, res) => {
    const { id } = req.params;
    const status = await dao.updateCourse(id, req.body);
    if (!status.nModified) {
      res.status(404).json({ message: "Course not found or no change made" });
      return;
    }
    res.sendStatus(204);
  };

  // 定义路由
  app.post("/api/courses", createCourse);
  app.get("/api/courses", findAllCourses);
  app.get("/api/courses/:id", findCourseById);
  app.put("/api/courses/:id", updateCourse);
  app.delete("/api/courses/:id", deleteCourse);
}