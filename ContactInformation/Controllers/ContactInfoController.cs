using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ContactInformation.Models;
using System.Linq;
using System.Collections;

namespace ContactInformation.Controllers
{
    public class ContactInfoController : ApiController
    {
        static readonly IContactRepository repository = new ContactRepository();

        public IEnumerable GetAllContacts()
        {
            return repository.GetAll();
        }

        public ContactInfo PostProduct(ContactInfo item)
        {
            return repository.Add(item);
        }

        public IEnumerable PutProduct(int id, ContactInfo product)
        {
            product.id = id;
            if (repository.Update(product))
            {
                return repository.GetAll();
            }
            else
            {
                return null;
            }
        }

        public IEnumerable DeleteProduct(int id,int status, ContactInfo contact)
        {

            contact.id = id;
            contact.status = status;

            if (repository.Delete(contact))
            {
                return repository.GetAll();
            }
         
                   else
            {
                return null;
            }
        }
    }
}
