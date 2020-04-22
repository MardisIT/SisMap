﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SisMap.Business;
namespace SisMap.Controllers
{
    public class MapController : Controller
    {
        private DOABancoBarrio _BancoBarioDOA = new DOABancoBarrio();
        // GET: Map
        public ActionResult Index()
        {
            var statustask = _BancoBarioDOA.GetCount();
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult DataMax(string __RequestVerificationToken)
        {
            try
            {
                
                

                    var statustask = _BancoBarioDOA.GetData();
               

            

                return Json(statustask);

            }

            catch (Exception e)
            {

                return null;
            }
        }

    }
}
