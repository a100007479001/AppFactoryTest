(function() {

    if(kony.ui.Video)
		return;

    var util = {
        accessorDescriptor: function accessorDescriptor(field, fun) {
            var desc = {
                enumerable: true,
                configurable: true
            };
            desc[field] = fun;
            return desc;
        },
        defineGetter: function defineGetter(obj, prop, get) {
            if (Object.defineProperty) return Object.defineProperty(obj, prop, util.accessorDescriptor("get", get));
            throw new Error("browser does not support getters");
        },
        defineSetter: function defineSetter(obj, prop, set) {
            if (Object.defineProperty) return Object.defineProperty(obj, prop, util.accessorDescriptor("set", set));
            throw new Error("browser does not support setters");
        },
    }

    var MediaController = java.import('android.widget.MediaController');
	var VideoView = java.import('android.widget.VideoView');
	var MediaPlayer = java.import('android.media.MediaPlayer');
	var Uri = java.import('android.net.Uri');
    var Color = java.import("android.graphics.Color");
    var RelativeLayout = java.import('android.widget.RelativeLayout');
    var RelativeParams = java.import('android.widget.RelativeLayout$LayoutParams');
	var KonyMain = java.import('com.konylabs.android.KonyMain');
	var ImageView = java.import('android.widget.ImageView');
	var View = java.import('android.view.View');
    var appContext =  KonyMain.getAppContext();
    var packageName = appContext.getPackageName();
    var resourcePath = kony.io.FileSystem.getRawDirectoryPath();


    kony.ui.Video = function(bconfig) {
        this.name = "kony.ui.Video";
        this.controls = typeof bconfig.controls == "undefined" ? true : bconfig.controls;
        this.id = bconfig.id;

        var defineGetter = util.defineGetter;
        var defineSetter = util.defineSetter;

        var source = bconfig.source;
        if (source && (source.mp4 || source.rawBytes)) {
            this.sourceURI = this.__getSourceURI(source.mp4 || source.rawBytes);
        }

        defineGetter(this, "source", function() {
            return source;
        });
        defineSetter(this, "source", function(val) {
            if (val && (val.mp4 || val.rawBytes)) {
                source = val;
                this.sourceURI = this.__getSourceURI(val.mp4 || val.rawBytes);
            }
        });

        var controls = typeof bconfig.controls == "undefined" ? true : bconfig.controls;
        defineGetter(this, "controls", function() {
            return controls;
        });
        defineSetter(this, "controls", function(val) {
            controls = typeof val == "undefined" ? true : val;

        });
        var poster = bconfig.poster;
        this.__setImageSource(poster);
        defineGetter(this, "poster", function() {
            return poster;
        });
        defineSetter(this, "poster", function(val) {
            this.__setImageSource(val);
            poster = val;
        });

        var volume = typeof bconfig.volume == "undefined" ? 1.0 : bconfig.volume;
        defineGetter(this, "volume", function() {
            return volume;
        });
        defineSetter(this, "volume", function(val) {
            volume = typeof val == "undefined" ? 1.0 : val;
            if(this.mediaPlayer){
                var volFloat = java.newFloat(volume);
                this.mediaPlayer.setVolume(volFloat,volFloat);
            }
        });

        this.onPrepared = bconfig.onPrepared;
        this.onError = bconfig.onError;
        this.onCompletion = bconfig.onCompletion;

        //THis is closure variable for nativecontainer.
        var video = this;

        var MyPreparedListener = java.newClass('MyPreparedListener' + this.id, 'java.lang.Object', ['android.media.MediaPlayer$OnPreparedListener'], {
            onPrepared: function(mediaPlayer) {
                kony.print("On Prepared Listener called : " + video.id);
                if (mediaPlayer.isPlaying()) {
                    mediaPlayer.stop();
					mediaPlayer.reset();
                    mediaPlayer.release();
                    mediaPlayer = new MediaPlayer();
                }
                video.mediaPlayer = mediaPlayer;
                video.prepared = true;

                mediaPlayer.seekTo(1000);
                var volFloat = java.newFloat(video.volume);
                mediaPlayer.setVolume(volFloat,volFloat);
                mediaPlayer.setLooping(false);
                if(video.imageView){
                    video.imageView.setVisibility(View.GONE);
                }
                if(video.onPrepared){
                    video.onPrepared.call(video,video);
                }

            }
        });
         var MyErrorListener = java.newClass('MyErrorListener' + this.id, 'java.lang.Object', ['android.media.MediaPlayer$OnErrorListener'], {
            onError: function(mediaPlayer, what, extra) {
                //kony.print("Video " +mediaPlayer.getTrackInfo()  +"  load error : " + what + ", extra : " + extra );
				try{
					if(video.onError){
						video.onError.call(video,video,what);
					} 
					//mediaPlayer.stop();
					mediaPlayer.reset();
					//mediaPlayer.release();
					//video.mediaPlayer = undefined;
				}catch(e){
					kony.print("Video onErrorListener error : " + e.message);
				}
                return false;
            }
        });

        var MyCompletionListener = java.newClass('MyCompletionListener' + this.id, 'java.lang.Object', ['android.media.MediaPlayer$OnCompletionListener'], {
            onCompletion: function(mediaPlayer) {
                if(video.onCompletion){
                    video.onCompletion.call(video,video);
                }
                 kony.print(" Video onCompletion end :  " +  video.id );
                return false;
            }
        });
        bconfig["onCreated"] = function() {
            kony.print(" Video onCreated for :  " +  video.id );
            var context = KonyMain.getActivityContext();
            if(!context){
                kony.print(" Native Container Context is null. ");
                return;
            }
            var relParams = new RelativeParams(RelativeParams.FILL_PARENT, RelativeParams.FILL_PARENT);
            relParams.addRule(RelativeLayout.CENTER_IN_PARENT);
            relParams.addRule(RelativeLayout.ALIGN_PARENT_RIGHT);
            relParams.addRule(RelativeLayout.ALIGN_PARENT_LEFT);

            var videoView = new VideoView(context);
            video.videoView = videoView;

            videoView.setOnPreparedListener(new MyPreparedListener());
            videoView.setOnErrorListener(new MyErrorListener());
            videoView.setOnCompletionListener(new MyCompletionListener());

            this.setBackgroundColor(Color.TRANSPARENT);
            this.addView(videoView, relParams);

            try {
                video._updateControls(context);
                video._updateDataSource();
            } catch (e) {
                kony.print("Vidoe view source update error. : " + e.message);
            }

            if(video.poster){
                var imageView = new ImageView(context);
                video.imageView = imageView;
                imageView.setImageResource(video.posterId);
                this.addView(imageView, relParams);
                kony.print("video.poster : " + packageName + "   : " +  video.posterId);
            }
        }

        bconfig["onCleanup"] = function() {
                                   kony.print('Container view cleaned for : ' + video.id);
                                   video.videoView = undefined;
                                   video.mediaPlayer = undefined;
                                   video.imageView = undefined;
                               };
        bconfig["onOrientationChange"] = function(){
            //TODO: orientation change.
        };
        bconfig["type"] = "kony.ui.Video";
        var nativeContainer = new kony.ui.NativeContainer(bconfig);
        this.nativeContainer = nativeContainer;
        this.prepareNCProperties(nativeContainer);
    }

    /*
        Video Types:
                1 -- URL
                2 -- Local Resource.
                3 -- Bytes.
    */
    kony.ui.Video.prototype.__getSourceURI = function(source){ 
		//kony.print("kony.type(source) :::::  " + kony.type(source));
		//kony.print("  Source Instance of kony.types.RawBytes:  " + (source instanceof kony.types.RawBytes));
		/*if(source instanceof kony.types.RawBytes){
			source = source.getResourcePath();
			kony.print("  Resource Path:  " + source);
		}else */
		if (typeof source === "string"){
			if(source.indexOf("http") === 0) {
				source =  source;
				//kony.print(" HTTP Resource Path:  " );
			}else{
			    if (KonyMain.getAppType() == 0){
			        var index = source.indexOf('.'); //index == -1 if the char is not found
                	if(index > 1)
                	    source = source.substring(0, index);//To remove .(dot) and extenstion when specified in source e.g. movie.mp4 -> movie
			    }
				source =  resourcePath + source;
				//kony.print(" NORMAL VIDEO Path:  " );
			}
			
        }else{
			source = source.getResourcePath();
			//kony.print(" KONY RAW BYTES  " );
		} 
        try{
            var path = Uri.parse(source);
            kony.print("  Video Path is :  " + path);
        }catch(e){
            kony.print(" Error while preparing URI :  " + source + " : " + e.message);
        }
        return path;
    }

    kony.ui.Video.prototype.__setImageSource = function(source){
        if(source){
            var index = source.indexOf('.'); //index == -1 if the char is not found
            if(index < 1)
                this.posterSrc = source;
            else
                this.posterSrc = source.substring(0, index);
            this.posterId = appContext.getResources().getIdentifier(this.posterSrc, "drawable", packageName);
        }
    }

    kony.ui.Video.prototype._updateDataSource = function (){
        if(this.videoView){
            try{
                kony.print("Video Source URI:  " + this.sourceURI);
                var videoView = this.videoView;
                var sourceURI = this.sourceURI
                kony.runOnMainThread(function(){
					try{
						videoView.setVideoURI(sourceURI);
					}catch(e){
						kony.print("Can't set Video Source URI:  "+e.message);
					}
                }, [] );

            }catch(e){
                kony.print(" Error while loading video:  " + this.source  + " : " + e.message);
            }
        }
    }
    kony.ui.Video.prototype._updateControls = function (context){
        if (this.videoView) {
            if(this.controls){
                kony.print(" Video with controls.  " +  this.id );
                var mediaControls = new MediaController(context);
                this.videoView.setMediaController(mediaControls);
            }else{
                this.videoView.setMediaController(null);
            }
        }
    }
    kony.ui.Video.prototype.setVisibility = function(visible) {
        this.nativeContainer.setVisibility(visible);
    };
	
	kony.ui.Video.prototype.setEnabled = function(enabled) {
        this.nativeContainer.setEnabled(enabled);
    };

    kony.ui.Video.prototype.setSource = function(source) {
        this.source = source;
        this.prepared = false;
        this.mediaPlayer = undefined;
        this._updateDataSource();
    };

    kony.ui.Video.prototype.play = function() {
        kony.print('Video Start ' );
        var videoView = this.videoView;
        if (videoView) {
            if(this.prepared && !videoView.isPlaying()){
                videoView.start();
            }else if(this.mediaPlayer && !videoView.isPlaying()){
                this.mediaPlayer.prepareAsync();
            }else{
                kony.print("Video is not yet prepared.");
            }
            this.paused = false;
        }
    };

    kony.ui.Video.prototype.pause = function() {
        kony.print('Video pause ');
        var videoView = this.videoView
        if (videoView && videoView.canPause()) {
            videoView.pause();
            this.paused = true;
        }
    };
    kony.ui.Video.prototype.resume = function() {
        kony.print('Video resume ');
         var videoView = this.videoView;
        if (videoView && !videoView.isPlaying() && this.prepared) {
            videoView.start();
            this.paused = false;
        }
    };
    kony.ui.Video.prototype.stop = function() {
        var mediaPlayer = this.mediaPlayer
        if (mediaPlayer && mediaPlayer.isPlaying()) {
             if(mediaPlayer){
                mediaPlayer.stop();
                this.prepared = false;
             }
        }else if(mediaPlayer && this.paused){
           this.seekTo(0);
        }
        kony.print('Video stop ');
    };
    kony.ui.Video.prototype.seekTo = function(seekTime) {
        kony.print('Video seekTo ');
        var videoView = this.videoView
        if (videoView && this.prepared) {
            if((seekTime <= videoView.getCurrentPosition() && videoView.canSeekBackward() )
            || (seekTime > videoView.getCurrentPosition() && videoView.canSeekForward () )){
                kony.runOnMainThread(function(){
                    videoView.seekTo(seekTime);
                }, [] );
            }
        }
    };
    kony.ui.Video.prototype.isPlaying = function() {
        var videoView = this.videoView
        if (videoView) {
            return videoView.isPlaying();
        }
        return false;
    };
    kony.ui.Video.prototype.getCurrentPosition = function() {
        var videoView = this.videoView
        if (videoView) {
            return videoView.getCurrentPosition();
        }
        return 0;
    };
    kony.ui.Video.prototype.getDuration = function() {
        var videoView = this.videoView
        if (videoView  && this.prepared) {
            return videoView.getDuration();
        }
        return 0;
    };
    kony.ui.Video.prototype.getBufferPercentage = function() {
        var videoView = this.videoView
        if (videoView) {
            return videoView.getBufferPercentage();
        }
        return 0;
    };
	
    kony.ui.Video.prototype.getNativeContainer = function() {
        return this.nativeContainer;
    };

    kony.ui.Video.prototype.prepareNCProperties = function(nativeContainer){
        var defineGetter = util.defineGetter;
        var defineSetter = util.defineSetter;

        defineGetter(this, "skin", function() {
            return nativeContainer.skin;
        });
        defineSetter(this, "skin", function(val) {
            nativeContainer.skin = val;
        });

        defineGetter(this, "isVisible", function() {
            return nativeContainer.isVisible;
        });
        defineSetter(this, "isVisible", function(val) {
            nativeContainer.isVisible = val;
        });

        defineGetter(this, "padding", function() {
            return nativeContainer.padding;
        });
        defineSetter(this, "padding", function(val) {
            nativeContainer.padding = val;
        });

        defineGetter(this, "left", function() {
            return nativeContainer.left;
        });
        defineSetter(this, "left", function(val) {
            nativeContainer.left = val;
        });

        defineGetter(this, "right", function() {
            return nativeContainer.right;
        });
        defineSetter(this, "right", function(val) {
            nativeContainer.right = val;
        });

        defineGetter(this, "top", function() {
            return nativeContainer.top;
        });
        defineSetter(this, "top", function(val) {
            nativeContainer.top = val;
        });

        defineGetter(this, "bottom", function() {
            return nativeContainer.bottom;
        });
        defineSetter(this, "bottom", function(val) {
            nativeContainer.bottom = val;
        });

        defineGetter(this, "width", function() {
            return nativeContainer.width;
        });
        defineSetter(this, "width", function(val) {
            nativeContainer.width = val;
        });

        defineGetter(this, "height", function() {
            return nativeContainer.height;
        });
        defineSetter(this, "height", function(val) {
            nativeContainer.height = val;
        });

        defineGetter(this, "minWidth", function() {
            return nativeContainer.minWidth;
        });
        defineSetter(this, "minWidth", function(val) {
            nativeContainer.minWidth = val;
        });

        defineGetter(this, "maxWidth", function() {
            return nativeContainer.maxWidth;
        });
        defineSetter(this, "maxWidth", function(val) {
            nativeContainer.maxWidth = val;
        });

        defineGetter(this, "minHeight", function() {
            return nativeContainer.minHeight;
        });
        defineSetter(this, "minHeight", function(val) {
            nativeContainer.minHeight = val;
        });

        defineGetter(this, "maxHeight", function() {
            return nativeContainer.maxHeight;
        });
        defineSetter(this, "maxHeight", function(val) {
            nativeContainer.maxHeight = val;
        });

        defineGetter(this, "centerX", function() {
            return nativeContainer.centerX;
        });
        defineSetter(this, "centerX", function(val) {
            nativeContainer.centerX = val;
        });

        defineGetter(this, "centerY", function() {
            return nativeContainer.centerY;
        });
        defineSetter(this, "centerY", function(val) {
            nativeContainer.centerY = val;
        });

        defineGetter(this, "zIndex", function() {
            return nativeContainer.zIndex;
        });
        defineSetter(this, "zIndex", function(val) {
            nativeContainer.zIndex = val;
        });
		defineGetter(this, "opacity", function() {
            return nativeContainer.opacity;
        });
        defineSetter(this, "opacity", function(val) {
            nativeContainer.opacity = val;
        });

        defineGetter(this, "parent", function() {
            return nativeContainer.parent;
        }); 
    }

})();
