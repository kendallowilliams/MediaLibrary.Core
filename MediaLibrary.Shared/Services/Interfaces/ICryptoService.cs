using System;
using System.Collections.Generic;
using System.Text;

namespace MediaLibrary.Shared.Services.Interfaces
{
    public interface ICryptoService
    {
        string Encrypt(string key, string plainText);
        string Decrypt(string key, string cipherText);
    }
}
