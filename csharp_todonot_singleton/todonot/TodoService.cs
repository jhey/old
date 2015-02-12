using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using todonot.Models;

namespace todonot
{
    public class TodoService
    {

        #region My singleton implementation here...
        private static TodoService _instance = null;
        public static TodoService Instance {
            get {
                if(_instance == null){
                    _instance = new TodoService();
                }
                return _instance;
            }
        }
        #endregion

        private List<TodoViewModel> _todos;     // List of Todos
        private int _seedId;                     // ID - starts at 0;
        // get the array..
        private TodoService() {
            _seedId = 1;
            _todos = new List<TodoViewModel>();
        }

        // get - get all todos
        public List<TodoViewModel> GetTodos() {
            return _todos;
        }

        // READ a particualr Todo passing an ID
        public TodoViewModel GetTodo(int id)  {
           return _todos.Where(t => t.Tid == id).FirstOrDefault();
        }
        // CREATE - new todo
        public int CreateTodo(string Str) {
            TodoViewModel model = new TodoViewModel
            {
                DateCompleted = DateTime.Now,
                Text = Str,
                Tid = _seedId
            };
            _todos.Add(model);
            _seedId++;
            return model.Tid;
        }
        
        // UPDATE - modify existing todo
        public void UpdateTodo(int Id, string Str, bool IsCompleted)
        {
            TodoViewModel model = _todos.Where(t => t.Tid == Id).FirstOrDefault();
            if (model == null)
                return;
            model.Text = Str;
            model.IsCompleted = IsCompleted;
            model.DateCompleted = DateTime.Now;

            //
        }
        // DELETE - remove a todo
        public void DeleteTodo(int Id) {
            if (_todos.Any(x => x.Tid == Id)) {
                TodoViewModel tempMod = _todos.Where(t => t.Tid == Id).FirstOrDefault();
                _todos.Remove(tempMod);
            } else {
                // Could not find, give use some feedback
            }
        }




    }
}