using SisMap.Business;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SisMap.Controllers
{
    public class FarmaciaController : Controller

    {
        private DOAFarmacia _DOAFarmacia = new DOAFarmacia();
        // GET: Farmacia
        public ActionResult Index()
        {

            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult DataMax(string __RequestVerificationToken)
        {
            try
            {



                var statustask = _DOAFarmacia.GetData();




                return Json(statustask);

            }

            catch (Exception e)
            {

                return null;
            }
        }
    }
}
