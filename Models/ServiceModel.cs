using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SisMap.Models
{
    public class ServiceModel
    { 
 
        public string servicio { get; set; }
        public string descript { get; set; }

        public List<CaracteristicasModel> caract=new List<CaracteristicasModel>();
    }
}