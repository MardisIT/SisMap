using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SisMap.Models
{
    public class BankModel
    {
        public string trmId { get; set; }
        public string name { get; set; }
        public string dtrmNombre { get; set; }
        public string direccion { get; set; }
        public string ruc_cedula { get; set; }
        public double? latitud { get; set; }
        public double? longitud { get; set; }
        public string TipoNegocio { get; set; }
        public string Canton { get; set; }
        public string Parroquia { get; set; }
        public string Celular { get; set; }
        public string img { get; set; }
        public string icon { get; set; }
        public double? distancia { get; set; } 
    }

    }