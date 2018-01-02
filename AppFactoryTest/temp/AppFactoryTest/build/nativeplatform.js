
// JS to lua bridge api
//1. internal.shownativeform(“formid”)
//2. internal.showdynamicform(“formid”)
//3. internal.showspaform(“formid”)
//4. internal.executefunctioninspacontext(“functionname”, “params”);
//5. internal.executefunctioninnativecontext(“functionname”, “params”);
//6. internal.executefunctionintccontext(“functionname”, “params”);
//7. internal.isshellinbackground()


kony_native_hybrid_009_007 = false; 

internal = {

	//internal.isshellinbackground()
  	isshellinbackground: function() 
    {
    	return kony_native_hybrid_009_007;
  	},

	// internal.shownativeform(“formid”) 
  	shownativeform: function(formid) 
    {
		if (typeof(formid) == "string") 
        {
			window.open ("konyhybridcall://shownativeform?formid="+formid);
		}
  	},

    
    // internal.showdynamicform(“formid”)
  	showdynamicform: function(formid) 
    {
		if (typeof(formid) == "string") 
        {
			window.open ("konyhybridcall://showdynamicform?formid="+formid);
		}
  	},



    // internal.showspaform(“formid”)
  	showspaform: function(formid) 
    {
		if (typeof(formid) == "string") 
        {
			window.open ("konyhybridcall://showspaform?formid="+formid);
		}
  	},



	// var json = [ { "string":"prajakt","number":2,"boolean":true , "table": [1,2,4,5] },"prajakt123", 1,true];
    
	// internal.executefunctioninnativecontext(“functionname”, “params”);
    executefunctioninnativecontext: function(funcid, jsonparams) 
    {
        if (typeof(funcid) == "string") 
        {
            var str = "konyhybridcall://executefunctioninnativecontext?funcid="+funcid;
            if(jsonparams != null)
            {
                str = str + "&params="+JSON.stringify(jsonparams);
            }
//    		window.alert(str);
            window.open (str);
        }
  	},
    
    
    // internal.executefunctioninspacontext(“functionname”, “params”);
    executefunctioninspacontext: function(funcid, jsonparams) 
    {
        if (typeof(funcid) == "string") 
        {
            var str = "konyhybridcall://executefunctioninspacontext?funcid="+funcid;
            if(jsonparams != null)
            {
                str = str + "&params="+JSON.stringify(jsonparams);
            }
            // window.alert(str);
            window.open (str);
        }
  	},

    
    
    // internal.executefunctionintccontext(“functionname”, “params”);
    executefunctionintccontext: function(funcid, jsonparams) 
    {
        if (typeof(funcid) == "string") 
        {
            var str = "konyhybridcall://executefunctionintccontext?funcid="+funcid;
            if(jsonparams != null)
            {
                str = str + "&params="+JSON.stringify(jsonparams);
            }
            // window.alert(str);
            window.open (str);
        }
  	}
};


//hybrid.shownativeform = internal.shownativeform;
//hybrid.showdynamicform = internal.showdynamicform;
//hybrid.showspaform = internal.showspaform;
//hybrid.isshellinbackground = internal.isshellinbackground;

hybrid.executefunctioninspacontext = internal.executefunctioninspacontext;
hybrid.executefunctioninnativecontext = internal.executefunctioninnativecontext;
hybrid.executefunctionintccontext = internal.executefunctionintccontext;


//logging func
kony.print = function()
{
	if (kony.runmode === "d")
    {
        if (kony.mode === "s") 
        {
       		var _params = arguments[0];
			if(_params != null)
			{
				var str = "konyhybridcall://hybridlog : ";
				str = str + JSON.stringify(_params);
				window.open(str);
			}
        }
    }
};








