/*
 *
 *  File      : license.js
 *  Version   : 7.2.1.4
 *  TimeStamp : 23-08-2017 17:02:18 IST
 *
 */
function getChannel() {
    if ((/hp-tablet|ipad|playbook/gi).test(navigator.userAgent) || ((/android/gi).test(navigator.userAgent) && !(/mobile/gi).test(navigator.userAgent)))
        return "tablet";
    else if ((/mobile/gi).test(navigator.userAgent))
        return "mobile";
    else
        return "desktop";
}


kony.license = {};
kony.metric = {};
var appConfig = undefined;
kony.license.disableMetricReporting = function() {
    kony.ds.save(["true"], "LicenseDisableFlag");
}

kony.licensevar = {};


kony.licensevar.currentSessionId = "";
kony.licensevar.channel = "mobile";


kony.licensevar.changeHandlers = [];

kony.licensevar.isLicenseUrlAvailable = true;

kony.license.isLicenseUrlAvailable = function() {
    return kony.licensevar.isLicenseUrlAvailable;
}

kony.license.setIsLicenseUrlAvailable = function(value) {
    kony.licensevar.isLicenseUrlAvailable = value;
}

kony.license.getSessionId = function() {
    return kony.licensevar.currentSessionId;
}

kony.license.registerChangeListener = function(changeHandler) {

    if (!changeHandler) {
        return;
    }
    // We give the initial values once
    var changes = {};
    var userId = kony.ds.read("konyUserID");
    changes["sessionId"] = kony.licensevar.currentSessionId;
    if (userId != undefined && userId[0] != undefined && userId[0]!=null) {
        changes["userId"] = userId[0];
    }
    changeHandler(changes);

    // Add to my listeners
    kony.licensevar.changeHandlers.push(changeHandler);
};

kony.license.notifyChangesToListeners = function() {
    for (var i = 0; i < kony.licensevar.changeHandlers.length; i++) {
        var changes = {};
        var userId = kony.ds.read("konyUserID");
        changes["sessionId"] = kony.licensevar.currentSessionId;
        if (userId != undefined && userId[0] != undefined && userId[0]!=null) {
            changes["userId"] = userId[0];
        }
        var changeHandler = kony.licensevar.changeHandlers[i];
        changeHandler(changes);
    }
};

/*
 *  Name      : kony.license.startLicenseService
 *  Author    : None
 *  Purpose   : Single global function which contains definitions of all required functions for session tracking.
 */
kony.license.startLicenseService = function() {
        "use strict";
        var deviceInfo = kony.os.deviceInfo();
        kony.print("startLicenseService deviceInfo " + JSON.stringify(deviceInfo));
        /*
         *  Name      : getLicenseUrl
         *  Author    : None
         *  Purpose   : Internal function to get the appropriate IST url for session calls
         */

        function getLicenseUrl() {
            var url = "";
            if (appConfig.isturlbase) {
                url = appConfig.isturlbase + "/IST";
            } else if (appConfig.secureurl) {
                url = getFromServerUrl(appConfig.secureurl, "IST");
            } else if (appConfig.url) {
                url = getFromServerUrl(appConfig.url, "IST");
            } else {
                url = null;
            }
            return url;
        }

        /*
         *  Name      : getMetricsUrl
         *  Author    : None
         *  Purpose   : Internal function to get the appropriate CMS url for custom metrics calls
         */

        function getMetricsUrl() {
            var url = "";
            if (appConfig.isturlbase) {
                url = appConfig.isturlbase + "/CMS";
            } else if (appConfig.secureurl) {
                url = getFromServerUrl(appConfig.secureurl, "CMS");
            } else if (appConfig.url) {
                url = getFromServerUrl(appConfig.url, "CMS");
            } else {
                url = null;
            }
            return url;
        }

        /*
         *  Name      : getFromServerUrl
         *  Author    : None
         *  Purpose   : Helper method to form a proper url
         */

        function getFromServerUrl(url, path) {
            if (!url) {
                return null;
            }
            // ServerURL for non-mf has /mwservlet appended after the context path.
            // We need to remove it to get the base server url
            kony.print("getfromserverurl-->deviceInfo " + JSON.stringify(deviceInfo));
            if (deviceInfo.name === "thinclient") {
                url = url.replace(/mwservlet\/*$/i, "");
                return url + path;
            } else {
                var exactSubString = url.match(/mwservlet/i);
                var newUrl = null;
                if (exactSubString) {
                    var exactSubStringLength = "mwservlet".length;
                    var lastSubStringIndex = url.lastIndexOf(exactSubString);
                    var subString = url.slice(0, lastSubStringIndex);
                    var index = (lastSubStringIndex + exactSubStringLength);
                    var subString2 = url.slice(index, url.length);
                    var has = /[a-zA-Z0-9]/.test(subString2);
                    if (!has) {
                        newUrl = subString;
                    } else {
                        newUrl = url;
                    }
                } else {
                    newUrl = url;
                }
                return newUrl + path;
            }
        }


        /*
         *  Name      : function getDeviceIdForIOSPlatform
         *  Author    : None
         *  Purpose   : Helper method to get device is based on os version
         */
        function getDeviceIdForIOSPlatform() {
            kony.print("getDeviceIdForIOSPlatform -->name " + JSON.stringify(deviceInfo));
            return deviceInfo.identifierForVendor;
        }

        function getPlatform(inputParams) {
            var name = inputParams.plat;
            if (name === "thinclient") {
                if ((/android/gi).test(navigator.userAgent))
                    return "android";
                else if ((/iphone|ipad|ipod/gi).test(navigator.userAgent))
					return "ios";
				else if ((/bb10/gi).test(navigator.userAgent) || (/blackberry/gi).test(navigator.userAgent))
                    return "blackberry";
                else if ((/Windows/gi).test(navigator.userAgent))
                    return "windows";
                else if ((/j2me/gi).test(navigator.userAgent))
                    return "j2me";
                else
                    return "";
            } else {
                if ((name === "iPhone") || (name === "iPad")) {
                    inputParams.did = getDeviceIdForIOSPlatform();
                    return "ios";
                } else if (name.toLowerCase().indexOf("android") !== -1) {
                    return "android";
                } else if (name.toLowerCase().indexOf("windows") !== -1) {
                    return "windows";
                } else if (name.toLowerCase().indexOf("blackberry") !== -1) {
                    return "blackberry";
                }

            }
        }

        function getApplicationType(name) {
            if (name === "thinclient") {
                return "spa";
            }
            var appMode = kony.application.getApplicationMode();
            if (appMode === constants.APPLICATION_MODE_NATIVE) {
                return "native";
            } else if (appMode === constants.APPLICATION_MODE_HYBRID) {
                return "hybrid";
            } else if (appMode === constants.APPLICATION_MODE_WRAPPER) {
                return "mixedmode";
            } else {
                return "";
            }
        }

        function getDeviceId(name) {
            if (name === "thinclient") {
                var deviceID = kony.ds.read("deviceID");
                if (!deviceID) {
                    deviceID = kony.license.generateUUID().toString();
                    kony.ds.save(deviceID, "deviceID");
                }
                return deviceID;
            } else {
                return kony.os.deviceInfo().deviceid;
            }

        }

        /*
         *  Name      : kony.setUserID
         *  Author    : None
         *  Purpose   : Stores the userID in device local, once set.
         */

        kony.setUserID = function(userId,fromLoginFlag) {
			if(fromLoginFlag == undefined || fromLoginFlag == null){
				fromLoginFlag = false;
			}
            var user = new Array;
            user.push(userId);
            var userIDflagGet = kony.ds.read("userIDFromLicenseFlag");
            if((userIDflagGet[0] == "true") && fromLoginFlag) {
                return;
            }
            if(!fromLoginFlag) {
                var userIDflagSet = new Array;
                userIDflagSet.push("true");
                kony.ds.save(userIDflagSet,"userIDFromLicenseFlag");
            }
            kony.ds.save(user, "konyUserID");
            kony.license.notifyChangesToListeners();
        }

        kony.metric.reportCallback = function(status,result){
                "use strict";
                kony.print("report callback..");
                kony.print("Status : " + status);
                kony.print("Result : " + result);
                if (status === 400) {
                    if (result.opstatus === 0) {
                        //If reports are successfully logged at server. Removing offline report data.
                        kony.ds.remove("konyCustomReportData");
                    }
                }
        }

        kony.metric.report = function(formId,metrics){
                "use strict";
                kony.print("report...");
                if (formId === undefined || metrics === undefined) {
                    kony.print("Invalid parameters to kony.metric.report");
                    return;
                }
                if (typeof metrics !== "object") {
                    kony.print("Invalid parameters to kony.metric.report");
                    return;
                }
                if (typeof formId !== "string") {
                    if (formId) {
                        if (formId.id === undefined || formId.id === null || typeof formId.id !== "string") {
                            kony.print("Invalid parameters to kony.metric.report");
                            return;
                        }
                        formId = formId.id.toString();
                    } else {
                        kony.print("Invalid parameters to kony.metric.report");
                        return;
                    }
                }
                var input = {};
                var reportData = kony.ds.read("konyCustomReportData");
                if (reportData === undefined || reportData === null) {
                    reportData = new Array();
                }
                kony.ds.remove("konyCustomReportData");
                var currentData = {};
                var uuid = kony.ds.read("konyUUID");
                if (uuid !== undefined && uuid !== null && uuid.length > 0) {
                    currentData.rsid = uuid[0];
                } else {
                    currentData.rsid = new Date().getTime().toString();
                }
                currentData.fid = formId;
                if (!formId && deviceInfo.name === "thinclient") {
                    var frm = document.getElementsByTagName("form")[0]
                    if (frm != null && (frm.id != undefined || frm.id != null))
                        currentData.fid = frm.id
                }
                currentData.metrics = metrics;
                currentData.ts = kony.license.getCurrentDateTime();
                reportData.push(currentData);
                //kony.ds.save(reportData, "konyCustomReportData");
                var reportURL = "";
                if (appConfig.url !== undefined && appConfig.url !== null) {
                    reportURL = getMetricsUrl();
                }
                input.httpconfig = {
                    timeout: 60
                };
                kony.net.invokeServiceAsync(reportURL, input, function(status, result) {
                    kony.print("Status : " + status);
                    kony.print("Result : " + result);
                    if (status === 400) {
                        if (result.opstatus === 0) {
                            //If reports are successfully logged at server. Removing offline report data.
                            //kony.ds.remove("konyCustomReportData");
                            kony.print("metrics data successfully sent");
                        } else {
                            var storeData = kony.ds.read("konyCustomReportData");
                            if (!storeData) {
                                storeData = new Array();
                            }
                            storeData.push(reportData);
                            kony.ds.save(storeData, "konyCustomReportData");
                        }
                    }
                }, null, "metric", reportData);
        }

        kony.license.generateUUID = function() {
                var S4 = function() {
                    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                };
                return (new Date().getTime() + '-' + S4() + '-' + S4() + '-' + S4());
        }
        /*
         *  Name      : kony.license.isCloud
         *  Author    : None
         *  Purpose   : Returns true if it is cloud enviroment, else returns false.
         */
        kony.license.isCloud = function() {
                kony.print("isCloud...");
                //starting 6.0 the licensing approach is also applicable for On-Prem customers.Hence the license usage posting 
                //will be enabled for on-prem customers as well. So removing the check for the Kony Cloud URLs.

                var isLicenseEnabled = true;
                var LicenseCheck = kony.ds.read("LicenseDisableFlag");
                if (LicenseCheck && (LicenseCheck[0] === "true" || LicenseCheck === "true" ))  {
                    isLicenseEnabled = false;
                }
                if (kony.license.isLicenseUrlAvailable() === false) {
                    isLicenseEnabled = false;
                }
                return isLicenseEnabled;
        }

        /*
         *  Name      : kony.license.getCurrentDateTime
         *  Author    : None
         *  Purpose   : Returns current date and time details in required string format for service input.
         */
        kony.license.getCurrentDateTime = function() {
                kony.print("getCurrentDateTime..");
                var nowDate, month, formatDate;
                nowDate = new Date();
                month = new Date().getUTCMonth() + 1;
                formatDate = (("00" + nowDate.getUTCFullYear()).slice(-4)) + "-" + (("00" + month).slice(-2)) + "-" + (("00" + nowDate.getUTCDate()).slice(-2)) + " " + (("00" + nowDate.getUTCHours()).slice(-2)) + ":" + (("00" + nowDate.getUTCMinutes()).slice(-2)) + ":" + (("00" + nowDate.getUTCSeconds()).slice(-2));
                return formatDate;
        }

        /*
         *  Name      : kony.license.appendLicenseTrackingKeys
         *  Author    : None
         *  Purpose   : Returns input object after appending the required tracking keys for provided input object.
         */

        kony.license.appendLicenseTrackingKeys = function(requestType,reportData) {
                //var deviceInfo = kony.os.deviceInfo();
                kony.print("appendLicenseTrackingKeys deviceinfo ---> " + JSON.stringify(deviceInfo));
                var inputParams = {};


                if (kony.license.isCloud() === true) {
                    inputParams.plat = deviceInfo.name;
                    inputParams.chnl = kony.licensevar.channel;
                    inputParams.aid = appConfig.appId;
                    inputParams.aver = appConfig.appVersion;
                    inputParams.aname = appConfig.appName;
                    //adding mfaid, mfaname if konyref is available.
                    if (typeof konyRef !== "undefined" && konyRef != null && konyRef.mainRef) {
                        inputParams.mfaid = konyRef.mainRef.appId;
                        inputParams.mfbaseid = konyRef.mainRef.baseId;
                        inputParams.mfaname = konyRef.mainRef.name;
                    }
                    if (kony.application.getCurrentForm()) {
                        var fid = kony.application.getCurrentForm().id;
                        if (fid) {
                            inputParams.fid = fid;
                        }
                    }
                    inputParams.did = getDeviceId(deviceInfo.name);
                    inputParams.plat = getPlatform(inputParams);
                    inputParams.atype = getApplicationType(deviceInfo.name);



                    inputParams.os = deviceInfo.version;
                    inputParams.stype = "b2c";
                    inputParams.dm = deviceInfo.model;
                    inputParams.ua = kony.os.userAgent();

                    var userId = kony.ds.read("konyUserID");
                    if (userId !== undefined && userId !== null && userId.length > 0) {
                        inputParams.kuid = userId[0];
                    } else {
                        inputParams.kuid = "";
                    }
                    if (requestType === "session") {
                        //Getting the offline access time details and passing as input to service
                        kony.license.checkAndCreateSession();
                        var uuid = kony.licensevar.currentSessionId;
                        var offlineData = kony.ds.read("konyOfflineAccessData");
                        if (offlineData === undefined || offlineData === null) {
                            offlineData = new Array();
                        }
                        var currentSession = new Array();
                        currentSession.push(uuid);
                        currentSession.push(kony.license.getCurrentDateTime());
                        offlineData.push(currentSession);
                        kony.ds.save(offlineData, "konyOfflineAccessData");
                        if (offlineData === undefined || offlineData === null) {
                            inputParams.launchDates = currentSession;
                        } else {
                            inputParams.launchDates = offlineData;
                        }
                        var metrics = new Array();
                        inputParams.metrics = metrics;
                        inputParams.svcid = "RegisterKonySession";
                        kony.print("---------->LaunchDates : " + inputParams.launchDates);
                    } else if (requestType === "metric") {
                        if (reportData === undefined || reportData === null) {
                            reportData = new Array();
                        }
                        inputParams.reportData = reportData;
                        inputParams.svcid = "CaptureKonyCustomMetrics";
                    } else {
                        var uuid = kony.ds.read("konyUUID");
                        if (uuid !== undefined && uuid !== null && uuid.length > 0) {
                            inputParams.rsid = uuid[0];
                        } else {
                            inputParams.rsid = kony.license.generateUUID().toString();
                        }
                        var metrics = new Array();
                        inputParams.metrics = metrics;
                    }
                }
                kony.print("input params in appendLicenseTrackingKeys are " + JSON.stringify(inputParams));
                return inputParams;
            
        }

        /*
         *  Name      : kony.license.checkAndCreateSession
         *  Author    : None
         *  Purpose   : creates a new session (if session is not created).
         */
        kony.license.checkAndCreateSession = function() {
                kony.print("check and create session..");
                var uuid = kony.ds.read("konyUUID");
                if (uuid !== undefined && uuid !== null && uuid.length > 0) {
                   kony.licensevar.currentSessionId = uuid[0];
                } else {
                   kony.license.createSession();
                } 
        }

        /*
         *  Name      : kony.license.createSession
         *  Author    : None
         *  Purpose   : creates a new session (if session is not created).
         */
       kony.license.createSession = function() {
                var uuid = new Array();
                kony.licensevar.currentSessionId = kony.license.generateUUID().toString();
                uuid.push(kony.licensevar.currentSessionId);
                kony.ds.save(uuid, "konyUUID");
                kony.license.notifyChangesToListeners();
       }


        /*
         *  Name      : kony.license.licenseUsageServiceCallback
         *  Author    : None
         *  Purpose   : Service Callback function for session tracking. Displays alert if service responds with 'expired' status.
         *              Stores the session details offline if service fails to respond.
         */
        kony.license.licenseUsageServiceCallback = function(status,result) {
                kony.print("licenseUsageServiceCallback..");
                kony.print("Status : " + status);
                kony.print("Result : " + result);
                if (status === 400) {
                    if (result.opstatus === 0) {
                        //If launchDetails are successfully logged at server. Removing offline access details.
                        kony.ds.remove("konyOfflineAccessData");
                        kony.ds.remove("konyOfflineSessionsCount");
                    } else {
                        //Storing offline access time details in case of network/service issues.
                        var count, offlineCount;
                        //Storing the offline sessions count.
                        offlineCount = kony.ds.read("konyOfflineSessionsCount");
                        if (offlineCount === undefined || offlineCount === null || offlineCount.length < 1) {
                            offlineCount = new Array();
                            offlineCount.push(1);
                        } else if (!(offlineCount[0] >= 500)) {
                            //Stop updating the count if greater than 500
                            count = offlineCount[0] + 1;
                            offlineCount[0] = count;
                        }
                        kony.ds.save(offlineCount, "konyOfflineSessionsCount");
                    }
                }
        }

        /*
         *  Name      : kony.license.captureKonyLicenseUsage
         *  Author    : None
         *  Purpose   : Makes service call for session tracking if the app is built with cloud environment and last access is made 30 minutes ago.
         *              Sends required tracking keys for the service.
         */
        kony.license.captureKonyLicenseUsage = function(newLaunch) {
                kony.print("captureKonyLicenseUsage..");
                //Count session only if the time difference between last access and current access is more than 1 minute (30 minutes)
                var nowDate, lastDate, diff, sessionURL;
                var timeCheck = 1800000;
                var isNewSession = true;
                if (newLaunch === undefined || newLaunch === null) {
                    newLaunch = false;
                } else if (newLaunch !== true) {
                    newLaunch = false;
                }
                if (kony.license.isCloud() === false) {
                    kony.print("Not Cloud");
                    isNewSession = false;
                }
                if (kony.ds.read("konyLastAccessTime") !== undefined && kony.ds.read("konyLastAccessTime") !== null) {
                    nowDate = new Date();
                    lastDate = new Date(kony.ds.read("konyLastAccessTime")[0]);
                    diff = nowDate.getTime() - lastDate.getTime();
                    if (diff < timeCheck && newLaunch === false) {
                        isNewSession = false;
                    } else {
                        kony.ds.remove("konyLastAccessTime");
                        if (deviceInfo.name !== "thinclient") {
                            var uuid = kony.ds.read("konyUUID");
                            if (uuid !== undefined && uuid !== null && uuid.length > 0) {
                                kony.ds.remove("konyUUID");
                            }
                        }
                    }
                }

                if (isNewSession === true) {
                    var input = {};
                    sessionURL = "";
                    if (deviceInfo.name === "thinclient") {
                        if (window.location.protocol === "https:") {
                            if (appConfig.secureurl !== undefined && appConfig.secureurl !== null) {
                                sessionURL = getLicenseUrl();
                            }
                        } else {
                            if (appConfig.url !== undefined && appConfig.url !== null) {
                                sessionURL = getLicenseUrl();
                            }
                        }
                        input.httpconfig = {};

                    } else {
                        if (appConfig.url !== undefined && appConfig.url !== null) {
                            sessionURL = getLicenseUrl();
                        }
                        input.httpconfig = {
                            timeout: 60
                        };
                    }


                    kony.net.invokeServiceAsync(sessionURL, input, kony.license.licenseUsageServiceCallback, null, "session", null);
                }
        }

        /*
         *  Name      : kony.license.backgroundTimeCapture
         *  Author    : None
         *  Purpose   : Stores the time stamp when app is sent to background.
         */
        kony.license.backgroundTimeCapture = function() {
                kony.print("backgroundTimeCapture..");
                if (kony.license.isCloud() === true) {
                    var accessDetails = new Array();
                    accessDetails.push(new Date().toString());
                    kony.ds.save(accessDetails, "konyLastAccessTime");
                }
        }

        /*
         *  Name      : kony.license.clearLastAccess
         *  Author    : None
         *  Purpose   : Clears last access details on the termination of app.
         */
        kony.license.clearLastAccess = function() {
                kony.print("clear last access..");
                if (kony.license.isCloud() === true) {
                    kony.ds.remove("konyLastAccessTime");
                }
        }

        /*
         *  Name      : kony.license.setAppCallbacksOverride
         *  Author    : None
         *  Purpose   : Overrides the API setApplicationCallbacks. Prepends onforeground, onbackground and onappterminate events with required
         *              session tracking methods.
         */
        kony.license.setAppCallbacksOverride = function() {
                kony.print("setAppCallbacksOverride..");
                var oldImplementation = kony.application.setApplicationCallbacks;

                function newImplementation(eventsDefinition) {
                    if (kony.license.isCloud() === true) {
                        if (eventsDefinition !== undefined && eventsDefinition !== null) {
                            if (eventsDefinition.onforeground !== undefined && eventsDefinition.onforeground !== null) {
                                var userForeFunction = eventsDefinition.onforeground;
                                var newForeFunction = function() {
                                    kony.license.captureKonyLicenseUsage(false);
                                    if (deviceInfo.name !== "thinclient " && typeof(kony.sync) !== "undefined") {
                                        kony.sync.isAppInBackground = false;
                                    }
                                    userForeFunction();
                                };
                                eventsDefinition.onforeground = newForeFunction;
                            }
                            if (eventsDefinition.onbackground !== undefined && eventsDefinition.onbackground !== null) {
                                var userBackFunction = eventsDefinition.onbackground;
                                var newBackFunction = function() {
                                    kony.license.backgroundTimeCapture();
                                    if (typeof(kony.sdk) !== "undefined" && typeof(kony.sdk.metric) !== "undefined") {
                                        kony.sdk.metric.saveInDS();
                                    }
                                    if (deviceInfo.name !== "thinclient " && typeof(kony.sync) !== "undefined") {
                                        kony.sync.isAppInBackground = true;
                                    }
                                    userBackFunction();
                                };
                                eventsDefinition.onbackground = newBackFunction;
                            }
                            if (eventsDefinition.onappterminate !== undefined && eventsDefinition.onappterminate !== null) {
                                var userTerminateFunction = eventsDefinition.onappterminate;
                                var newTerminateFunction = function() {
                                    kony.license.clearLastAccess();
                                    if (typeof(kony.sdk) !== "undefined" && typeof(kony.sdk.metric) !== "undefined") {
                                        kony.sdk.metric.saveInDS();
                                    }
                                    userTerminateFunction();
                                };
                                eventsDefinition.onappterminate = newTerminateFunction;
                            }
                        }
                    }
                    return oldImplementation(eventsDefinition);
                }
                kony.application.setApplicationCallbacks = newImplementation;
                if (deviceInfo.name !== "thinclient ") {
                    var callbackEvents = {
                        onforeground: function() {},
                        onbackground: function() {},
                        onappterminate: function() {}
                    };

                    kony.application.setApplicationCallbacks(callbackEvents);
                }
        }

        /*
         *  Name      : kony.license.invokeServiceAsyncOverride
         *  Author    : None
         *  Purpose   : Overrides the API invokeServiceAsync. Appends tracking keys to the input param.
         */
        kony.license.invokeServiceAsyncOverride = function() {
                kony.print("invokeServiceAsyncOverride..");
                var oldImplementation = kony.net.invokeServiceAsync;

                function newImplementation(url, input, callback, config, requestType, reportData) {
                    if (kony.license.isCloud() === true) {
                        if (input === undefined || input === null) {
                            input = {};
                        }
                        if (input !== undefined && input !== null && !isGetRequest(input)) {
                            if (requestType !== undefined && requestType !== null) {
                                input.konyreportingparams = processKonyReportingParams(input.konyreportingparams, requestType, reportData);
                            } else {
                                input.konyreportingparams = processKonyReportingParams(input.konyreportingparams, null, null);
                            }
                        }
                    }
                    return oldImplementation(url, input, callback, config);

                    function processKonyReportingParams(params, requestType, reportData) {
                        var params2 = kony.license.appendLicenseTrackingKeys(requestType, reportData);
                        if (!params) {
                            return JSON.stringify(params2);
                        } else {
                            try {
                                if (typeof(params) === "string") {
                                    params = JSON.parse(params);
                                }
                                for (var key in params2) {
                                    if (typeof(params[key]) === "undefined") {
                                        params[key] = params2[key];
                                    }
                                }
                                return JSON.stringify(params);
                            } catch (e) {
                                kony.print("unable to parse params " + params);
                                return JSON.stringify(params2);
                            }


                        }
                    }

                    function isGetRequest(inputParams) {
                        if (inputParams && inputParams.httpconfig && inputParams.httpconfig.method && inputParams.httpconfig.method === "get") {
                            return true;
                        }
                        return false;
                    }
                }
                kony.net.invokeServiceAsync = newImplementation;
        }

        /*
         *  Name      : kony.license.invokeServiceSyncOverride
         *  Author    : None
         *  Purpose   : Overrides the API invokeServiceSync. Appends tracking keys to the input param.
         */
        kony.license.invokeServiceSyncOverride = function() {
                kony.print("invokeServiceSyncOverride..");
                var oldImplementation = kony.net.invokeServiceSync;

                function newImplementation(url, input, isblocking) {
                    if (kony.license.isCloud() === true) {
                        if (input === undefined || input === null) {
                            input = {};
                        }
                        if (input !== undefined && input !== null) {
                            input.konyreportingparams = JSON.stringify(kony.license.appendLicenseTrackingKeys(null));
                        }
                    }
                    return oldImplementation(url, input, isblocking);
                }
                kony.net.invokeServiceSync = newImplementation;
        }

        /*
         *  Name      : kony.license.setAppInitializationEventsOverride
         *  Author    : None
         *  Purpose   : Overrides the API setApplicationInitializationEvents. Prepends postappinit event with required session tracking method.
         *              If postappinit is undefiend, sets postappinit with required session tracking method.
         */
        kony.license.setAppInitializationEventsOverride = function() {
                var oldImplementation = kony.application.setApplicationInitializationEvents;
                function newImplementation(eventsDefinition) {
                    kony.print("setApplicationInitializationEvents events " + eventsDefinition);
                    if (kony.license.isCloud() === true) {
                        if (eventsDefinition !== undefined && eventsDefinition !== null) {
                            if (eventsDefinition.postappinit !== undefined && eventsDefinition.postappinit !== null) {
                                var userFunction = eventsDefinition.postappinit;
                                var newFunction = function() {
                                    kony.license.captureKonyLicenseUsage(true);
                                    var userForm = userFunction.apply(this,arguments);
                                    if (userForm !== undefined || userForm !== null) {
                                        return userForm;
                                    }
                                };
                                eventsDefinition.postappinit = newFunction;
                            } else {
                                var newFunction = function() {
                                    kony.license.captureKonyLicenseUsage(true);
                                };
                                eventsDefinition.postappinit = newFunction;
                            }
                        }
                    }
                    return oldImplementation(eventsDefinition);
                }
                kony.application.setApplicationInitializationEvents = newImplementation;
        }
        /*
         *  Name      : kony.license.apiOverride
         *  Author    : None
         *  Purpose   : Sets initial application callbacks. Calls the API overriding functions
         */
       kony.license.apiOverride =function() {
                kony.print("api override..");
                // Setting our callbacks before override.
                /*var callbackEvents = {
                    onforeground: kony.license.captureKonyLicenseUsage,
                    onbackground: kony.license.backgroundTimeCapture,
                    onappterminate: kony.license.clearLastAccess
                };
                */
                //Overriding APIs
                if (deviceInfo.name !== "thinclient") {

                    //  kony.application.setApplicationCallbacks(callbackEvents);

                    kony.license.setAppCallbacksOverride();
                }
                kony.license.invokeServiceAsyncOverride();
                kony.license.invokeServiceSyncOverride();
                kony.license.setAppInitializationEventsOverride();
        }

        kony.license.apiOverride();
        if (deviceInfo.name !== "thinclient") {
            Object.seal(kony.license);
            Object.freeze(kony.license);
        }
    
}



function cloudSessionCallback() {
    kony.print("Cloud session timed out.");
    kony.ds.remove("konyLastAccessTime");
    kony.ds.remove("konyUUID");
    kony.ds.remove("konyCustomReportData");
    kony.ds.remove("konyOfflineAccessData");
    kony.license.captureKonyLicenseUsage();
    kony.cloud.appevents.unregisterforidletimeout();
    kony.cloud.appevents.registerforidletimeout(30, cloudSessionCallback);
}

kony.license.startLicenseService();