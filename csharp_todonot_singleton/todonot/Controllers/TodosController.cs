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

         [HttpGet]
        public ActionResult Index() {
            TodoIndexViewModel model = new TodoIndexViewModel();
            model.Todos = _service.GetTodos();
            return View(model);
        }

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
    

    }
}