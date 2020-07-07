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

            return _context.BancosBarrios.Count();
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
                        _model = _context.BancosBarrios.Where(x => x.estado == "A").ToList();
                        _redis.Set("_redisBancoBarrio", _model);
                    }
                }
                catch (Exception)
                {
                    _model = _context.BancosBarrios.Where(x => x.estado == "A").ToList();
                  
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

        public List<ProvinceModel> GetDataBank(string mlf, string bdb, string agc, string atm, string atb, string city, float lat , float lgn)
        {

            List<ProvinceModel> _data = new List<ProvinceModel>();
            List<BancosBG> _model = new List<BancosBG>();
            List<tb_bancos_descripcion> serviciosT = new List<tb_bancos_descripcion>();
            try
            {
                _model = _redis.Get<List<BancosBG>>("_redisBancos");
                serviciosT = _redis.Get<List<tb_bancos_descripcion>>("_redisBancosServ");
                if (_model == null)
                {
                    _model = _context.BancosBGs.Where(x => x.estado == "A").ToList();
                    _redis.Set("_redisBancos", _model);
                    serviciosT = _context.tb_bancos_descripcion.ToList();
                    _redis.Set("_redisBancosServ", serviciosT);
                }
            }
            catch (Exception)
            {
                _model = _context.BancosBGs.Where(x => x.estado == "A").ToList();

            }
            string[] source = new string[5];
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
            if (bool.Parse(atb))
            {
                source[4] = "atb";
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
            foreach (var item in _model.Where(x => source.Contains(x.trmSupervi) && cites.Contains(x.ciudad.ToUpper())).Select(x => x.provincia).Distinct())
            {
                _data.Add(new ProvinceModel { provincia = item });
            }
            foreach (var item in _data)
            {
                var bank = _model.Where(x => x.provincia == item.provincia && source.Contains(x.trmSupervi)).Select(x => new BankModel
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
                    icon = x.trmSupervi,
                    tipo = x.tipo,
                    LV = x.horarioLV,
                    S = x.horarioS,
                    D = x.horarioD,
                    distancia = Math.Round((Geo.Distancia(lat, lgn, float.Parse(x.latitud.ToString()), float.Parse(x.longitud.ToString()))) / 1)

//                  ,servicios= serviciosT.Where(xs=>xs.codigo==x.trmSupervi).Select(s=> new ServiceModel {servicio=s.nombre }).ToList()

                 //, servicios = ServiciosGet(x.trmSupervi)

                }).ToList();
                if (city == "")
                {

                    if (item.provincia == "Guayas")
                    {
                        // var backr= bank.Where(x => x.distancia < 20).ToList();
                        var backr = bank.ToList();
                        //backr.AsParallel()
                        //.ForAll(s =>
                        //{
                        //    s.servicios = ServiciosGet(s.icon);
                        //});
                        _data.Where(t => t.provincia == item.provincia).First().bancos = backr;
                    }
                    //var backr = bank.Where(x => x.distancia < 20).ToList();
                    //_data.Where(t => t.provincia == item.provincia).First().bancos = backr;

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
                    _model = _context.BancosBGs.Where(x => x.estado == "A").ToList();
                    _redis.Set("_redisBancos", _model);
                }
            }
            catch (Exception)
            {
                _model = _context.BancosBGs.Where(x => x.estado == "A").ToList();

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
        public List<SelectCity> GetCity()
        {

            List<SelectCity> _data = new List<SelectCity>();
            List<BancosBG> _model = new List<BancosBG>();
            try
            {
                _model = _redis.Get<List<BancosBG>>("_redisBancosServ");
                if (_model == null)
                {
                    _model = _context.BancosBGs.Where(x => x.estado == "A").ToList();
                    _redis.Set("_redisBancosServ", _model);
                }
            }
            catch (Exception)
            {
                _model = _context.BancosBGs.Where(x => x.estado == "A").ToList();

            }
            //string[] source = new string[4];

            _data.AddRange(_model.Select(x => new SelectCity { City= x.ciudad.ToUpper() }).Distinct().ToList());

            //foreach (var item in _model.Select(x => x.ciudad.ToUpper()).Distinct().ToList())
            //{
            //    var distinctCities = _model.Where(x => x.provincia == item).Select(x => x.ciudad.ToUpper()).Distinct().ToList();


            //    var cites = distinctCities.Select(x => new SelectCity { City = x }).Distinct().ToList();


            //    _data.Add(new SelectProvince { Provice = item.ToUpper(), Cites = cites });
            //}




            return _data;
        }


        public List<ServiceModel> ServiciosGet(string tpo)
        {

            List<tb_bancos_descripcion> serviciosT = new List<tb_bancos_descripcion>(); ;
            try
            {
                serviciosT = _redis.Get<List<tb_bancos_descripcion>>("_redisBancosServ");
                if (serviciosT == null)
                {
                    serviciosT = _context.tb_bancos_descripcion.ToList();
                    _redis.Set("_redisBancosServ", serviciosT);
                }
            }
            catch (Exception)
            {
                serviciosT = _context.tb_bancos_descripcion.ToList();

            }
            List<ServiceModel> _data = new List<ServiceModel>(); ;
            foreach (var item in serviciosT.Where(x=>x.codigo==tpo)) {
                string titulo = "";
                List<CaracteristicasModel> _datac = new List<CaracteristicasModel>(); ;

                var descripcion = item.descripcion.Split('/');
                if (descripcion.Length > 1) {
                     titulo = descripcion[0];
                       var cart = descripcion[1].Split('-');

                    if (cart.Length > 0) {

                        _datac.AddRange(cart.ToList().Select(x=>new CaracteristicasModel {caract=x }));


                    } 
                }
                if (descripcion.Length == 1 && descripcion[0]!="")
                {
                    var cart = descripcion[0].Split('-');

                    if (cart.Length > 0)
                    {

                        _datac.AddRange(cart.ToList().Select(x => new CaracteristicasModel { caract = x }));


                    }
                    else { 
                    
                    }
                }


                _data.Add(new ServiceModel
                {
                    servicio = item.nombre,
                    descript = titulo,
                    caract = _datac


                }) ;



            }

            //string[] source = new string[4];


            //foreach (var item in _model.Select(x => x.ciudad.ToUpper()).Distinct().ToList())
            //{
            //    var distinctCities = _model.Where(x => x.provincia == item).Select(x => x.ciudad.ToUpper()).Distinct().ToList();


            //    var cites = distinctCities.Select(x => new SelectCity { City = x }).Distinct().ToList();


            //    _data.Add(new SelectProvince { Provice = item.ToUpper(), Cites = cites });
            //}




            return _data;
        }
    }


}