using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DSD_Mobipay.wsBankOperation;

namespace DSD_Mobipay.Controllers
{
    public class BankController : Controller
    {
        [ValidateAntiForgeryToken]
        public string RealizarRecargaMonedero(string xCodigoUsuario, decimal mMonto)
        {

            var wsMobipay = new wsBankOperation.BankOperationClient();

            Guid gBanco = Guid.Empty;
            try
            {
                string ownerId = "89458299-D68E-435E-8369-5BC9D9C85DCD";
                gBanco = new Guid(ownerId);
            }
            catch
            {
                // implement catch 
            }

            Random rnd = new Random();
            long iOperacionBanco = rnd.Next(10000, 99999);

            var movimientoBE = wsMobipay.refillwallet(gBanco, xCodigoUsuario, "00000" + iOperacionBanco.ToString(), mMonto);

            return movimientoBE.lError + "|" + movimientoBE.xRespuesta;
        }

        [ValidateAntiForgeryToken]
        public string BuscarUsuario(string xCodigoUsuario)
        {

            var wsMobipay = new wsBankOperation.BankOperationClient();
            Guid gBanco = Guid.Empty;
            try
            {
                string ownerId = "89458299-D68E-435E-8369-5BC9D9C85DCD";
                gBanco = new Guid(ownerId);
            }
            catch
            {
            }

            var UsuarioBE = wsMobipay.getUser(gBanco, xCodigoUsuario);

            return UsuarioBE.lError + "|" + UsuarioBE.xNombres + ' ' + UsuarioBE.xApellidos + '|' + UsuarioBE.xDocumento;
        }        
        
        public ActionResult BankOperations()
        {
            return View();
        }

        public ActionResult realizarExtorno()
        {
            return View();
        }

        public ActionResult consultarCodigoUsuario()
        {
            return View();
        }

    }
}