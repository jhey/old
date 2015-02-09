using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace csharp_intro
{
    public class Student : Person
    {

        public override void DoGreet() {
            Console.WriteLine("Howdy from texas");
        }
        public override void Area()
        {
            Console.WriteLine("from the Dirty dirty South");
        }
    }
}
