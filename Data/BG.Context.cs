﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SisMap.Data
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class BG_DbsEntities : DbContext
    {
        public BG_DbsEntities()
            : base("name=BG_DbsEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<BancosBarrio> BancosBarrios { get; set; }
        public virtual DbSet<tb_bancos_descripcion> tb_bancos_descripcion { get; set; }
        public virtual DbSet<BancosBG> BancosBGs { get; set; }
    }
}
