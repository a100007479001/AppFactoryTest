/*
 * Copyright (C) 2008 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.pfcu.AppFactoryTest;

import android.content.SearchRecentSuggestionsProvider;
import android.database.Cursor;
import android.net.Uri;

import com.konylabs.search.SearchDataAdapter;

/**
 * To create a search suggestions provider using the built-in recent queries mode, 
 * simply extend SearchRecentSuggestionsProvider as shown here, and configure with
 * a unique authority and the mode you with to use.  For more information, see
 * {@link android.content.SearchRecentSuggestionsProvider}.
 */
public class AppFactoryTestSearchSuggestionProvider extends SearchRecentSuggestionsProvider {
    
    /**
     * This is the provider authority identifier.  The same string must appear in your
     * Manifest file, and any time you instantiate a 
     * {@link android.provider.SearchRecentSuggestions} helper class. 
     */
    public final static String AUTHORITY = "com.pfcu.AppFactoryTest.AppFactoryTestSuggestionProvider";
    /**
     * These flags determine the operating mode of the suggestions provider.  This value should 
     * not change from run to run, because when it does change, your suggestions database may 
     * be wiped.
     */
    public final static int MODE = DATABASE_MODE_QUERIES | DATABASE_MODE_2LINES;
	private SearchDataAdapter mSearchAdapter;
    
    /**
     * The main job of the constructor is to call {@link #setupSuggestions(String, int)} with the
     * appropriate configuration values.
     */
    public AppFactoryTestSearchSuggestionProvider() {
        super();
        setupSuggestions(AUTHORITY, MODE);
    }
    
    public Cursor query(Uri uri, String[] projection, String selection,
    		String[] selectionArgs, String sortOrder) {
    	if(selectionArgs != null && selectionArgs[0].equals("")) {
    		return super.query(uri, projection, selection, selectionArgs, sortOrder);
    	}
    	
    	if(mSearchAdapter == null)
    		mSearchAdapter = SearchDataAdapter.getInstance();
    	
    	mSearchAdapter.raiseOnTextChangeCallback(selectionArgs[0]);
    	return mSearchAdapter.getDataCursor(selectionArgs[0]);
    }   
    
}
