using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Linq101.Controllers
{
    public class HomeController : Controller {

        private List<Product> productList;
        public ActionResult Index() {
            // Demo 1 - get items greater than 5
            int[] numbers = {0,8,7,2,1,1,0,6};
            var lowNumbers =
                from nmb in numbers
                where nmb > 5
                select nmb;
            foreach (var item in lowNumbers){
                //Debug.WriteLine(item);    
            }
            // Demo 2 - get items with (a specific value), ie. iteminstock == 0
            createList();
            var soldOutProducts =
                from prd in productList
                where prd.Category == "car"
                select prd;
            foreach (var xitem in soldOutProducts) {
                //Debug.WriteLine(xitem.ProductName);
            }
            // Demo 3 - Lamda
            int[] xnumbers = { 5, 2, 7 };
            int oddNumbers = xnumbers.Count(n => n % 2 == 1);
            Debug.WriteLine(oddNumbers);
           


            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact() {
            ViewBag.Message = "Your contact page.";
            return View();
        }

        // Mockdata
        private void createList() {
            productList = new List<Product> {
                new Product{ProductId = 0, ProductName="Ring", Category="Jewels", UnitPrice=19.99M,UnitsInStock=5},
                new Product{ProductId = 1, ProductName="Shoe", Category="Jewels", UnitPrice=19.99M,UnitsInStock=0},
                new Product{ProductId = 2, ProductName="Dog", Category="Jewels", UnitPrice=19.99M,UnitsInStock=5},
                new Product{ProductId = 3, ProductName="Earing", Category="Jewels", UnitPrice=19.99M,UnitsInStock=0},
                new Product{ProductId = 4, ProductName="Cups", Category="car", UnitPrice=19.99M,UnitsInStock=0},
                new Product{ProductId = 5, ProductName="Tires", Category="car", UnitPrice=19.99M,UnitsInStock=5}
            };
        }
    }

    public class Product {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string Category { get; set; }
        public decimal UnitPrice { get; set; }
        public int UnitsInStock { get; set; }
    }
}
