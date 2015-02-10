using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using todonot.Models;

namespace todonot.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Welcome the the About page.";

            return View();
        }

        public ActionResult Contact() {
            ViewBag.Message = "Call me @ 555-55-5555";
            return View();
        }

        public ActionResult Create() {
            CreateTodoViewModel model = new CreateTodoViewModel();
            model.Todos = PopulateTodo();
            ViewBag.Message = "Create someting to Not do.";
            return View(model);
        }
        [HttpPost]
        public ActionResult Create(CreateTodoViewModel model) {
            model.Todos = PopulateTodo();
            model.Todos.Add(new TodoViewModel {
                Text = model.Text,
                dateCompleted = DateTime.Now,
                isCompleted = false
            });
            return View(model);
        }


        public ActionResult Nottodo() {
            ViewBag.Message = "Do not do this...";
            HomeViewModel model = new HomeViewModel();
            model.Name = "NOT!";
            model.Todos = PopulateTodo();
            return View(model);
        }

        // Method to pre populate a list of todos
        private static List<TodoViewModel> PopulateTodo() {
            List<TodoViewModel> model = new List<TodoViewModel>();  // List of todos
            model.Add(new TodoViewModel {  // add one todo
                Text = "trip and fall", 
                isCompleted = true, 
                dateCompleted = new DateTime()
            });
            model.Add(new TodoViewModel {  // add one todo
                Text = "fail phase 2",
                isCompleted = false,
                dateCompleted = new DateTime()
            });
            return model;
        }


    }
}