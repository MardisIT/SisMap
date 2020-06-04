using SisMap.Business;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SisMap.Controllers
{
    public class BancosController : Controller
    {
        private DOABancoBarrio _BancoBarioDOA = new DOABancoBarrio();
        public ActionResult Index()
        {

            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult DataMax(string __RequestVerificationToken, string mlf , string bdb, string agc, string atm)
        {
            try
            {



                var statustask = _BancoBarioDOA.GetDataBank( mlf,  bdb,  agc,  atm);




                return Json(statustask);

            }

            catch (Exception e)
            {

                return null;
            }
        }
    }
}
