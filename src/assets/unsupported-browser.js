isIE();
/* Sample function that returns boolean in case the browser is Internet Explorer*/
function isIE() {
    ua = navigator.userAgent;
    /* MSIE used to detect old browsers and Trident used to newer ones*/
    var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    
    return is_ie; 
  }
  /* Redirects to a chrome browser download when IE is detected */
  if (isIE() && window.location.href){
    alert('Internet Explorer detected! Redirecting you to improve your internet experience.');
      window.location.href = "https://www.google.com/intl/en_ca/chrome/"
  }
