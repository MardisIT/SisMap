using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SisMap.Data.dyvenpro;

namespace SisMap.Business
{
    public class BOABaseDvy
    {
        public dyvenproDBSEntities _context = new dyvenproDBSEntities();
        public RedisCache _redis = new RedisCache();

       
    }
}