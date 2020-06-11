using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SisMap.Business
{
    public static class Geo
    {
        public static double Distancia(float lato, float lngo, float latd, float lngd)
        {
            float RadioTierraKm = 6378.137F;

            var difLatitud = EnRadianes(latd - lato);
            var difLongitud = EnRadianes(lngd - lngo);

            var a = AlCuadrado(Math.Sin(difLatitud / 2)) +
                (  Math.Cos(EnRadianes(lato)) *  Math.Cos(EnRadianes(latd)) )*
             AlCuadrado(Math.Sin(difLongitud / 2));

            var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
            var res = RadioTierraKm * Convert.ToSingle(c);
            return Math.Round(double.Parse(res.ToString()),3);


        }
        static float EnRadianes(this float valor)
        {
            return Convert.ToSingle(Math.PI / 180) * valor;
        }
        static double AlCuadrado(this double valor)
        {
            return Math.Pow(valor, 2);
        }
    }
}