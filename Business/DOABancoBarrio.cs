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
    
    }

}