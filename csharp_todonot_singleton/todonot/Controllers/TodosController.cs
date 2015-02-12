using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using todonot.Models;

namespace todonot.Controllers
{
    public class TodosController : Controller
    {
        private TodoService _service;
        public TodosController() {
            _service = TodoService.Instance;

        }

        // READ
         [HttpGet]
        public ActionResult Index() {
            TodoIndexViewModel model = new TodoIndexViewModel();
            model.Todos = _service.GetTodos();
            return View(model);
        }
        // CREATE
        [HttpGet]
        public ActionResult Create() {
            CreateTodoViewModel model = new CreateTodoViewModel();
            model.Text = "Hello Not todo!";
            return View(model);
        }
        /*    */
        [HttpPost]
        public ActionResult Create(CreateTodoViewModel model) {
            int id = _service.CreateTodo(model.Text);
            return RedirectToAction("Index");
        }
        // UPDATE - show update page
        [HttpGet]
        public ActionResult Update(int id)
        {
                 UpdateTodoViewModel model = new UpdateTodoViewModel();
                TodoViewModel todo = _service.GetTodo(id);
                model.IsCompleted = todo.IsCompleted;
                model.Id = todo.Tid;
                model.Text = todo.Text;
                return View(model);
         
        }
        // UPDATE - perform update
        [HttpPost]
        public ActionResult Update(UpdateTodoViewModel model)
        {
            _service.UpdateTodo(model.Id, model.Text, model.IsCompleted);
            return RedirectToAction("Index");

        }

        // DELETE - perform the delete
        [HttpGet]
        public ActionResult Delete(int id)
        {
            _service.DeleteTodo(id);
            return RedirectToAction("Index");
        }
    

    }
}