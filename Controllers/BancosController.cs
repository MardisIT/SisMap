using SisMap.Business;
using SisMap.Models;
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
        public ActionResult Index(bool mlf=true, bool bdb=true, bool agc=true, bool atm=true, bool atb = true)
        {
            ViewData["mlf"] = mlf;
            ViewData["bdb"] = bdb;
            ViewData["agc"] = agc;
            ViewData["atm"] = atm;
            ViewData["atb"] = atb;
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult DataMax(string __RequestVerificationToken, string mlf,  string bdb, string agc, string atm, string atb, string City="", string lat = "0", string lgn ="0")
        {
            try
            {



           List<ProvinceModel> statustask = _BancoBarioDOA.GetDataBank( mlf,  bdb,  agc,  atm, atb,  City, float.Parse(lat), float.Parse(lgn));


//var statustask = _BancoBarioDOA.GetDataBank(mlf, bdb, agc, atm, atb, City, float.Parse(lat.Replace(".", ",")), float.Parse(lgn.Replace(".", ",")));

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


        [HttpPost]
        public JsonResult Servicios(string tpo)
        {
            try
            {



                var statustask = _BancoBarioDOA.ServiciosGet(tpo);




                return Json(statustask);

            }

            catch (Exception e)
            {

                return null;
            }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult City(string __RequestVerificationToken)
        {
            try
            {



                var statustask = _BancoBarioDOA.GetProvice().OrderBy(x=>x.Provice);




                return Json(statustask);

            }

            catch (Exception e)
            {

                return null;
            }
        }
    }
}
