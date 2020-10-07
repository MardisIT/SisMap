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
        //[ValidateAntiForgeryToken]
        public  JsonResult DataMax(string __RequestVerificationToken, string mlf,  string bdb, string agc, string atm, string atb, string City="", string lat = "0", string lgn ="0")
        {
            //Geos de prueba
            //float latPrueba = float.Parse("-2,2168469");
            //float lonPrueba = float.Parse("-80,9535783");");
            try
            {


                //Para Publicar  
                List<ProvinceModel> statustask = _BancoBarioDOA.GetDataBank( mlf,  bdb,  agc,  atm, atb, "",  City, float.Parse(lat), float.Parse(lgn));

                //Para Pulicar Desarrollo
                //List<ProvinceModel> statustask = _BancoBarioDOA.GetDataBank(mlf, bdb, agc, atm, atb,"", City, float.Parse(lat.Replace(".", ",")), float.Parse(lgn.Replace(".", ",")));
                //List <ProvinceModel> statustask = _BancoBarioDOA.GetDataBank(mlf, bdb, agc, atm, atb, "", City, lat, lgn);
                return Json(statustask);

            }

            catch (Exception e)
            {

                return null;
            }
        }


   
        [HttpPost]
        //[ValidateAntiForgeryToken]
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
        //[ValidateAntiForgeryToken]
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
