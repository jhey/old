using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace todonot.Models
{
    public class HomeViewModels
    {
    }

    public class TodoViewModel {
        public string Text { get; set; }
        public bool isCompleted { get; set; }
        public DateTime dateCompleted { get; set; }
        
    }

    public class HomeViewModel {
        public string Name { get; set; }
        public List<TodoViewModel> Todos { get; set; }
    }

    public class CreateTodoViewModel    {
        [DisplayName("Do not do the following:")]
        public string Text { get; set; }
        public List<TodoViewModel> Todos { get; set; }
    }


}