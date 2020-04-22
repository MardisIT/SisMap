using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SisMap.Models
{
    public class ProvinceModel
    {
        public string Provice {get;set;}
        public List<BankModel> banks { get; set; } = new List<BankModel>();
}
}