using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace csharp_intro
{
    public abstract class Person
    {

        public string FirstName {get; set; }
        public string LastName { get; set; }

        public virtual void DoSomething(){
            Console.WriteLine("Hello from Person");
        }

        public virtual void DoGreet()
        {
            Console.WriteLine("my greeting");
        }
        public virtual void Area()
        {
            Console.WriteLine("Im in the North");
        }
        

    }

   
}
