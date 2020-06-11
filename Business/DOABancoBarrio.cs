using SisMap.Data;
using SisMap.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SisMap.Business
{
    public class DOABancoBarrio : BOABase

    {
      
        public int GetCount() {

            return _context.BancosBarrio.Count();
        }


        public List<ProvinceModel> GetData()
        {
         
                List<ProvinceModel> _data = new List<ProvinceModel>();
            List<BancosBarrio> _model = new List<BancosBarrio>();
                 try
                {
                     _model = _redis.Get<List<BancosBarrio>>("_redisBancoBarrio");
                    if (_model == null)
                    {
                        _model = _context.BancosBarrio.Where(x => x.estado == "A").ToList();
                        _redis.Set("_redisBancoBarrio", _model);
                    }
                }
                catch (Exception)
                {
                    _model = _context.BancosBarrio.Where(x => x.estado == "A").ToList();
                  
                }
         
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



    
            return _data;
        }

        public List<ProvinceModel> GetDataBank(string mlf, string bdb, string agc, string atm,string city, float lat , float lgn)
        {

            List<ProvinceModel> _data = new List<ProvinceModel>();
            List<BancosBG> _model = new List<BancosBG>();
            try
            {
                _model = _redis.Get<List<BancosBG>>("_redisBancos");
                if (_model == null)
                {
                    _model = _context.BancosBG.Where(x => x.estado == "A").ToList();
                    _redis.Set("_redisBancos", _model);
                }
            }
            catch (Exception)
            {
                _model = _context.BancosBG.Where(x => x.estado == "A").ToList();

            }
            string[] source = new string[4];
            if (bool.Parse(mlf)) {
                source[0] = "mlf";
            }
            if (bool.Parse(bdb))
            {
                source[1] = "bdb";
            }
            if (bool.Parse(agc))
            {
                source[2] = "agc";
            }
            if (bool.Parse(atm))
            {
                source[3] = "atm";
            }
           
        var cites = _model.Select(x => x.ciudad.ToUpper()).Distinct().ToList();
            if (city != "")
            {
                cites.Clear();
                cites.Add(city);
            }
           
       
            //    var ubicacion = geo.Split(';');
            //var lat = double.Parse(ubicacion[0]);
            //var lng = float.Parse(ubicacion[1]);



            ProvinceModel _provice = new ProvinceModel();
            foreach (var item in _model.Where(x=> source.Contains(x.trmSupervi) && cites.Contains(x.ciudad.ToUpper())).Select(x => x.provincia).Distinct())
            {
                _data.Add(new ProvinceModel { provincia = item });
            }
            foreach (var item in _data)
            {
                var bank = _model.Where(x => x.provincia == item.provincia && source.Contains(x.trmSupervi)&& cites.Contains(x.ciudad.ToUpper())).Select(x => new BankModel
                {
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
                    img = x.banner,
                    icon=x.trmSupervi,
                    distancia = (Geo.Distancia(lat , lgn, float.Parse(x.latitud.ToString()), float.Parse(x.longitud.ToString())))/1



            }).ToList();
                if (city == "")
                {
                    _data.Where(t => t.provincia == item.provincia).First().bancos = bank.Where(x => x.distancia < 6).ToList();
               
                }
                else {
                    _data.Where(t => t.provincia == item.provincia).First().bancos = bank;
                }
               
            }



            
            return _data;
        }

        public List<SelectProvince> GetProvice()
        {

            List<SelectProvince> _data = new List<SelectProvince>();
            List<BancosBG> _model = new List<BancosBG>();
            try
            {
                _model = _redis.Get<List<BancosBG>>("_redisBancos");
                if (_model == null)
                {
                    _model = _context.BancosBG.Where(x => x.estado == "A").ToList();
                    _redis.Set("_redisBancos", _model);
                }
            }
            catch (Exception)
            {
                _model = _context.BancosBG.Where(x => x.estado == "A").ToList();

            }
            string[] source = new string[4];
            foreach (var item in _model.Select(x => x.provincia).Distinct())
            {
                var distinctCities=_model.Where(x => x.provincia == item).Select(x=> x.ciudad.ToUpper()).Distinct().ToList();

                
                var cites= distinctCities.Select(x => new SelectCity { City = x }).Distinct().ToList();


                _data.Add(new SelectProvince { Provice = item.ToUpper() , Cites= cites });
            }




            return _data;
        }
     
    }


}