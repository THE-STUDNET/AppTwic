/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


var inAppBrowserRef;
var app = {
    initialize: function() {
      document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
      StatusBar.backgroundColorByHexString("#159f9b");
      if (navigator.connection.type == Connection.NONE) {
        document.addEventListener("online", start);
        navigator.notification.alert('An internet connection is required to continue', null, 'Sorry');
      } else {
        start();
      }
    },
};

function start(){
  if(FCMPlugin) {
    FCMPlugin.getToken(funtion (token) {
      initUrlToken(token);
    },function (err) {
      initUrl()
      }
    );
  }else{
    initUrl()
  }

  document.removeEventListener('online', start);
}

function initUrlToken(token){
    StatusBar.backgroundColorByHexString("#2C2E35");
    inAppBrowserRef.close();
    console.log("URL>>> https://gnam.twic.community/mobile/"+ token + "/" + device.uuid);
    inAppBrowserRef = cordova.InAppBrowser.open('https://gnam.twic.community/mobile/'+ token + '/' + device.uuid, '_self', 'location=no,zoom=no,toolbar=no');
}

function initUrl(){
  StatusBar.backgroundColorByHexString("#2C2E35");
  console.log("URL>>> https://gnam.twic.community/mobile/noFcm/" + device.uuid);
  inAppBrowserRef = cordova.InAppBrowser.open('https://gnam.twic.community/', '_self', 'location=no,zoom=no,toolbar=no');
}

app.initialize();
