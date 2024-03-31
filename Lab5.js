const assignment = {
    id: 1, title: 'NodeJs Assignment',
    description:'Create a NodeJs server with ExpressJS',
    due:'2021-10-10',completed: false, score: 0,
}
const module = {
    id: 1, name: 'NodeJs Module',
    description:'Create a NodeJs server with ExpressJS',
    course: 'CS5610',
}
const todos = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: false },
    { id: 4, title: "Task 4", completed: true },
  ];
  

const Lab5 = (app) =>{
    app.get("/a5/todos/:id/completed/:completed", (req, res) => {
        const { id, completed } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (todo) {
            todo.completed = completed === 'true';
            res.json(todo);
        } else {
            res.status(404).send('Todo not found');
        }
    });
    app.get("/a5/todos/:id/description/:description", (req, res) => {
        const { id, description } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (todo) {
            todo.description = description;
            res.json(todo);
        } else {
            res.status(404).send('Todo not found');
        }
    });
    app.get("/a5/todos/:id/title/:title", (req, res) => {
        const { id, title } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        todo.title = title;
        res.json(todos);
    });  
    app.post("/a5/todos", (req, res) => {
        const newTodo = {
          ...req.body,
          id: new Date().getTime(),
        };
        todos.push(newTodo);
        res.json(newTodo);
      });
      app.delete("/a5/todos/:id/delete", (req, res) => {
        const { id } = req.params;
        const index = todos.findIndex(todo => todo.id === parseInt(id));
        if (index === -1) {
            // If the todo is not found, send a 404 response
            res.status(404).send('Todo not found');
        } else {
            // Remove the todo from the array
            todos.splice(index, 1);
            // Send a 200 status code and a confirmation message
            res.status(200).send(`Todo with ID ${id} deleted successfully`);
        }
    });    
    app.get("/a5/todos", (req, res) => {
        const { completed } = req.query;
        if (completed !== undefined) {
          const completedBool = completed === "true";
          const completedTodos = todos.filter(
            (t) => t.completed === completedBool);
          res.json(completedTodos);
          return;
        }
        res.json(todos);
      }); 
      app.get("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find(t => t.id === parseInt(id));
        if (todo) {
            res.json(todo);
        } else {
            res.status(404).send('Todo not found');
        }
    });    
    app.delete("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (!todo) {
            res.status(404)
            .json({ message: `Unable to delete Todo with ID ${id}` });
            return;
        }
        todos.splice(todos.indexOf(todo), 1);
        res.sendStatus(200);
    });
    app.put("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (!todo) {
          res.status(404)
            .json({ message: `Unable to update Todo with ID ${id}` });
          return;
        }
        todo.title = req.body.title;
        todo.description = req.body.description;
        todo.due = req.body.due;
        todo.completed = req.body.completed;
        res.sendStatus(200);
      });    
    app.get("/a5/todos", (req, res) => {
        res.json(todos);
      });    
    app.get('/a5/welcome', (req, res) => {
        res.send('Welcome to Assignment 5')
    })
    app.get('/a5/assignment', (req, res) => {
        res.json(assignment)
    })
    app.get('/a5/assignment/title', (req, res) => {
        res.send(assignment.title)
    })
    app.get("/a5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    }); 
    app.get('/a5/assignment/score/:newScore', (req, res) => {
        const { newScore } = req.params;
        assignment.score = newScore;
        res.json(assignment)
    })
    app.get('/a5/assignment/completed', (req, res) => {
        const { status } = req.query;
        assignment.completed = status === 'true';
        res.json(assignment);
    });    
    app.get('/a5/module', (req, res) => {
        res.json(module)
    })
    app.get('/a5/module/name', (req, res) => {
        res.send(module.name)
    })
    app.get("/a5/module/name/:newName", (req, res) => {
        const { newName } = req.params;
        module.name = newName;
        res.json(module);
    })
    app.get("/a5/add/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) + parseInt(b);
        res.send(sum.toString());
    });
    app.get("/a5/subtract/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) - parseInt(b);
        res.send(sum.toString());
    });
    app.get("/a5/multiply/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) * parseInt(b);
        res.send(sum.toString());
    });
    app.get("/a5/divide/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) / parseInt(b);
        res.send(sum.toString());
    });
    app.get('/a5/calculator', (req, res) => {
        const {a,b,operation} = req.query
        let result = 0
        switch(operation){
            case 'add':
                result = parseInt(a) + parseInt(b)
                break
            case 'subtract':
                result = parseInt(a) - parseInt(b)
                break
            case 'multiply':
                result = parseInt(a) * parseInt(b)
                break
            case 'divide':
                result = parseInt(a) / parseInt(b)
                break
            default:
                result = 'Invalid operation'
        }
        res.send(result.toString())
    })
}
export default Lab5;