using SisMap.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SisMap.Business
{
    public class DOABancoBarrio:BOABase

    {
        public int GetCount() {

            return _context.BancosBarrio.Count();
        }


        public List<ProvinceModel> GetData()
        {
            List<ProvinceModel> _data = new List<ProvinceModel>();
            try
            {

              var _model =  _context.BancosBarrio.Where(x=>x.estado=="A").ToList();
               

                ProvinceModel _provice = new ProvinceModel();
                foreach (var item in _model.Select(x=>x.provincia).Distinct()) 
                {
                    _data.Add(new ProvinceModel { provincia = item });
                }
                foreach (var item in _data)
                {
                    var bank = _model.Where(x => x.provincia == item.provincia).Select(x => new BankModel {
                        name = x.nombreLocal,
                        dtrmNombre = x.propietario,
                        direccion = x.direccion,
                        ruc_cedula = x.cedula,
                        latitud = x.latitud,
                        longitud = x.longitud,
                        TipoNegocio = x.tiponegocio,
                        Canton = x.ciudad,
                        Parroquia = x.parroquia,
                        Celular = x.telefono,
                        img = x.imagen


                    }).ToList();
                    _data.Where(t => t.provincia == item.provincia).First().bancos = bank;
                }
            

            }
            catch (Exception)
            {

                return null;
            }
            return _data;
        }
    }

}