//startup.js file
//#ifdef iphone
    //#define IOS_NATIVE_PLATFORMS
//#endif
//#ifdef ipad
    //#define IOS_NATIVE_PLATFORMS
//#endif
//#ifdef android
    //#define android_ios
//#endif
//#ifdef iphone
    //#define android_ios
//#endif
//#ifdef tabrcandroid
    //#define android_ios
//#endif
//#ifdef ipad
    //#define android_ios
//#endif
//#ifdef spaip
  //#define SPA_HYBRID_WRAPPER_STARTUP_TC
//#endif
//#ifdef spaan
  //#define SPA_HYBRID_WRAPPER_STARTUP_TC
//#endif
//#ifdef spabb
  //#define SPA_HYBRID_WRAPPER_STARTUP_TC
//#endif
//#ifdef spabbnth
  //#define SPA_HYBRID_WRAPPER_STARTUP_TC
//#endif
//#ifdef spawinphone8
  //#define SPA_HYBRID_WRAPPER_STARTUP_TC
//#endif
//#ifdef spawindows
  //#define SPA_HYBRID_WRAPPER_STARTUP_TC
//#endif
//#ifdef spatabwindows
  //#define SPA_HYBRID_WRAPPER_STARTUP_TC
//#endif
//#ifdef spaipad
  //#define SPA_HYBRID_WRAPPER_STARTUP_TC
//#endif
//#ifdef spatabandroid
  //#define SPA_HYBRID_WRAPPER_STARTUP_TC
//#endif
//#ifdef spaplaybook
  //#define SPA_HYBRID_WRAPPER_STARTUP_TC
//#endif
//#ifdef desktopweb
  //#define SPA_HYBRID_WRAPPER_STARTUP_TC
//#endif
//#ifdef xadvip
  //#define SPA_HYBRID_WRAPPER_STARTUP_TC
//#endif
//#ifdef xadvbb
  //#define SPA_HYBRID_WRAPPER_STARTUP_TC
//#endif
//#ifdef xadvand
  //#define SPA_HYBRID_WRAPPER_STARTUP_TC
//#endif
//#ifdef xadvnth
  //#define SPA_HYBRID_WRAPPER_STARTUP_TC
//#endif
//#ifdef xadvpalm
  //#define SPA_HYBRID_WRAPPER_STARTUP_TC
//#endif
//#ifdef basic
  //#define SPA_HYBRID_WRAPPER_STARTUP_TC
//#endif
//#ifdef bjs
  //#define SPA_HYBRID_WRAPPER_STARTUP_TC
//#endif

//#ifdef bb
    //#define FM_EXCEPTIONAL_PLATFORMS
//#endif
//#ifdef bb10
    //#define FM_EXCEPTIONAL_PLATFORMS
//#endif
//#ifdef winmobile
    //#define FM_EXCEPTIONAL_PLATFORMS
//#endif
//#ifdef winmobile6x
    //#define FM_EXCEPTIONAL_PLATFORMS
//#endif

//#ifdef SPA_HYBRID_WRAPPER_STARTUP_TC
   //#ifdef xadvip
  //#define TC_PLATFORMS
//#endif
//#ifdef xadvbb
  //#define TC_PLATFORMS
//#endif
//#ifdef xadvand
  //#define TC_PLATFORMS
//#endif
//#ifdef xadvnth
  //#define TC_PLATFORMS
//#endif
//#ifdef xadvpalm
  //#define TC_PLATFORMS
//#endif
//#ifdef basic
  //#define TC_PLATFORMS
//#endif
//#ifdef bjs
  //#define TC_PLATFORMS
//#endif
//#ifdef TC_PLATFORMS
  //#define FM_EXCEPTIONAL_PLATFORMS
//#endif

//#ifdef spaip
   
//#endif
//#ifdef spaan

//#endif
//#ifdef spabb
  //#define APPTRACKING_PLATFORMS
//#endif
//#ifdef spabbnth
  //#define APPTRACKING_PLATFORMS
//#endif
//#ifdef spawinphone8
  //#define APPTRACKING_PLATFORMS
//#endif
//#ifdef spawindows
  //#define APPTRACKING_PLATFORMS
//#endif
//#ifdef spatabwindows
  //#define APPTRACKING_PLATFORMS
//#endif
//#ifdef spaipad
  //#define APPTRACKING_PLATFORMS
//#endif
//#ifdef spatabandroid
  //#define APPTRACKING_PLATFORMS
//#endif
//#ifdef spaplaybook
  //#define APPTRACKING_PLATFORMS
//#endif



var appConfig={appId:  "AppFactoryTest" ,
        appName: "AppFactoryTest" , 
	appVersion: "1.0.0" ,
	platformVersion: null ,
	serverIp: "2600:1006:b113:5ba4:895d:865c:510:ffa0" ,
	serverPort: "80" ,
        secureServerPort: "443" ,
    	        isMFApp: false,
                                             eventTypes :   ["FormEntry","ServiceRequest","Error","Crash"],
    	            url:"https://partnersfcu-dev.konycloud.com/AppFactoryTest/MWServlet",
            secureurl:"https://partnersfcu-dev.konycloud.com/AppFactoryTest/MWServlet",
                 //#ifdef TC_PLATFORMS
            "noScriptMessage" : "To use this site, first enable your browser;kqt;s JavaScript support and then refresh this page.",                                                                                                                                                           
                                                                                     
//#endif
         middlewareContext: "AppFactoryTest" 
};
     
sessionID = "";
    

function appInit( params )
{

    skinsInit();
            initializeUserWidgets();
        //#ifdef desktopweb
                                                    //#endif
    //#ifndef desktopweb
           //#ifdef FM_EXCEPTIONAL_PLATFORMS
                          //#else
                          //#endif
    //#endif
    //#ifdef FM_EXCEPTIONAL_PLATFORMS
                    //#else
                    //#endif
    //#ifndef desktopweb
          //#ifdef FM_EXCEPTIONAL_PLATFORMS
                          //#else
                          //#endif
          //#ifdef FM_EXCEPTIONAL_PLATFORMS
                          //#else
                          //#endif
    //#endif
    
              //#ifdef FM_EXCEPTIONAL_PLATFORMS
                    frmLoginGlobals();
                //#else
                    frmLoginGlobals();
                //#endif
            setAppBehaviors();
    

};

function setAppBehaviors(){
                kony.application.setApplicationBehaviors({applyMarginPaddingInBCGMode:false,
        adherePercentageStrictly:true,
                retainSpaceOnHide:true ,
        APILevel:730130         })
      
};
function themeCallBack(){
initializeGlobalVariables();

requirejs.config({
    //#ifdef spaip
        baseUrl: "spaiphone/appjs"
    //#endif
    //#ifdef spaan
        baseUrl: "spaandroid/appjs"
    //#endif
    //#ifdef spabb
        baseUrl: "spablackberry/appjs"  
    //#endif
    //#ifdef spabbnth
        baseUrl: "spabbnth/appjs"  
    //#endif
    //#ifdef spawinphone8
        baseUrl: "spawinphone8/appjs" 
    //#endif
    //#ifdef spawindows
        baseUrl: "spawindows/appjs"
    //#endif
    //#ifdef spatabwindows
        baseUrl: "spawindowstablet/appjs" 
    //#endif
    //#ifdef spaipad
        baseUrl: "spaipad/appjs"  
    //#endif
    //#ifdef spatabandroid
        baseUrl: "spaandroidtablet/appjs" 
    //#endif
    //#ifdef spaplaybook
        baseUrl: "spaplaybook/appjs" 
    //#endif
    //#ifdef desktopweb
        baseUrl: "desktopweb/appjs" 
    //#endif
    });
var requireModulesList = getSPARequireModulesList();
													require(requireModulesList, function() {
                                                        kony.application.setApplicationInitializationEvents({                                                                                                 init : appInit,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    showstartupform : function (){
                                                                                                                                                                                                                                                        frmLogin.show();
                                                                                                                        }
                                                                                             });
																						});	 
};

function loadResources(){
     
      	     
                 //#ifdef spaip
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef spaan
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef spabb
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef spawindows
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef spawinphone8
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef spabbnth
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef spaipad
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef spatabandroid
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef spatabwindows
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef spaplaybook
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef desktopweb
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef xadvip
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef xadvand
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef xadvbb
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef xadvnth
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef xadvpalm
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef basic
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef bjs
		  //#define PackagedThemesPlatforms
		 //#endif
	  	  
	  //#ifdef PackagedThemesPlatforms
                 kony.theme.packagedthemes(
                              [
                                                                  "default"
                                                         ]
              );
      //#endif
   
   globalhttpheaders = {
                        };
//#ifdef desktopweb
//#else
  callAppMenu();
//#endif

                sdkInitConfig = {
        "appConfig": appConfig,
        "isMFApp": appConfig.isMFApp,
                                            eventTypes :   ["FormEntry","ServiceRequest","Error","Crash"]
            }
           kony.theme.setCurrentTheme("default",themeCallBack,themeCallBack);
    };

function onSuccessSDKCallBack(){
                spaAPM && spaAPM.startTracking();
    	       kony.theme.setCurrentTheme("default",themeCallBack,themeCallBack);
    }



function initializeApp() {
          kony.application.setApplicationMode(constants.APPLICATION_MODE_NATIVE);
    

    //If default locale is specified. This is set even before any other app life cycle event is called.
            loadResources();
    };



//#else


var globalhttpheaders= {};



var appConfig={appId:  "AppFactoryTest" ,
        appName: "AppFactoryTest" , 
	appVersion: "1.0.0" ,
	platformVersion: null ,
	serverIp: "2600:1006:b113:5ba4:895d:865c:510:ffa0" ,
	serverPort: "80" ,
        secureServerPort: "443" ,
        isDebug:  true ,
	middlewareContext: "AppFactoryTest" ,
		        isMFApp: false,
    	
                            //#ifdef android_ios
                    eventTypes :   ["FormEntry","ServiceRequest","Error","Crash"],
            //#endif
                    url:"https://partnersfcu-dev.konycloud.com/AppFactoryTest/MWServlet",
            secureurl:"https://partnersfcu-dev.konycloud.com/AppFactoryTest/MWServlet"};
                

sessionID = "";

    

   

function appInit( params )
{
    skinsInit();
            //#ifdef IOS_NATIVE_PLATFORMS
            kony.application. setCheckBoxSelectionImageAlignment(constants.CHECKBOX_SELECTION_IMAGE_ALIGNMENT_RIGHT);
        //#endif
                //#ifdef IOS_NATIVE_PLATFORMS
            kony.application.setDefaultTextboxPadding(false);
        //#endif
                //#ifdef IOS_NATIVE_PLATFORMS
            kony.application.setRespectImageSizeForImageWidgetAlignment(true);
        //#endif
                 initializeUserWidgets();
        //#ifdef FM_EXCEPTIONAL_PLATFORMS
                //#else
                //#endif
        //#ifdef FM_EXCEPTIONAL_PLATFORMS
                        //#else
                        //#endif
        
    //#ifdef FM_EXCEPTIONAL_PLATFORMS
            //#else
            //#endif
//#ifdef android_ios
    //#ifdef FM_EXCEPTIONAL_PLATFORMS
        //#else
        //#endif
//#endif

 
              //#ifdef FM_EXCEPTIONAL_PLATFORMS
                    frmLoginGlobals();
                //#else
                    frmLoginGlobals();
                //#endif
            setAppBehaviors();

    

};

function setAppBehaviors(){
                    //#ifdef android_ios
        kony.application.setApplicationBehaviors({applyMarginPaddingInBCGMode:false,
        adherePercentageStrictly:true,
        retainSpaceOnHide:true,
                marginsIncludedInWidgetContainerWeight:true ,
        APILevel:730130         })
        //#else
        kony.application.setApplicationBehaviors({applyMarginPaddingInBCGMode:false,
        adherePercentageStrictly:true,
                retainSpaceOnHide:true ,
        APILevel:730130         })
        //#endif
      
};

function themeCallBack(){



initializeGlobalVariables();
  callAppMenu();
		
                                                        kony.application.setApplicationInitializationEvents({                                                                                                                                                                                                     init : appInit,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       showstartupform : function (){
                                                                                                                                                                                                                                                        frmLogin.show();
                                                                                                                                                                                                                                                }
                                                                                             });
};

function loadResources(){
     
      	     
                 //#ifdef spaip
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef spaan
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef spabb
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef spawindows
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef spawinphone8
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef spabbnth
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef spaipad
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef spatabandroid
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef spatabwindows
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef spaplaybook
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef desktopweb
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef xadvip
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef xadvand
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef xadvbb
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef xadvnth
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef xadvpalm
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef basic
		  //#define PackagedThemesPlatforms
		 //#endif
	  	     
                 //#ifdef bjs
		  //#define PackagedThemesPlatforms
		 //#endif
	  	  
	  //#ifdef PackagedThemesPlatforms
                 kony.theme.packagedthemes(
                              [
                                                                  "default"
                                                         ]
              );
      //#endif
   
   globalhttpheaders = {
                        };
                        
 sdkInitConfig = {
        "appConfig": appConfig,
        "isMFApp": appConfig.isMFApp,
                        //#ifdef android_ios
        "eventTypes": appConfig.eventTypes,
        //#endif  
        
    }
           kony.theme.setCurrentTheme("default",themeCallBack,themeCallBack);
    
};
function onSuccessSDKCallBack(){
    	       kony.theme.setCurrentTheme("default",themeCallBack,themeCallBack);
    }

//#ifdef bb10
function initializeBB10App(){
//#endif
            kony.application.setApplicationMode(constants.APPLICATION_MODE_NATIVE);
    
    //If default locale is specified. This is set even before any other app life cycle event is called.
            loadResources();
     //#ifdef bb10
        }
    //#endif

//#endif

 //#ifdef iphone
   //#define DEBUG_CALL
 //#endif
 //#ifdef android
   //#define DEBUG_CALL
 //#endif
 //#ifdef ipad
   //#define DEBUG_CALL
 //#endif
 //#ifdef tabrcandroid
   //#define DEBUG_CALL
 //#endif

 //#ifdef DEBUG_CALL
    // If you wish to debug Application Initialization events, now is the time to
    // place breakpoints.
     debugger;
 //#endif





