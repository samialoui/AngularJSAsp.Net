using AngularJSApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularJSApp.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Student()
        {
            return View();
        }

        public string InsertStudentRecord(Student Std)
        {
            using(BDEntities db = new BDEntities())
            {
                db.Student.Add(Std);
                db.SaveChanges();
                return "Inserted Successfully";
            }
        
        }

        public JsonResult GetAllStudent()
        {
            BDEntities db = new BDEntities();
            var AllRecord = db.Student.ToList();
            return Json(AllRecord, JsonRequestBehavior.AllowGet);
        }

        public string UpdateStudentRecord(Student Std)
        {
            using (BDEntities db = new BDEntities()) {
                var STUD = db.Student.FirstOrDefault(x => x.ID == Std.ID);

                STUD.Name = Std.Name;
                STUD.Department = Std.Department;
                STUD.Age = Std.Age;
              
                db.SaveChanges();
                return "Student Updated Successfully";

            }
        }

        public string DeleteStudent(Student Std)
        {
            using (BDEntities db = new BDEntities())
            {
                var STUD = db.Student.Where(x => x.ID == Std.ID).FirstOrDefault();

                db.Student.Remove(STUD);
                db.SaveChanges();
                return "Student Deleted Successfully";

            }
        }

    }
}