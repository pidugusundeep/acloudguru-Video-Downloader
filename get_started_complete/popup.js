// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

completeHtml = ""

chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action == "getSource") {

    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = request.source;

    // debugger
    console.log(tempDiv.getElementsByTagName('vg-media'))
    console.log(tempDiv.getElementsByTagName('vg-media')[0].children[0].src)
    console.log(tempDiv.getElementsByTagName('title')[0].innerHTML.split("-")[0])


    chrome.downloads.download({
      url: tempDiv.getElementsByTagName('vg-media')[0].children[0].src,
      filename: tempDiv.getElementsByTagName('title')[0].innerHTML.split("-")[0] + ".mp4"
    });



    // debugger
    // message.innerText = a.getElementsByTagName('vg-media')[0].children[0].src
  }
});

function onWindowLoad() {

  var message = document.querySelector('#message');

  var executing = chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  })
  executing.then(onExecuted, onError);
  function onExecuted(result) {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    } else {

    }
  };

  // document.getElementsByTagName('vg-media')[0].children[0].src



}

window.onload = onWindowLoad;

// chrome.downloads.download({
//     url: "https://media.acloud.guru/intro-cloud-computing/video/4fa7818a-4b7b-8ff1-da3c-b9663ffc9baf_fc97f61f-eada-c304-1687-48e6795089bb/720p/intro-cloud-computing-76d73c67-d516-4d5e-9eec-8e865e39518e-720p.mp4?Expires=1561126997&Signature=TE3IYzBVL+gso5mdN6QzrJfwjKoLErfvHG/ZZe/bmFjF9Qty3i40a8CjoWhVihYuFP3ZxBuexhRoyaryvvG5NeDbbY4Q8syUyQJT2wACx1nqq2Uxtvtsyy6Y5fd8QurRCBGB6lSF8kwRASQi07aYkNjCbsO2GPamT3UiNCaEK5/eU/IG71kKEioxEMmGiBtHwhfFh2z4CEZfNIvdzueDZHTs2KBVrwekYRx/DT+Zhf5msYSc6g8gGmlbW4FId5fQA1AfnbgYIf9fRQnujRXb6EH7qDRLUTNBk9MRKjO61loIl6PX6bzWLexh37yRvIurPvov1+RRe777psAfmq9Y8w==&Key-Pair-Id=APKAISLU6JPYU7SF6EUA",
//     // filename: "suggested/filename/with/relative.path" // Optional
//   });