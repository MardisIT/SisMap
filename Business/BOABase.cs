using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SisMap.Data;

namespace SisMap.Business
{
    public class BOABase
    {
        public BG_DbsEntities _context = new BG_DbsEntities();
        public RedisCache _redis = new RedisCache();

       
    }
}