namespace MediaLibrary.Shared.Services.Interfaces
{
    public interface ICryptoService
    {
        string Encrypt(string key, string plainText);
        string Decrypt(string key, string cipherText);
    }
}
