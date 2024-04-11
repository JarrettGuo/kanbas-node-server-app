import mongoose from "mongoose";

// 定义问题模型，包括问题类型、标题、分数、描述、选项和正确答案
const questionSchema = new mongoose.Schema({
  type: { // 问题类型，如多项选择、是非题等
    type: String,
    enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_IN_BLANKS"],
    required: true,
  },
  title: String, // 问题标题
  points: Number, // 问题分值
  question: String, // 问题描述
  choices: { // 对于多项选择题的选项，仅在多项选择题时需要
    type: [String],
    required: function() { return this.type === "MULTIPLE_CHOICE"; }
  },
  correct: { // 正确答案，可以支持多个正确答案的情况
    type: [String],
    required: true
  },
}, { _id: false }); // 禁用内部 _id 生成，因为问题作为子文档嵌入

// 定义测验模型，包括标题、课程ID、描述、类型、发布状态、发布日期等
const quizSchema = new mongoose.Schema({
  title: { type: String, required: true }, // 测验标题
  courseId: { type: String, required: true }, // 测验所属的课程ID
  description: String, // 测验描述
  type: { // 测验类型，如测验、考试等
    type: String,
    enum: ["QUIZZES", "EXAMS", "ASSIGNMENTS", "PROJECT"],
    default: "QUIZZES",
  },
  isPublished: { type: Boolean, default: false }, // 是否发布
  publishedDate: { // 发布日期，仅在发布时设置
    type: Date,
    required: function() { return this.isPublished; }
  },
  questions: [questionSchema], // 测验包含的问题列表
  dueDate: Date, // 截止日期
  availableDate: Date, // 开始日期
  untilDate: Date, // 结束日期
  shuffleAnswers: { type: Boolean, default: false }, // 是否打乱答案顺序
  timeLimit: Number, // 时间限制
  multipleAttempts: { type: Boolean, default: false }, // 是否允许多次尝试
  showCorrectAnswers: Boolean, // 是否显示正确答案
  accessCode: String, // 访问码
  oneQuestionAtATime: { type: Boolean, default: false }, // 是否一次显示一个问题
  webcamRequired: { type: Boolean, default: false }, // 是否需要网络摄像头
  lockQuestionsAfterAnswering: { type: Boolean, default: false }, // 是否在回答后锁定问题
}, { collection: "quizzes" }); // 指定存储集合为 "quizzes"

export default mongoose.model("QuizModel", quizSchema); // 导出模型