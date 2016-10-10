using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DSD_Mobipay.wsBankOperation;
using System.Web.Script.Serialization;
using System.Net;
using System.IO;

namespace DSD_Mobipay.Controllers
{
    public class BankController : Controller
    {
        [ValidateAntiForgeryToken]
        public string RealizarRecargaMonedero(string xCodigoUsuario, decimal mMonto)
        {

            //var wsMobipay = new wsBankOperation.BankOperationClient();

            //Guid gBanco = Guid.Empty;
            //try
            //{
            //    string ownerId = "89458299-D68E-435E-8369-5BC9D9C85DCD";
            //    gBanco = new Guid(ownerId);
            //}
            //catch
            //{
            //    // implement catch 
            //}

            //Random rnd = new Random();
            //long iOperacionBanco = rnd.Next(10000, 99999);

            //var movimientoBE = wsMobipay.refillwallet(gBanco, xCodigoUsuario, "00000" + iOperacionBanco.ToString(), mMonto);

            //return movimientoBE.lError + "|" + movimientoBE.xRespuesta;
            return "";
        }

        [ValidateAntiForgeryToken]
        public string BuscarUsuario(string xCodigoUsuario)
        {
            HttpWebRequest req;
            StreamReader reader;
            string usuarioJson;
            HttpWebResponse res;
            JavaScriptSerializer js;

            // Obtener Usuario
            var xURLService = "http://mobipayservice.apphb.com/UsuariosService.svc/usuarios/" + xCodigoUsuario;
            req = (HttpWebRequest)WebRequest.Create(xURLService);
            req.Method = "GET";
            UsuarioBE UsuarioResult = new UsuarioBE();
            string mensajeResult = "";
            try
            {
                res = (HttpWebResponse)req.GetResponse();
                reader = new StreamReader(res.GetResponseStream());
                usuarioJson = reader.ReadToEnd();
                js = new JavaScriptSerializer();
                UsuarioResult = js.Deserialize<UsuarioBE>(usuarioJson);
                mensajeResult = "True";
            }
            catch (WebException e)
            {
                HttpStatusCode code = ((HttpWebResponse)e.Response).StatusCode;
                string message = ((HttpWebResponse)e.Response).StatusDescription;
                reader = new StreamReader(e.Response.GetResponseStream());
                string error = reader.ReadToEnd();
                js = new JavaScriptSerializer();
                mensajeResult = js.Deserialize<string>(error);           
            }

            return mensajeResult + "|" + UsuarioResult.Nombres + ' ' + UsuarioResult.Apellidos + '|' + UsuarioResult.Dni;
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

    public class UsuarioBE
    {   
        public string Dni { get; set; }

        
        public string Apellidos { get; set; }

        
        public string Nombres { get; set; }

        
        public string Direccion { get; set; }

        
        public string Celular { get; set; }

        
        public string Mail { get; set; }

        
        public string Estado { get; set; }

        
        public string Clave { get; set; }

        
        public string Codigocliente { get; set; }

        
        public decimal MontoMaximo { get; set; }

        
        public decimal Saldo { get; set; }
    }

}