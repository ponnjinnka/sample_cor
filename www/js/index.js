/**
 * Cordovaの設定部分。
 */
var app = {
 
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
 
    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        /* 書き込み対象のファイルのパスを指定する。 */
        window.logToFile.setLogfilePath('/data/CloudJets/log.txt', function () {
            window.logToFile.debug('ログ出力準備完了');
        }, function (err) {
            alert("log fail");
        });
    }
};
 
app.initialize();
 
 
 
/**
 * ここからAngularJSの設定部分。
 */
var module = angular.module('jetsCloudApp', ['onsen']);
module.controller('AppController', function ($scope) {
});
module.controller('PageController', function ($scope) {
    ons.ready(function () {
        window.logToFile.debug('OnsenUIの読み込み完了');
    });
});
 
 
/**
 * ログの実験。
 */
 
var logfilePathStr = ""
function outPutLog() {
    window.logToFile.debug('ログを出力する');
    
    window.logToFile.getLogfilePath(function (logfilePath) {
        alert(logfilePath);
 
        //(file:///~)
        fileRead(logfilePath);
    }, function (err) {
        alert("error: " + error.code);
    });
}
 
function fileRead(logfilePath) {
    //ファイルパスを指定してファイルを読み込む
    logfilePathStr = logfilePath
    window.resolveLocalFileSystemURL(logfilePath, gotFile, onFileSystemFail);
}
 
function onFileSystemFail(error) {
    alert("error: " + error.code);
}
 
function gotFile(fileEntry) {
    fileEntry.file(function (file) {
        var reader = new FileReader();
 
        reader.onloadend = function (e) {
            var logAreaElement = document.getElementById("log-textarea");
            logAreaElement.innerHTML = this.result;
 
            var logpathElement = document.getElementById("logpath");
            logpathElement.innerHTML = logfilePathStr;
        }
        reader.readAsText(file);
    });
}