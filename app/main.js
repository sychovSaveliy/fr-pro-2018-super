window.onload = function() {
    var send_btn = document.querySelector('#send_btn');
    var form = document.querySelector('#form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var login = document.querySelector('.login').value,
            pass = document.querySelector('.pass').value;

        var body = {
                login: login,
                pass: pass
            };

        doAjax('POST', '/auth', body)
            .then(function(resp){
                if (!resp || !resp.info) {
                    return;
                }
                
                if (resp.info.success) {
                    console.log('OK')
                } else {
                    console.log('NE OK')
                }
            });
        // code
    });
}


const configApi = 'http://localhost:5000';

function doAjax(method, url, body) {
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest(),
            newBody = JSON.stringify(body);

        xhr.open(method, configApi + url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;
        
            if (xhr.status != 200) {
                reject(xhr.status + ': ' + xhr.statusText);
            } else {
                resolve(JSON.parse(xhr.responseText));
            }
        }

        xhr.send(newBody); 
    }); 
}