//startup.js file
var globalhttpheaders = {};
var appConfig = {
    appId: "AppFactoryTest",
    appName: "AppFactoryTest",
    appVersion: "1.0.0",
    platformVersion: null,
    serverIp: "2600:1006:b113:5ba4:895d:865c:510:ffa0",
    serverPort: "80",
    secureServerPort: "443",
    isDebug: true,
    middlewareContext: "AppFactoryTest",
    isMFApp: false,
    eventTypes: ["FormEntry", "ServiceRequest", "Error", "Crash"],
    url: "https://partnersfcu-dev.konycloud.com/AppFactoryTest/MWServlet",
    secureurl: "https://partnersfcu-dev.konycloud.com/AppFactoryTest/MWServlet"
};
sessionID = "";

function appInit(params) {
    skinsInit();
    initializeUserWidgets();
    frmLoginGlobals();
    setAppBehaviors();
};

function setAppBehaviors() {
    kony.application.setApplicationBehaviors({
        applyMarginPaddingInBCGMode: false,
        adherePercentageStrictly: true,
        retainSpaceOnHide: true,
        marginsIncludedInWidgetContainerWeight: true,
        APILevel: 730130
    })
};

function themeCallBack() {
    initializeGlobalVariables();
    callAppMenu();
    kony.application.setApplicationInitializationEvents({
        init: appInit,
        showstartupform: function() {
            frmLogin.show();
        }
    });
};

function loadResources() {
    globalhttpheaders = {};
    sdkInitConfig = {
        "appConfig": appConfig,
        "isMFApp": appConfig.isMFApp,
        "eventTypes": appConfig.eventTypes,
    }
    kony.theme.setCurrentTheme("default", themeCallBack, themeCallBack);
};

function onSuccessSDKCallBack() {
    kony.theme.setCurrentTheme("default", themeCallBack, themeCallBack);
}
kony.application.setApplicationMode(constants.APPLICATION_MODE_NATIVE);
//If default locale is specified. This is set even before any other app life cycle event is called.
loadResources();
// If you wish to debug Application Initialization events, now is the time to
// place breakpoints.
debugger;