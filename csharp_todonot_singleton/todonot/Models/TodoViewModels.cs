using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace todonot.Models
{
    public class TodoViewModels  { }

    // Data model for TODOS
    public class TodoViewModel {
        public int Tid { get; set; }
        public string Text { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime DateCompleted { get; set; } 
    }

    // READ - Data for the index
    public class TodoIndexViewModel {
        public List<TodoViewModel> Todos { get; set; }
    }

    // CREATE - Data for the Create 
    public class CreateTodoViewModel
    {
           [DisplayName("Do not do the following:")]
        public string Text { get; set; }
           public List<TodoViewModel> Todos { get; set; }
    }


    // UPDATE - data for updating a Todo
    public class UpdateTodoViewModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public bool IsCompleted { get; set; }
    }


}