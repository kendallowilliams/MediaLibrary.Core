using System;
using System.Threading.Tasks;
using MediaLibrary.BLL.Services.Interfaces;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using System.Text;
using System.Threading;
using System.IO;

namespace MediaLibrary.BLL.Services
{
    public class WebService : IWebService
    {
        private readonly IHttpClientFactory httpClientFactory;

        public WebService(IHttpClientFactory httpClientFactory)
        {
            this.httpClientFactory = httpClientFactory;
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
                        await stream.CopyToAsync(fileStream);
                    }
                }
            }

            return result;
        }

        public async Task<T> Get<T>(Uri baseUri, string relativePath, string username, string password)
        {
            T results = default;
            HttpResponseMessage response = default;
            string credentials = $"{username}:{password}",
                   authorization = Convert.ToBase64String(Encoding.UTF8.GetBytes(credentials));
            
            using (var client = httpClientFactory.CreateClient("DecompressionClient"))
            {
                client.BaseAddress = baseUri;
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authorization);
                response = await client.GetAsync(relativePath);

                if (response.IsSuccessStatusCode)
                {
                    results = JsonConvert.DeserializeObject<T>(await response.Content.ReadAsStringAsync());
                }
            }

            return results;
        }

        public async Task PostJSON(Uri baseUri, string relativePath, object objectToSerialize, string username, string password)
        {
            HttpResponseMessage response = default;
            string credentials = $"{username}:{password}",
                   authorization = Convert.ToBase64String(Encoding.UTF8.GetBytes(credentials));

            using (var client = httpClientFactory.CreateClient())
            {
                client.BaseAddress = baseUri;
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authorization);
                response = await client.PostAsync(relativePath, new StringContent(JsonConvert.SerializeObject(objectToSerialize), Encoding.UTF8, "application/json"));
                response.EnsureSuccessStatusCode();
            }
        }

        public async Task<bool> IsAuthorized(Uri baseUri, string relativePath, string username, string password)
        {
            bool authorized = false;
            HttpResponseMessage response = default;
            string credentials = $"{username}:{password}",
                   authorization = Convert.ToBase64String(Encoding.UTF8.GetBytes(credentials));

            using (var client = httpClientFactory.CreateClient())
            {
                client.BaseAddress = baseUri;
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authorization);
                response = await client.GetAsync(relativePath);
                authorized = response.IsSuccessStatusCode;
            }

            return authorized;
        }
    }
}