package com.konylabs.js.appsrc;

import com.konylabs.js.appsrc.KonyJavaScriptSource;


public class AppJavaScriptSource extends KonyJavaScriptSource {

	public int getSourceCount(){
		return ( $GENERATED + $NONGENERATED + $STARTUP );
	}
	
	public KonyJavaScriptSource getSource(int index){
		
		switch(index){
			$CASE
			
			default:
				return null;
		}
	}
}