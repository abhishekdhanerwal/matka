
(function (window) {
  window.__env = window.__env || {};

  var environment = "qa"; //can be dev, test or prod.qa

  if(environment === "qa"){
    window.__env.dataServerUrl = 'http://ec2-18-219-87-5.us-east-2.compute.amazonaws.com:8080';
    window.__env.baseUrl = '/';
    window.__env.enableDebug = true;
    // window.__env.user = "";
    // window.__env.password = "";
  }
  else  {
    window.__env.dataServerUrl = 'http://localhost:8080';
    window.__env.baseUrl = '/';
    window.__env.enableDebug = true;
    // window.__env.user = "9999999999";
    // window.__env.password = "secret";
  }

}(this));



