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
                    _data.Add(new ProvinceModel { Provice = item });
                }
                foreach (var item in _data)
                {
                  var bank=  _model.Where(x => x.provincia == item.Provice).Select(x=>new BankModel {
                     trmName=x.nombreLocal,
                        dtrmNombre = x.propietario,
                        trmLocation = x.tiponegocio,
                        ruc_cedula = x.cedula,
                        Latitud = x.latitud,
                        Longitud = x.longitud,
                        TipoNegocio = x.tiponegocio,
                        Canton = x.ciudad,
                        Parroquia = x.parroquia,
                        Celular=x.telefono,


                    }).ToList();
                    _data.Where(t => t.Provice == item.Provice).First().banks = bank;
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