using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ContactInformation.Models
{
    interface IContactRepository
    {
        IEnumerable<ContactInfo> GetAll();
        ContactInfo Get(int id);
        ContactInfo Add(ContactInfo item);
        bool Update(ContactInfo item);
        bool Delete(ContactInfo item);
    }
    public class ContactRepository:IContactRepository
    {
        webapiContactEntities ContactDB = new webapiContactEntities();

        public IEnumerable<ContactInfo> GetAll()
        {
            // TO DO : Code to get the list of all the records in database
            return ContactDB.ContactInfoes;
        }

        public ContactInfo Get(int id)
        {
            // TO DO : Code to find a record in database
            return ContactDB.ContactInfoes.Find(id);
        }

        public ContactInfo Add(ContactInfo item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }

            // TO DO : Code to save record into database
            ContactDB.ContactInfoes.Add(item);
            ContactDB.SaveChanges();
            return item;
        }

        public bool Update(ContactInfo item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }

            // TO DO : Code to update record into database
            var contacts = ContactDB.ContactInfoes.Single(a => a.id == item.id);
            contacts.FirstName = item.FirstName;
            contacts.LastName = item.LastName;
            contacts.Email = item.Email;
            contacts.PhoneNumber = item.PhoneNumber;
            contacts.status = item.status;
            ContactDB.SaveChanges();

            return true;
        }

        public bool Delete(ContactInfo item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }
            var contacts = ContactDB.ContactInfoes.Single(a => a.id == item.id);
            // TO DO : Code to remove the records from database
            //ContactInfo products = ContactDB.ContactInfoes.Find(id);
            //contacts.FirstName = item.FirstName;
            //contacts.LastName = item.LastName;
            //contacts.Email = item.Email;
            //contacts.PhoneNumber = item.PhoneNumber;
            contacts.status = item.status;
            ContactDB.SaveChanges();
            return true;
        }
    }
}