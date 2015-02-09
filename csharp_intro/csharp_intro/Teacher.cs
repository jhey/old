using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace csharp_intro
{
    public class Teacher : Person
    {
        public string Subject { get; set; }

        public override void DoGreet()
        {
            base.DoGreet();
            Console.WriteLine("\tHi students!");
        }

    }
}
