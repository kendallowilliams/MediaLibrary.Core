using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;

namespace MediaLibrary.WebUI.ActionResults
{
    public class FileRangeResult : ActionResult
    {
        private string fileName;
        private long? from,
                      to;
        private bool hasValidRange = false;

        public FileRangeResult(string fileName, string range)
        {
            this.fileName = fileName;
            hasValidRange = RangeHeaderValue.TryParse(range, out RangeHeaderValue header);

            if (hasValidRange)
            {
                RangeItemHeaderValue headerValue = header.Ranges.ElementAt(0);

                from = headerValue.From;
                to = headerValue.To;
            }
        }

        public override async Task ExecuteResultAsync(ActionContext context)
        {
            HttpResponse response = context.HttpContext.Response;

            FileInfo info = new FileInfo(this.fileName);
            FileExtensionContentTypeProvider contentTypeProvider = new FileExtensionContentTypeProvider();
            bool isPartial = hasValidRange && !(from == 0 && (to == info.Length - 1 || !to.HasValue));

            contentTypeProvider.TryGetContentType(this.fileName, out string contentType);
            response.StatusCode = isPartial ? 206 : 200;
            response.Headers.Add("Accept-Ranges", "bytes");
            if (!string.IsNullOrWhiteSpace(contentType)) /*then*/ response.Headers.Add("Content-Type", contentType);

            if (isPartial)
            {
                long end = to.HasValue ? to.Value : info.Length - 1,
                     count = end + 1 - from.Value;

                response.Headers.Add("Content-Range", $"bytes {from}-{end}/{info.Length}");
                await response.SendFileAsync(this.fileName, from.Value, count);
            }
            else
            {
                await response.SendFileAsync(this.fileName);
            }
        }
    }
}