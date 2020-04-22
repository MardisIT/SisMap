using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SisMap.Models
{
    public class BankModel
    {
        public string trmId { get; set; }
        public string trmName { get; set; }
        public string dtrmNombre { get; set; }
        public string trmLocation { get; set; }
        public string ruc_cedula { get; set; }
        public double? Latitud { get; set; }
        public double? Longitud { get; set; }
        public string TipoNegocio { get; set; }
        public string Canton { get; set; }
        public string Parroquia { get; set; }
        public string Celular { get; set; }
    }

    }