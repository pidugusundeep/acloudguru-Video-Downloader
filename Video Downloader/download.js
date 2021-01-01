document.getElementById("download").addEventListener('click', () => {
    console.log("Popup DOM fully loaded and parsed");

    function modifyDOM() {
        return document.body.innerHTML;
    }

    chrome.tabs.executeScript({
        code: '(' + modifyDOM + ')();' 
    }, (results) => {
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = results[0];
        chrome.downloads.download({
            url: tempDiv.getElementsByTagName('video')[0].src,
            // filename: tempDiv.getElementsByTagName('title')[0].innerHTML.split("-")[0] + ".mp4"
        });
    });
    
});