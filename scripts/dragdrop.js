function handleFileSelect(evt) {
    evt.stopPropagation() && evt.preventDefault();

    var files = evt.dataTransfer.files;
    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
    }

    // now post a new XHR request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/UploadTest');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('all done: ' + xhr.status);
        } else {
            console.log('Something went terribly wrong...');
        }
    };
    xhr.send(formData);
}

function handleDragOver(evt) {
    evt.stopPropagation() && evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
}

var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver);
dropZone.addEventListener('drop', handleFileSelect);