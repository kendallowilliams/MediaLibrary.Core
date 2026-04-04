using MediaLibrary.BLL.Services.Interfaces;
using System;
using System.IO;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace MediaLibrary.BLL.Services
{
    public class WebService : IWebService
    {
        private readonly IHttpClientFactory httpClientFactory;

        public WebService(IHttpClientFactory httpClientFactory)
        {
            this.httpClientFactory = httpClientFactory;
        }

        public async Task<string> GetIpAddress()
        {
            string ip = string.Empty;

            using (var client = httpClientFactory.CreateClient())
            {
                Uri uri = new Uri("http://api.ipify.org/");
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
    }
}