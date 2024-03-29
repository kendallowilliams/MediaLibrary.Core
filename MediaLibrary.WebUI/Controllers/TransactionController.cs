﻿using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.Shared.Services.Interfaces;
using MediaLibrary.WebUI.Models;
using MediaLibrary.Shared.Models.Configurations;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;
using static MediaLibrary.Shared.Enums;
using System.Linq.Expressions;

namespace MediaLibrary.WebUI.Controllers
{
    public class TransactionController : BaseController
    {
        private readonly IDataService dataService;

        public TransactionController(IDataService dataService)
        {
            this.dataService = dataService;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View(new TransactionViewModel());
        }

        [HttpPost]
        public async Task<IActionResult> Index(TransactionViewModel viewModel = null)
        {
            TransactionViewModel transactionViewModel = viewModel ?? new TransactionViewModel();
            DateTime fromDate = transactionViewModel.FromDate.HasValue ? transactionViewModel.FromDate.Value : DateTime.Now.Date,
                     toDate = transactionViewModel.ToDate.HasValue ? transactionViewModel.ToDate.Value : DateTime.Now.Date;
            bool hasTypes = transactionViewModel.SelectedTransactionTypes?.Any() ?? false,
                 hasStatuses = transactionViewModel.SelectedTransactionStatuses?.Any() ?? false,
                 includeErrors = transactionViewModel.SelectedTransactionStatuses.Contains(TransactionStatus.Errored);
            Expression<Func<Transaction, bool>> expr = transaction => (!transactionViewModel.FromDate.HasValue || transaction.CreateDate >= transactionViewModel.FromDate) &&
                                                                      (!transactionViewModel.ToDate.HasValue || transaction.CreateDate <= transactionViewModel.ToDate) &&
                                                                      (!hasTypes || transactionViewModel.SelectedTransactionTypes.Contains(transaction.Type)) &&
                                                                      (!hasStatuses || transactionViewModel.SelectedTransactionStatuses.Contains(transaction.Status) ||
                                                                      (includeErrors && transaction.Type == TransactionTypes.LogError));

            transactionViewModel.FromDate = fromDate;
            transactionViewModel.ToDate = toDate.AddDays(1).AddSeconds(-1);
            transactionViewModel.Transactions = await dataService.GetList(expr).ContinueWith(task => task.Result.OrderByDescending(item => item.CreateDate));

            return View(transactionViewModel);
        }
    }
}