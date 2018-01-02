
var	internal = new Object();

internal.isshellinbackground = function()
{
	if(typeof androidhybrid != "undefined")
	{ 
		return androidhybrid.isShellInBackground();
	}
	return true;
}

internal.shownativeform = function(formid) 
{
	if(typeof formid === "string" && typeof androidhybrid != "undefined")
	{ 
		androidhybrid.showNativeForm(formid);
	}
}

internal.showspaform = function(formid) 
{
	if(typeof formid === "string" && typeof androidhybrid != "undefined")
	{ 
		androidhybrid.showSPAForm(formid);
	}
}

internal.showdynamicform = function(formid) 
{
	if(typeof formid === "string" && typeof androidhybrid != "undefined")
	{ 
		androidhybrid.showDynamicForm(formid);
	}
}

internal.executefunctioninnativecontext = function(name, params)
{
	if(typeof name === "string"  && typeof androidhybrid != "undefined") 
	{
		try {
			if(params instanceof Array) 
			{
				var jsonstr = AndroidJSUtil_JSON_Stringify(params);
				androidhybrid.executeFunctionInNativeContext(name,jsonstr);
			}
			else 
			{
				androidhybrid.executeFunctionInNativeContext(name,null);
			}
		}catch(e) {
			androidhybrid.executeFunctionInNativeContext(name,null);
		}
	}
}

internal.executefunctioninspacontext = function(name, params)
{
	if(typeof name === "string"  && typeof androidhybrid != "undefined") 
	{
		try {
			if(params instanceof Array) 
			{
				var jsonstr = AndroidJSUtil_JSON_Stringify(params);
				androidhybrid.executeFunctionInSPAContext(name,jsonstr);
			}
			else 
			{
				androidhybrid.executeFunctionInSPAContext(name,null);
			}
		}catch(e) {
			androidhybrid.executeFunctionInTCContext(name,null);
		}
	}
}

internal.executefunctionintccontext = function(name, params)
{
	if(typeof name === "string"  && typeof androidhybrid != "undefined") 
	{
		try {
			if(params instanceof Array) 
			{
				var jsonstr = AndroidJSUtil_JSON_Stringify(params);
				androidhybrid.executeFunctionInTCContext(name,jsonstr);
			}
			else 
			{
				androidhybrid.executeFunctionInTCContext(name,null);
			}
		}catch(e) {
			androidhybrid.executeFunctionInTCContext(name,null);
		}
	}
}

function AndroidJSUtil_JSON_Stringify(args) {
    if (typeof JSON === "undefined") {
        var s = "";
        var i, type, start, name, nameType, a;
		if(args instanceof Array) {
			s = s + "[";
			for (i = 0; i < args.length; i++) {
				type = typeof args[i];
				if (args[i] === null)
					s = s + args[i];
				else if ((type === "number") || (type === "boolean")) {
					s = s + args[i];
				} else if ((type === "string") || (args[i] instanceof String)) {
					a = args[i].replace(/\\/g, '\\\\');
					a = a.replace(/"/g, '\\"');
					s = s + '"' + a + '"';
				}else if (args[i] instanceof Object) {
					s = s + AndroidJSUtil_JSON_Stringify(args[i]);
				} 
				if(i < args.length-1)
					s = s + ",";
			} //for
			s = s + "]";
		}
		else if(args instanceof Object) {
			start = true;
			s = s + '{';
			for (name in args) {
				if (!start) {
					s = s + ',';
				}
				s = s + '"' + name + '":';
				nameType = typeof args[name];
				if (args[i][name] === null)
					s = s + args[i][name];
				else if ((nameType === "number") || (nameType === "boolean")) {
					s = s + args[i][name];
				} else if ((typeof args[name]) === 'function') {
					// don't copy the functions
					s = s + '""';
				} else if (args[name] instanceof Object) {
					s = s + AndroidJSUtil_JSON_Stringify(args[name]);
				} else {
					s = s + '"' + args[name] + '"';
				}
				start = false;
			}
			s = s + '}';
		}
        return s;
    } else {
        return JSON.stringify(args);
    }
}