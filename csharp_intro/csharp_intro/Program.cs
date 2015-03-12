using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace csharp_intro
{
    class Program
    {
        static void Main(string[] args)
        {

            Dog keke = new Dog();

            Student st = new Student();
            st.FirstName = "joe";
            st.LastName = "smith";

            Student st2 = new Student();
            st2.FirstName = "Susan";
            st2.LastName = "Lane";

            Teacher tch = new Teacher();
            tch.FirstName = "Dan";
            tch.Subject = "Csharp & js";
            //tch.
            
            List<Person> peeps = new List<Person>();
            peeps.Add(st);
            peeps.Add(st2);
            peeps.Add(tch);

            foreach (var item in peeps) {
                //Console.WriteLine(item.FirstName + " " + item.LastName + " says hello.");
                item.DoGreet();
                
            }
         
            Console.ReadLine();

        }
    }
}
