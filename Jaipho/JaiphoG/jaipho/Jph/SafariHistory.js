/******************************************************************************
 *	JAIPHO BETA, version 0.52.00
 *	(c) 2009 jaipho.com
 *
 *	JAIPHO is freely used under the terms of an LGPL license.
 *	For details, see the JAIPHO web site: http://www.jaipho.com/
 ******************************************************************************/
				
function Jph_SafariHistory( app)
{
	this.mrApp	=	app;
	
	this.mStartupMode		=	null;
	this.mMode				=	null;
	this.mIndex				=	0;
	this.mFirtsTimeSlider	=	true;
	
	this.mTrackValue		=	'';
	this.mTrackPattern		=	'/?nats';	
	
	implement_events( this);
}

Jph_SafariHistory.prototype.Init = function(index)
{
	this._CheckLoacation();
	set_interval( this, '_CheckLoacation', '', 500);
}

 Jph_SafariHistory.prototype._CheckLoacation = function()
 {
 	var last_index	=	this.mIndex;	
 	var last_mode	=	this.mMode;	
	
	this._Refresh();

	if (last_index != this.mIndex || last_mode != this.mMode)
	{
		debug('index['+last_index+'] - new ['+this.mIndex+']');
		debug('mode['+last_mode+'] - new ['+this.mMode+']');
	//	this.FireEvent('LocationChanged');
	}
 }	

Jph_SafariHistory.prototype._Refresh = function(index)
{
	var hash = document.location.hash;
	var parts	=	hash.split( this.mTrackPattern);
	if (parts.length > 1)
	{
		this.mTrackValue	=	this.mTrackPattern + parts[1];
		hash				=	parts[0];
	}

	hash = hash.replace('#', '');
	
	if (hash) 
	{
		var args = hash.split('-');
		if (args.length > 1) {
			this.mMode = args[0];
			this.mIndex = parseInt( args[1]);
		}
		else 
		{
			var value = args[0];
			
			if (value == parseInt(value)) 
			{
				this.mMode	=	GALLERY_STARTUP_SLIDER;
				this.mIndex = 	parseInt( value);
			}
			else 
				this.mMode = value;
		}
	}
	else {
		this.mMode = this.mrApp.mDefaultMode;
		this.mIndex = 0;
	}
	
	if (this.mStartupMode == null)
		this.mStartupMode	=	this.mMode;
}
	

Jph_SafariHistory.prototype.SelectSlide	=	function( index)
{
	debug('history: SelectSlide() ['+index+']');
	if (this.mStartupMode == GALLERY_STARTUP_THUMBNAILS &&
	 this.mFirtsTimeSlider)
	 {
	 //	document.location.hash	=	index + this.mTrackValue;
		this.mFirtsTimeSlider	=	false;
		debug('First time on slider');
	 }
	 else
	 {
	 //	document.location.replace( '#' + index + this.mTrackValue);
	 }
	 
	this.mMode 	= 	GALLERY_STARTUP_SLIDER;
	this.mIndex = 	index;
}

Jph_SafariHistory.prototype.SelectThumbnails	=	function()
{
	this.mMode 	= 	GALLERY_STARTUP_THUMBNAILS;
	this.mIndex = 	0;
	
	// document.location.hash	=	'thumbs' + this.mTrackValue;
}