using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SisMap.Models
{
    public class SelectProvince
    {
       public string Provice { get; set; }
        public List<SelectCity> Cites { get; set; }
    }
}