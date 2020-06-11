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
        public JsonResult DataMax(string __RequestVerificationToken, string mlf , string bdb, string agc, string atm,string City="", string lat = "0", string lgn ="0")
        {
            try
            {

                        

                  var statustask = _BancoBarioDOA.GetDataBank( mlf,  bdb,  agc,  atm, City, float.Parse(lat), float.Parse(lgn));


               // var statustask = _BancoBarioDOA.GetDataBank(mlf, bdb, agc, atm, City, float.Parse(lat.Replace(".", ",")), float.Parse(lgn.Replace(".", ",")));

                return Json(statustask);

            }

            catch (Exception e)
            {

                return null;
            }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult Provice(string __RequestVerificationToken)
        {
            try
            {



                var statustask = _BancoBarioDOA.GetProvice();




                return Json(statustask);

            }

            catch (Exception e)
            {

                return null;
            }
        }
    }
}
