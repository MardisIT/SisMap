using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace SisMap
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
        protected void Application_PreSendRequestHeaders()
        {
            Response.Headers.Remove("X-Frame-Options");
            Response.AddHeader("X-Frame-Options", "AllowAll");

            //Response.Headers.Remove("Access-Control-Allow-Origin");
            //Response.AddHeader("Access-Control-Allow-Origin", "*");

            //Response.Headers.Remove("Access-Control-Allow-Methods");
            //Response.AddHeader("Access-Control-Allow-Methods", "PUT,POST,OPTIONS");

            //Response.Headers.Remove("Access-Control-Allow-Credentials");
            //Response.AddHeader("Access-Control-Allow-Credentials", "true");

        }
    }
}
