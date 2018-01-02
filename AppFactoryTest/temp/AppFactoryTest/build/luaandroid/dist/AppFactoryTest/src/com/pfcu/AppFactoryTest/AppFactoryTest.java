package com.pfcu.AppFactoryTest;

import com.konylabs.android.KonyMain;


import com.konylabs.search.SearchDataAdapter;
       import android.provider.SearchRecentSuggestions;
       import android.content.Intent;
       import android.app.SearchManager;


import android.os.Bundle;

public class AppFactoryTest extends KonyMain {
	private static AppFactoryTest context;
    public void onCreate(Bundle savedInstanceState) {
		context = this;
        super.onCreate(savedInstanceState);
    }
		
	public static AppFactoryTest getActivityContext() {
		return context;
	}
	
	public int getAppSourceLocation(){
		return 1;
	}

	public void onNewIntent(Intent intent) {
       if (Intent.ACTION_SEARCH.equals(intent.getAction())) {
        // handles a search query
        String query = intent.getStringExtra(SearchManager.QUERY);
        String extraData = intent.getStringExtra("intent_extra_data_key");
        SearchRecentSuggestions suggestions = new SearchRecentSuggestions(this,
          AppFactoryTestSearchSuggestionProvider.AUTHORITY, AppFactoryTestSearchSuggestionProvider.MODE);
        suggestions.saveRecentQuery(query, extraData);
        SearchDataAdapter.getInstance().raiseOnDoneCallback(query,extraData);
       }
       else
        super.onNewIntent(intent);
      }

	
}
