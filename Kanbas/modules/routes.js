import * as moduleDao from './dao.js';

function ModuleRoutes(app) {
  app.get("/api/courses/:cid/modules", async (req, res) => {
    try {
      const modules = await moduleDao.findModulesByCourse(req.params.cid);
      res.json(modules);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.post("/api/courses/:cid/modules", async (req, res) => {
    try {
      const newModule = await moduleDao.createModule({ ...req.body, course: req.params.cid });
      res.json(newModule);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.put("/api/modules/:mid", async (req, res) => {
    try {
      const updatedModule = await moduleDao.updateModule(req.params.mid, req.body);
      if (!updatedModule) {
        return res.status(404).send('Module not found');
      }
      res.json(updatedModule);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.delete("/api/modules/:mid", async (req, res) => {
    try {
      const result = await moduleDao.deleteModule(req.params.mid);
      if (!result) {
        return res.status(404).send('Module not found');
      }
      res.sendStatus(200);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
}

export default ModuleRoutes;
