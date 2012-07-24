/******************************************************************************
 *	JAIPHO BETA, version 0.52.00
 *	(c) 2009 jaipho.com
 *
 *	JAIPHO is freely used under the terms of an LGPL license.
 *	For details, see the JAIPHO web site: http://www.jaipho.com/
 ******************************************************************************/
				
function JphUtil_Preloader( maxActiveCount)
 {
 	this.mMaxActiveCount	=	maxActiveCount;
 	
 	this.mActiveCount		=	0;
 	this.mPaused			=	false;
	this.maAllImages		=	[];
	this.maQueue			=	new Array();
 }
 
 JphUtil_Preloader.prototype.Play		=	function()
 {
	this.mPaused			=	false;
	this._LoadNext();
 }
 
 JphUtil_Preloader.prototype.Pause		=	function()
 {
	this.mPaused			=	true;
 }


 JphUtil_Preloader.prototype.Load	=	function( img, src)
 {
 	debug('preload2: ['+this+'] Load() ['+src+']');
 	
 	if (this.maAllImages[src] != undefined)
 	{
 		debug('preload2: Image has been allready loaded. Setting as loaded');
 		img.src	=	src;
 		this._ImageLoaded( src);
 		return;
 	}
 	
	var item				=	new JphUtil_PreloaderItem( img, src);
	this.maAllImages[src]	=	item;
	
	if (this.mActiveCount < this.mMaxActiveCount)
	{
		debug('preload2: Loading now');
		this._LoadItem( item);
	}
	else
	{
		debug('preload2: Adding to load queue');
		this.maQueue[this.maQueue.length]	=	item;
	}
 }
   
  
 JphUtil_Preloader.prototype._LoadItem	=	function( item)
 {
 	debug('preloader: _LoadItem() ['+item+']');
 	
 	this.mActiveCount++;
 	debug('preloader: maQueue size ['+this.maQueue.length+'] this.mActiveCount ['+this.mActiveCount+']');
	attach_method( item.mhImage, 'onload', this, '_ImageLoaded');
	attach_method( item.mhImage, 'onerror', this, '_ImageError');
	item.LoadImage();
 }
 
 JphUtil_Preloader.prototype._ImageError	=	function( e)
 {
 	if (!e) 
 		var e = window.event;
 	var target	=	e.target ? e.target : e.srcElement;
	debug('preloader: _ImageError() ['+target.src+']');	
 	this.mActiveCount--;
 	delete this.maAllImages[target.src];
 	if (!this.mPaused)
 		this._LoadNext();
 }
 
 JphUtil_Preloader.prototype._ImageLoaded	=	function( e)
 {
 	if (typeof(e) == 'string')
 	{
 		var src	=	e;
 	}
 	else
 	{
	 	if (!e) 
	 		var e = window.event;
	 	var target	=	e.target ? e.target : e.srcElement;
	 	var src		=	target.src;
 	}
	debug('preloader: _ImageLoaded() ['+src+']'); 	
	this.mActiveCount--;
	if (!this.mPaused)
		this._LoadNext();
 }
 
 JphUtil_Preloader.prototype._LoadNext	=	function()
 {
	debug('preloader: maQueue size ['+this.maQueue.length+'] this.mActiveCount ['+this.mActiveCount+']');

	if (this.maQueue.length)
	{
		debug('preloader: loading next...');
		this._LoadItem( this.maQueue.shift());
	}
 }
 
 JphUtil_Preloader.prototype.toString	=	function()
 {
 	return '[JphUtil_Preloader [queue length='+this.maQueue.length+'][active count='+this.mActiveCount+']]';
 }