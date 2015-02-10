using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Loops
{
    class Program
    {
        static void Main(string[] args)
        {
            int i = 0;
            while (i <= 20) 
            {
                if (i % 2 == 0) 
                {
                   // Console.WriteLine(i);
                }
                i++;
            }
           // Console.ReadLine();
            for (int j = 0; j < 21; j++)

           {
              if(j % 2 == 0){
                  Console.WriteLine(j);
              }  
            };
            //Console.ReadLine() 

            //int[]
            List<int> numbers = new List<int>();
            for (int z = 0; z < 21; z++)
            {
                numbers.Add(z);
            }
            foreach (var item in numbers)
            {
                
                if(item %2==0){
                    Console.WriteLine(item);
                }
            }
            Console.ReadLine();
        }

        

    }
}
