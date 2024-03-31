import db from "../Database/index.js";

function AssignmentRoutes(app) {
  // Update an assignment
  app.put("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignmentIndex = db.assignments.findIndex((a) => a._id === aid);
    if (assignmentIndex !== -1) {
      db.assignments[assignmentIndex] = {
        ...db.assignments[assignmentIndex],
        ...req.body
      };
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });

  // Delete an assignment
  app.delete("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const initialLength = db.assignments.length;
    db.assignments = db.assignments.filter((a) => a._id !== aid);
    if (initialLength > db.assignments.length) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404); // Not Found if the assignment to delete doesn't exist
    }
  });

  // Create a new assignment for a course
  app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    db.assignments.push(newAssignment);
    res.status(201).send(newAssignment); // Use 201 status code for created resource
  });

  // Get all assignments for a course
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = db.assignments.filter((a) => a.course === cid);
    res.send(assignments);
  });
}

export default AssignmentRoutes;