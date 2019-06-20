document.getElementById("download").addEventListener('click', () => {
    console.log("Popup DOM fully loaded and parsed");

    function modifyDOM() {
        //You can play with your DOM here or check URL against your regex
        console.log('Tab script:');
        console.log(document.body);
        return document.body.innerHTML;
    }

    //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
    chrome.tabs.executeScript({
        code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
        //Here we have just the innerHTML and not DOM structure
        console.log('Popup script:')
        console.log(results[0]);
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = results[0];
        console.log(tempDiv.getElementsByTagName('vg-media')[0].children[0].src)
        // console.log(tempDiv.getElementsByTagName('title')[0])
        chrome.downloads.download({
            url: tempDiv.getElementsByTagName('vg-media')[0].children[0].src,
            // filename: tempDiv.getElementsByTagName('title')[0].innerHTML.split("-")[0] + ".mp4"
        });
        // window.close();
    });
    
});