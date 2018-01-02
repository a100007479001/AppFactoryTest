kony.mvc = kony.mvc || {};
kony.mvc.BaseController = function() {
    var viewModel;
    defineGetter(this, "view", function() {
        viewModel = viewModel || this.__initializeView(this);
        return viewModel
    });
    defineSetter(this, "view", function(val) {
        viewModel = val
    })
};
kony.mvc = kony.mvc || {};
inheritsFrom = function(child, parent) {
    child.prototype = Object.create(parent.prototype)
};
kony.mvc.FormController = function(viewId1) {
    this.modelDriven = false;
    this.model = null;
    this.modelContext = null;
    this.formConfig = null;
    this.config = null;
    this.__initializeView = function(objController) {
        var retForm = null;
        formCreateFunc = require(objController.viewId);
        var formConfig = formCreateFunc(objController);
        if (Object.prototype.toString.call(formConfig) === "[object Array]") {
            retForm = new _kony.mvc.Form2(formConfig[0], formConfig[1], formConfig[2])
        } else {
            retForm = new _kony.mvc.Form2(formConfig)
        }
        kony.mvc.formView2ControllerMap[objController.viewId] = objController;
        return retForm
    };
    this.show = function() {
        if (null != this.view) {
            _kony.mvc.showForm(this.view)
        }
    };
    this.getPreviousForm = function() {
        var prevForm = kony.application.getPreviousForm();
        if (null != prevForm) return prevForm.id;
        return null
    };
    this.getPreviousFormFriendlyName = function() {
        var prevForm = kony.application.getPreviousForm();
        if (null != prevForm) {
            var fName = kony.mvc.registry.getFriendlyName(prevForm.id);
            if (null != fName) return fName;
            else return prevForm.id
        }
        return null
    };
    this.getCurrentForm = function() {
        var currForm = kony.application.getCurrentForm();
        if (null != currForm) return currForm.id;
        return null
    };
    this.getCurrentFormFriendlyName = function() {
        var currForm = kony.application.getCurrentForm();
        var fName = kony.mvc.registry.getFriendlyName(currForm.id);
        if (null != fName) return fName;
        else return currForm.id;
        return null
    };
    this.destroyForm = function() {
        if (null != this.view) {
            _kony.mvc.destroyForm(this.view)
        }
        this.view = null
    };
    this.viewId = viewId1;
    kony.mvc.BaseController.call(this)
};
inheritsFrom(kony.mvc.FormController, kony.mvc.BaseController);
kony.mvc = kony.mvc || {};
kony.utils = kony.utils || {};
kony.application = kony.application || {};
kony.utils.showLoadingScreen = function(msg) {
    msg = " " + msg + " \n";
    kony.application.showLoadingScreen(null, msg, constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null)
};
kony.utils.dismissLoadingScreen = function() {
    kony.application.dismissLoadingScreen()
};

function accessorDescriptor(field, fun) {
    var desc = {
        enumerable: true,
        configurable: true
    };
    desc[field] = fun;
    return desc
}

function defineGetter(obj, prop, get) {
    if (Object.defineProperty) return Object.defineProperty(obj, prop, accessorDescriptor("get", get));
    if (Object.prototype.__defineGetter__) return obj.__defineGetter__(prop, get);
    throw new Error("browser does not support getters")
}

function defineSetter(obj, prop, set) {
    if (Object.defineProperty) return Object.defineProperty(obj, prop, accessorDescriptor("set", set));
    if (Object.prototype.__defineSetter__) return obj.__defineSetter__(prop, set);
    throw new Error("browser does not support setters")
}
inheritsFrom = function(child, parent) {
    child.prototype = Object.create(parent.prototype)
};
kony.mvc.formView2ControllerMap = {};
kony.utils.LoadJSFile = function(fileName) {
    var retForm = null;
    controllerConfig = require(fileName); {
        retForm = controllerConfig
    }
    return retForm
};
kony.application.destroyForm = function(formFriendlyName) {
    var tmpController = null;
    var formID = formFriendlyName;
    var tmpFormName = kony.mvc.registry.get(formID);
    if (null != tmpFormName) {
        formID = tmpFormName
    }
    if (null != formID) {
        if (formID in kony.mvc.formView2ControllerMap) {
            tmpController = kony.mvc.formView2ControllerMap[formID];
            if (null != tmpController) tmpController.destroyForm();
            delete kony.mvc.formView2ControllerMap[formID]
        }
    }
};
konyNavigate2Form = function(formFriendlyName) {
    var deeplinkFormNav = new kony.mvc.Navigation(formFriendlyName);
    deeplinkFormNav.navigate()
};
_kony.mvc.executeInJsContext = function(templateView, functionName, subargs) {
    if (templateView.id in kony.mvc.formView2ControllerMap) {
        var viewName = templateView.id;
        var tmpController = kony.mvc.formView2ControllerMap[viewName];
        if (null != tmpController) {
            if (typeof functionName === "string" || functionName instanceof String) {
                tmpController[functionName].apply(tmpController, subargs)
            } else {
                functionName.apply(tmpController, subargs)
            }
        }
    } else {
        var eventobject = null;
        if (subargs.length > 0) {
            eventobject = subargs[0];
            subargs.shift()
        }
        if (null != eventobject) {
            functionName.apply(eventobject, subargs)
        } else {
            functionName(eventobject, subargs)
        }
    }
};
_kony.mvc.callFunctionOnClonedController = function(templateView, functionName, subargs) {
    var viewName = templateView.id;
    if (viewName in kony.mvc.formView2ControllerMap) {
        var tmpController = kony.mvc.formView2ControllerMap[viewName];
        if (null != tmpController) {
            tmpController.view = templateView;
            if (typeof functionName === "string" || functionName instanceof String) {
                tmpController[functionName].apply(tmpController, subargs)
            } else {
                functionName.apply(tmpController, subargs)
            }
        }
    } else {
        var eventobject = null;
        if (subargs.length > 0) {
            eventobject = subargs[0];
            subargs.shift()
        }
        if (null != eventobject) {
            functionName.apply(eventobject, subargs)
        } else {
            functionName(eventobject, subargs)
        }
    }
};
kony.mvc.GetController = function(formFriendlyName, isForm) {
    var tmpController = null;
    var formID = formFriendlyName;
    var tmpFormName = kony.mvc.registry.get(formID);
    if (null != tmpFormName) {
        formID = tmpFormName
    } else {
        kony.mvc.registry.add(formID, formID)
    }
    if (null != formID) {
        if (formID in kony.mvc.formView2ControllerMap) {
            tmpController = kony.mvc.formView2ControllerMap[formID]
        } else {
            var tmpControllerName = kony.mvc.registry.getControllerName(formFriendlyName);
            if (null == tmpControllerName) {
                tmpControllerName = formID + "Controller"
            }
            var config = kony.utils.LoadJSFile(tmpControllerName);
            if (isForm) {
                tmpController = new kony.mvc.FormController(formID)
            } else {
                tmpController = new kony.mvc.TemplateController(formID)
            }
            for (var key in config) {
                if (key != "prototype" && key != "viewId" && config.hasOwnProperty(key)) {
                    tmpController[key] = config[key]
                }
            }
            var x = tmpController.view
        }
    }
    return tmpController
};
kony.mvc.CreateMasterController = function(masterName, newMasterID, args) {
    var tmpController = null;
    var formID = masterName;
    var tmpFormName = kony.mvc.registry.get(formID);
    if (null != tmpFormName) {
        formID = tmpFormName
    } else {
        kony.mvc.registry.add(formID, formID)
    }
    if (null != formID) {
        var tmpControllerName = kony.mvc.registry.getControllerName(masterName);
        if (null == tmpControllerName) {
            tmpControllerName = formID + "Controller"
        }
        var config = kony.utils.LoadJSFile(tmpControllerName);
        tmpController = new kony.mvc.TemplateController(formID, newMasterID);
        for (var key in config) {
            if (key != "prototype" && key != "viewId" && key != "constructor" && config.hasOwnProperty(key)) {
                tmpController[key] = config[key]
            }
        }
        if (config.hasOwnProperty("constructor")) {
            config["constructor"].apply(tmpController, args)
        }
        var x = tmpController.view
    }
    return tmpController
};

_kony.mvc.initializeSubViewController = function(friendlyName) {
    var tmpController = kony.mvc.GetController(friendlyName, false);
    return tmpController.view
}

function konyInitializeUserWidgetController(friendlyName, newMasterID, args) {
    var tmpController = kony.mvc.CreateMasterController(friendlyName, newMasterID, args);
    return tmpController.view
}

_kony.mvc.initializeFormViewController = function(friendlyName) {
    var tmpController = kony.mvc.GetController(friendlyName, true);
    return tmpController.view
}
setMasterConfig = function(masterObject, masterWidgetName, masterName) {
    var configFileName = masterName + "Config";
    var config = {};
    var oneMasterConfig = require(configFileName);
    oneMasterConfig = Object.values(oneMasterConfig)[0];
    if (Object.keys(oneMasterConfig)[0] == masterName) {
        var master = oneMasterConfig[masterName];
        if (masterWidgetName in kony.mvc.formView2ControllerMap) {
            var tmpController = kony.mvc.formView2ControllerMap[masterWidgetName];
            if (null == tmpController) return;
            if (null != master["properties"]) {
                var propertiesOnMaster = master["properties"];
                setProperties(masterObject, propertiesOnMaster, tmpController)
            }
            if (null != master["apis"]) {
                var propertiesOnMaster = master["apis"];
                setFunctions(masterObject, propertiesOnMaster, tmpController)
            }
            if (null != master["events"]) {
                var propertiesOnMaster = master["events"];
                setEvents(masterObject, propertiesOnMaster, tmpController)
            }
            return config
        }
    }
};
setProperties = function(masterObject, properties, tmpController) {
    if (null == properties || null == masterObject || null == tmpController) return;
    for (i = 0; i < properties.length; i++) {
        var propName = properties[i];
        defineGetter(masterObject, propName, function(propertyName) {
            return function() {
                var xx = tmpController.view.bottom;
                return tmpController[propertyName]
            }
        }(propName));
        defineSetter(masterObject, propName, function(propertyName) {
            return function(val) {
                var xx = tmpController.view.bottom;
                tmpController[propertyName] = val
            }
        }(propName))
    }
};
setFunctions = function(masterObject, properties, tmpController) {
    if (null == properties || null == masterObject || null == tmpController) return;
    for (i = 0; i < properties.length; i++) {
        var propName = properties[i];
        var xx = tmpController.view.bottom;
        masterObject[propName] = tmpController[propName].bind(tmpController)
    }
};
setEvents = function(masterObject, properties, tmpController) {
    if (null == properties || null == masterObject || null == tmpController) return;
    for (i = 0; i < properties.length; i++) {
        var propName = properties[i];
        defineGetter(masterObject, propName, function(propertyName) {
            return function() {
                var xx = tmpController.view.bottom;
                return tmpController[propName]
            }
        }(propName));
        defineSetter(masterObject, propName, function(propertyName) {
            return function(val) {
                var xx = tmpController.view.bottom;
                tmpController[propertyName] = val
            }
        }(propName))
    }
};
kony.mvc = kony.mvc || {};
kony.mvc.nav = kony.mvc.nav || {};
kony.utils = kony.utils || {};
kony.mvc.Navigation = function() {
    function Navigation(formname) {
        var formFriendlyName = formname;
        this.navigate = function(context) {
            var tmpController = kony.mvc.GetController(formFriendlyName, true);
            if (null != tmpController) {
                if (null != tmpController["onNavigated"]) {
                    tmpController["onNavigated"].call(tmpController, context)
                }
                tmpController.show()
            } else {
                kony.print("########## No controller is found to navigate #####")
            }
        }
    }
    return Navigation
}();
kony.mvc = kony.mvc || {};
inheritsFrom = function(child, parent) {
    child.prototype = Object.create(parent.prototype)
};
kony.mvc.TemplateController = function(viewId1, newID) {
    this.__initializeView = function(objController) {
        var retForm = null;
        require([objController.viewId], function(formCreateFunc) {
            retForm = formCreateFunc(objController)
        });
        if (newID != null) {
            kony.mvc.formView2ControllerMap[newID] = objController
        } else {
            kony.mvc.formView2ControllerMap[retForm.id] = objController
        }
        return retForm
    };
    this.viewId = viewId1;
    kony.mvc.BaseController.call(this);
    this.executeOnParent = function(callback, args) {
        this.view.executeOnParent(callback, args)
    }
};
inheritsFrom(kony.mvc.TemplateController, kony.mvc.BaseController);
if (kony.mvc == undefined) kony.mvc = {};
if (kony.mvc.registry == undefined) kony.mvc.registry = {};
registryMap = {};
kony.mvc.registry.add = function(friendlyName, formid, formCtrllrName) {
    if (friendlyName in registryMap) {
        kony.print("########## A form with friendly name " + friendlyName + " is already exists in registry.")
    } else {
        var formProps = {};
        formProps["name"] = formid;
        formProps["controllerName"] = formCtrllrName;
        registryMap[friendlyName] = formProps
    }
};
kony.mvc.registry.remove = function(friendlyName) {
    if (friendlyName in registryMap) {
        delete registryMap[friendlyName]
    } else {
        kony.print("########## No form with friendly name " + friendlyName + " is found in registry")
    }
};
kony.mvc.registry.get = function(friendlyName) {
    if (friendlyName in registryMap) {
        var formProps = registryMap[friendlyName];
        if (null != formProps) {
            return formProps["name"]
        }
    } else {
        kony.print("########## No form with friendly name " + friendlyName + " is found in registry");
        return null
    }
};
kony.mvc.registry.getFriendlyName = function(formID) {
    for (var friendlyName in registryMap) {
        if (registryMap.hasOwnProperty(friendlyName)) {
            var formProps = registryMap[friendlyName];
            if (null != formProps) {
                if (formID == formProps["name"]) return friendlyName
            }
        }
    }
    return null
};
kony.mvc.registry.getControllerName = function(friendlyName) {
    if (friendlyName in registryMap) {
        var formProps = registryMap[friendlyName];
        if (null != formProps) {
            return formProps["controllerName"]
        }
    } else {
        kony.print("########## No form with friendly name " + friendlyName + " is found in registry");
        return null
    }
};