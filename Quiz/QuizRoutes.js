import * as quizDao from './QuizDao.js';
import quizModel from './QuizModel.js';

export default function QuizRoutes(app) {
  // 创建新测验 例子：http://localhost:4000/api/quizzes
  app.post("/api/quizzes", async (req, res) => {
    const quiz = await quizDao.createQuiz(req.body);
    res.json(quiz); // 返回创建的测验
  });

  // 获取所有测验，支持排序 例子：http://localhost:4000/api/quizzes
  app.get("/api/quizzes", async (req, res) => {
    let sort = {};
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(':');
      sort[parts[0]] = parts[1] === 'asc' ? 1 : -1; // 解析排序参数
    }
    const quizzes = await quizDao.findAllQuizzes().sort(sort);
    res.json(quizzes); // 返回排序后的测验列表
  });

  // 根据ID获取单个测验 例子：http://localhost:4000/api/quizzes/6616ab177482a909f4a36c09
  app.get("/api/quizzes/:quizId", async (req, res) => {
    const quiz = await quizDao.findQuizById(req.params.quizId);
    res.json(quiz); // 返回指定ID的测验
  });

  // 更新指定ID的测验 例子：http://localhost:4000/api/quizzes/6616b25b30e0b9d0a5f9b15d
  app.put("/api/quizzes/:quizId", async (req, res) => {
    const status = await quizDao.updateQuiz(req.params.quizId, req.body);
    res.json(status); // 返回更新结果
  });

  // 删除指定ID的测验 例子：http://localhost:4000/api/quizzes/6616ab177482a909f4a36c09
  app.delete("/api/quizzes/:quizId", async (req, res) => {
    const status = await quizDao.deleteQuiz(req.params.quizId);
    res.json(status); // 返回删除结果
  });

  // 发布测验 例子：http://localhost:4000/api/quizzes/6616ab177482a909f4a36c09/publish
  app.put("/api/quizzes/:quizId/publish", async (req, res) => {
    try {
      const quiz = await quizModel.findByIdAndUpdate(req.params.quizId, {
        isPublished: true,
        publishedDate: new Date() // 设置发布日期
      }, { new: true });
      res.json(quiz); // 返回更新后的测验
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
      console.error(error);
    }
  });  

  // 取消发布测验 例子：http://localhost:4000/api/quizzes/6616ab177482a909f4a36c09/unpublish
  app.put("/api/quizzes/:quizId/unpublish", async (req, res) => {
    try {
      const quiz = await quizModel.findByIdAndUpdate(req.params.quizId, {
        isPublished: false,
        publishedDate: null // 清除发布日期
      }, { new: true });
      res.json(quiz); // 返回更新后的测验
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  //获取指定课程ID下的所有测验  例子：http://localhost:4000/api/quizzes?courseId=WD101
  app.get("/api/quizzes", async (req, res) => {
    let query = {};
    let sort = {};

    // 检查是否有 courseId 查询参数
    if (req.query.courseId) {
      query.courseId = req.query.courseId; // 根据 courseId 过滤
    }

    // 检查是否有排序参数
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(':');
      sort[parts[0]] = parts[1] === 'asc' ? 1 : -1;
    }

    try {
      const quizzes = await quizDao.findAllQuizzes().find(query).sort(sort);
      res.json(quizzes); // 返回过滤和排序后的测验列表
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
}
