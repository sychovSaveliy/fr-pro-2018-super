window.onload = function() {
    var send_btn = document.querySelector('#send_btn');
    var form = document.querySelector('#form');
    var reg = document.querySelector('#reg');

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


    reg.addEventListener('submit', function(event) {
        event.preventDefault();

        var login = document.querySelector('.reg_login').value,
            pass = document.querySelector('.reg_pass').value,
            pass2 = document.querySelector('.reg_pass2').value;

        var body = {
                login: login,
                pass: pass,
                pass2: pass2
            };

        doAjax('POST', '/registration', body)
            .then(function(resp){
                console.log(resp);
            });
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