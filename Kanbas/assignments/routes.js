import * as assignmentDao from './dao.js';

function AssignmentRoutes(app) {
  // Get all assignments for a course
  app.get("/api/courses/:cid/assignments", async (req, res) => {
    try {
      const assignments = await assignmentDao.findAllAssignmentsByCourse(req.params.cid);
      res.json(assignments);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // Create a new assignment for a course
  app.post("/api/courses/:cid/assignments", async (req, res) => {
    try {
      const newAssignment = await assignmentDao.createAssignment({ ...req.body, course: req.params.cid });
      res.status(201).json(newAssignment);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // Update an assignment
  app.put("/api/assignments/:aid", async (req, res) => {
    try {
      const updatedAssignment = await assignmentDao.updateAssignment(req.params.aid, req.body);
      if (!updatedAssignment) {
        return res.status(404).send('Assignment not found');
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // Delete an assignment
  app.delete("/api/assignments/:aid", async (req, res) => {
    try {
      const result = await assignmentDao.deleteAssignment(req.params.aid);
      if (result) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404); // Not Found if the assignment to delete doesn't exist
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
}

export default AssignmentRoutes;
