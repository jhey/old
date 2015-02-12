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

        // Create
        public ActionResult Create() {
            ViewBag.Message = "Create someting to Not do.";
            return View();
        }
        [HttpPost]
        public ActionResult Create(CreateTodoViewModel model) {
            /*
            model.Todos = PopulateTodo();
            model.Todos.Add(new TodoViewModel {
                Text = model.Text,
                dateCompleted = DateTime.Now,
                isCompleted = false
            });
            return View(model);
             */
              
            return View();
        }


        public ActionResult Nottodo() {
            /*
            ViewBag.Message = "Do not do this...";
            HomeViewModel model = new HomeViewModel();
            model.Name = "NOT!";
            model.Todos = PopulateTodo();
            return View(model);
            */
            return View();
        }




    }
}