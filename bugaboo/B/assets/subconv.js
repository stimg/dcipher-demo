(function(){
    
    var domain = null;

    for( i in _em_conv ){
        if( _em_conv[i][0] == '_setDomainName' ){
            domain = _em_conv[i][1];
        }

        if( _em_conv[i][0] == '_registerConversion' ){
            registerConversion( _em_conv[i][1].action, _em_conv[i][1].value );
        }
    }
    
	match = /emarkconv=([0-9fF]+)/.exec(document.location);
	if (match) {
        createCookie( "emarksubconv", match[1], 30, domain );
	}
    


    function createCookie( name, value, days, domain ){
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
        if( domain != null ){
		    document.cookie = name+"="+value+expires+"; path=/; domain=" + domain +";";
        } else {
		    document.cookie = name+"="+value+expires+"; path=/";
        }
    }
   
    function registerConversion( action, value ){

		var cookie = readCookie("emarksubconv");
		if (cookie) {
			var img = new Image();
			var prot = document.location.protocol;

			img.src = (prot == "https:" ? "https://subscriber.e-mark.nl/" : "http://subscriber.e-mark.nl/" ) + "convert.php?action=" + escape(action) + "&value=" + escape(value) + "&cookie=" + escape(cookie); 
        }
    }



	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
})();

