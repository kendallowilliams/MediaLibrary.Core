using MediaLibrary.BLL.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace MediaLibrary.BLL.Services
{
    public class WebService : IWebService
    {
        private readonly IHttpClientFactory httpClientFactory;
        private readonly string publicIpUrl;

        public WebService(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            this.httpClientFactory = httpClientFactory;
            this.publicIpUrl = configuration["PublicIpUrl"];
        }

        public async Task<string> GetIpAddress()
        {
            string ip = string.Empty;

            using (var client = httpClientFactory.CreateClient())
            {
                Uri uri = new Uri(this.publicIpUrl);
                var response = await client.GetAsync(uri);

                response.EnsureSuccessStatusCode();
                ip = await response.Content.ReadAsStringAsync();
            }

            return ip;
        }

        public async Task<byte[]> DownloadData(string address, CancellationToken token = default)
        {
            var result = default(byte[]);

            using (var client = httpClientFactory.CreateClient())
            {
                Uri uri = new Uri(address);

                result = await client.GetByteArrayAsync(uri);
            }

            return result;
        }

        public async Task<bool> DownloadFile(string address, string filename, CancellationToken token = default)
        {
            bool result = false;

            using (var client = httpClientFactory.CreateClient())
            {
                Uri uri = new Uri(address);

                using (var stream = await client.GetStreamAsync(uri))
                {
                    using (var fileStream = File.OpenWrite(filename))
                    {
                        await stream.CopyToAsync(fileStream).ContinueWith(_ => result = true);
                    }
                }
            }

            return result;
        }

        public bool IsPrivateIp(string ipAddress)
        {
            var ip = IPAddress.Parse(ipAddress);
            var bytes = ip.GetAddressBytes();

            return (bytes[0] == 10) || 
                (bytes[0] == 172 && bytes[1] >= 16 && bytes[1] <= 31) || 
                (bytes[0] == 192 && bytes[1] == 168);
        }
    }
}