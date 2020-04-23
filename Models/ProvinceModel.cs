using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SisMap.Models
{
    public class ProvinceModel
    {
        public string provincia { get;set;}
        public List<BankModel> bancos { get; set; } = new List<BankModel>();
}
}