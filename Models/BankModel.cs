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
        public string tipo { get; set; }
        
        public string direccion { get; set; }
        public string ruc_cedula { get; set; }
        public double? latitud { get; set; }
        public double? longitud { get; set; }
        public string TipoNegocio { get; set; }
        public string Provincia { get; set; }
        public string Canton { get; set; }
        public string Parroquia { get; set; }
        public string Celular { get; set; }
        public string img { get; set; }
        public string icon { get; set; }
        public double? distancia { get; set; }
        public string LV { get; set; }
        public string DS { get; set; }
        public string S { get; set; }
        public string D { get; set; }
        public List<ServiceModel> servicios  { get; set; }
}

    }