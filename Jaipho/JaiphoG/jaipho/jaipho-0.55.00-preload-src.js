/******************************************************************************
 *	JAIPHO BETA, version 0.55.00 Smoother scroll
 *	(c) 2009,2011 jaipho.com
 *
 *	JAIPHO BETA is freely used under the terms of an LGPL license.
 *	For details, see the JAIPHO web site: http://www.jaipho.com/
 ******************************************************************************/
				
 function JphUtil_Touches( container, prventDefaults)
 {
 	this.mhContainer		=	container;
	this.mPreventDefaults	=	prventDefaults && BLOCK_VERTICAL_SCROLL;
	
	implement_events( this);
 }

 JphUtil_Touches.prototype.Init	=	function()
 {
	if (this._IsTouchable())
	{
	 	attach_method( this.mhContainer, 'ontouchstart', this, '_OnTouchStart');	
	 	attach_method( this.mhContainer, 'ontouchend', this, '_OnTouchEnd');
	 	attach_method( this.mhContainer, 'ontouchmove', this, '_OnTouchMove');
	 	attach_method( this.mhContainer, 'ontouchcancel', this, '_OnTouchCancel');				
	}
	else
	{
		attach_method( this.mhContainer, 'onclick', this, '_OnTouchEnd');
	}

	
	this.mMoving		=	false;
	this.mTouching 		= 	false;
	
	this.mOriginalX		=	null;
	this.mCurrentX		=	null;
	this.mScrollX		=	null;
	
	this.mOriginalY		=	null;
	this.mCurrentY		=	null;
	this.mScrollY		=	null;
	
 }
 
 JphUtil_Touches.prototype._IsTouchable = function()
 {
	try
	{
		document.createEvent('TouchEvent');
	}
	catch (e)
	{
		return false;
	}
	
	return true;
 }
 
  
// EVENT HANDLERS
 JphUtil_Touches.prototype._OnTouchStart		=	function( e)
 {
	
	if (e.touches.length == 1) 
	{
		this.mMoving		=	false;
		this.mTouching 		= 	true;
		var touch 			= 	e.touches[0];
		// If they user tries clicking on a link
		if(touch.target.onclick) 
		{
			touch.target.onclick();
		}
		// The originating X-coord (point where finger first touched the screen)
		this.mOriginalX = touch.pageX;
		this.mCurrentX 	= this.mOriginalX;
		this.mScrollX 	= 0;
		
		this.mOriginalY = touch.pageY;
		this.mCurrentY 	= this.mOriginalY;
		this.mScrollY 	= 0;		
		
		this.FireEvent( 'TouchStart', e);
		
	}
	
 }


 JphUtil_Touches.prototype._OnTouchMove		=	function( e)
 {
	if (this.mPreventDefaults)
		e.preventDefault();

	if (e.touches.length == 1) 
	{
		var touch 		=	e.touches[0];
		this.mCurrentX 	= 	touch.pageX;
		this.mCurrentY 	= 	touch.pageY;
		this.mMoving	=	true;
		this.mTouching	=	false;
		
		var scroll		=	this.mScrollX;
	 	this.mScrollX 	= 	this.mOriginalX - this.mCurrentX;
		this.mScrollY 	= 	this.mOriginalY - this.mCurrentY;	

		scroll			=	scroll - this.mScrollX;
		
		var event	=	new JphUtil_Event( 'Moving', this, e);
		event.mScrollX	=	this.mScrollX;
		event.mScroll	=	scroll;
		
		//debug('move: this.mScrollX['+this.mScrollX+'], scroll['+scroll+']');
		if (scroll)
			this.FireEvent( event);
	}

 }
 
 JphUtil_Touches.prototype._OnTouchEnd			=	function( e)
 {

 	if (this.mMoving) 
	{

		if (this.mOriginalX > this.mCurrentX) 
		{
			this.mScrollX 	= 	this.mOriginalX-this.mCurrentX;
			if (this.mScrollX > MIN_DISTANCE_TO_BE_A_DRAG) 
			{
				this.FireEvent( 'MovedLeft', e);
			}
		} 
		else 
		{
			this.mScrollX 	= 	this.mCurrentX-this.mOriginalX;
			if (this.mScrollX > MIN_DISTANCE_TO_BE_A_DRAG) 
			{
				this.FireEvent( 'MovedRight', e);
			}
		}
		
		if (this.mOriginalY > this.mCurrentY) 
		{
			this.mScrollY 	= 	this.mOriginalY-this.mCurrentY;
			if (this.mScrollY > MIN_DISTANCE_TO_BE_A_DRAG) 
			{
				this.FireEvent( 'MovedUp', e);
			}
		} 
		else 
		{
			this.mScrollY 	= 	this.mCurrentX-this.mOriginalY;
			if (this.mScrollY > MIN_DISTANCE_TO_BE_A_DRAG) 
			{
				this.FireEvent( 'MovedDown', e);
			}
		}
		
		this.FireEvent( 'MoveCancel', e);
	}
	else 
	{
		this.FireEvent('TouchEnd', e);
	}

	this.mMoving		=	false;
 	this.mTouching 		= 	false;		
 }
  
 JphUtil_Touches.prototype._OnTouchCancel		=	function( e)
 {
 	this._OnTouchEnd( e)
 }
				
function JphUtil_PreloaderItem( imageElement, src)
 {
	this.mhImage	=	imageElement;
	this.mSrc		=	src;
 }
 
 
 JphUtil_PreloaderItem.prototype.LoadImage	=	function()
 {
 	this.mhImage.src	=	this.mSrc;
 } 
 
 JphUtil_PreloaderItem.prototype.toString	=	function()
 {
 	return 'JphUtil_PreloaderItem ['+this.mSrc+']['+this.mhImage.getAttribute("src")+']';
 }
				
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
 	
 	if (this.maAllImages[src] != undefined)
 	{
 		img.src	=	src;
 		this._ImageLoaded( src);
 		return;
 	}
 	
	var item				=	new JphUtil_PreloaderItem( img, src);
	this.maAllImages[src]	=	item;
	
	if (this.mActiveCount < this.mMaxActiveCount)
	{
		this._LoadItem( item);
	}
	else
	{
		this.maQueue[this.maQueue.length]	=	item;
	}
 }
   
  
 JphUtil_Preloader.prototype._LoadItem	=	function( item)
 {
 	
 	this.mActiveCount++;
	attach_method( item.mhImage, 'onload', this, '_ImageLoaded');
	attach_method( item.mhImage, 'onerror', this, '_ImageError');
	item.LoadImage();
 }
 
 JphUtil_Preloader.prototype._ImageError	=	function( e)
 {
 	if (!e) 
 		var e = window.event;
 	var target	=	e.target ? e.target : e.srcElement;
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
	this.mActiveCount--;
	if (!this.mPaused)
		this._LoadNext();
 }
 
 JphUtil_Preloader.prototype._LoadNext	=	function()
 {

	if (this.maQueue.length)
	{
		this._LoadItem( this.maQueue.shift());
	}
 }
 
 JphUtil_Preloader.prototype.toString	=	function()
 {
 	return '[JphUtil_Preloader [queue length='+this.maQueue.length+'][active count='+this.mActiveCount+']]';
 }
				
var ORIENTATIN_MODE_PORTRAIT		=	'portrait';
 var ORIENTATIN_MODE_LANDSCAPE		=	'landscape';
 var ORIENTATIN_MODE_HTML_ATTRIBUTE	=	'orient';

 function JphUtil_OrientationManager( portWidth, landWidth)
 {
 	this.maListeners	=	new Array();
	
	this.mMode			=	null;
	this.mWidth			=	0;
	
	this._mPortWidth	=	portWidth;
	this._mLandWidth	=	landWidth;
	
	implement_events( this);
	
	this.mIsLocked		=	false;
	this.mLockedWidth;
 }
 
 JphUtil_OrientationManager.prototype.LockWidthAt = function( width)
 {
 	this.mIsLocked		=	true;
	this.mLockedWidth	=	width;
 }
 

 JphUtil_OrientationManager.prototype.Init = function()
 {
 	this._CheckOrientation();	
 	set_interval(this, '_CheckOrientation', '', CHECK_ORIENTATION_INTERVAL)
 }
 
 // INTERVAL
 JphUtil_OrientationManager.prototype._CheckOrientation	=	function()
 {
 //	 	
	var last_mode	=	this.mMode;
	var width		=	this._GetWidth();
	
    if (width != this.mWidth)
    {
        this.mMode = (width == this._mPortWidth ? ORIENTATIN_MODE_PORTRAIT : ORIENTATIN_MODE_LANDSCAPE);
		
		if (this.IsPortrait())
		{
			this.mWidth =	this._mPortWidth;
		}
		else
		{
			this.mWidth =	this._mLandWidth;
		}
    }
	
	if (last_mode != this.mMode)
	{
        document.body.setAttribute( ORIENTATIN_MODE_HTML_ATTRIBUTE, this.mMode);
    	
		this.FireEvent( 'OrientationChanged');
	}
 }
 
 JphUtil_OrientationManager.prototype._GetWidth	=	function()
 {
 	if (window.innerWidth)
 		return this.mIsLocked ? this.mLockedWidth : window.innerWidth;
 	return this.mIsLocked ? this.mLockedWidth : document.documentElement.clientWidth;
 }
 
 // ACCESSORS
 JphUtil_OrientationManager.prototype.IsPortrait	=	function()
 {
 	if (this.mMode == ORIENTATIN_MODE_PORTRAIT)
		return true;
 }
				
function JphUtil_Event( name, source, e)
 {
	this.mName	=	name;
 	this.mrSource	=	source;
 	this.mrEvent	=	e;
 }
 
 function implement_events( obj)
 {
	obj.maListeners		=	new Array();
	
	obj.AttachListener	=	function( name, o, method, argument)
	{
		if (o == null || o == undefined)
			throw new Error('Empty object passed');
			
		var arr					= 	this.maListeners[name] || (this.maListeners[name] = []);
		var index				=	arr.length;
		arr[index]				=	new Array();
		arr[index]['master']	=	o;
		arr[index]['method']	=	method;
		arr[index]['argument']	=	argument;
	}
	
	obj.FireEvent			=	function( name, originalEvent)
	{
		if (typeof name == 'string') {
			var e		=	new JphUtil_Event( name, obj, originalEvent);
		} else {
			var e		=	name;
		}
		
		name		=	e.mName;
		
		var arr		= 	this.maListeners[name] || (this.maListeners[name] = []);
		
		
		for (var i in arr)
		{
			var master		=	arr[i]['master'];
			var method		=	arr[i]['method'];
			var argument	=	arr[i]['argument'];

			var ret = master[method](e, argument);
			
			if (ret == undefined)
				ret = null;

			if (ret)
				return;
		}
	}
 }
				
function debug( str) 
 {
	if (!window.DEBUG_MODE)
		return;

	try
	{
		JphUtil_Console.GetInstance().Debug( str);
	}
	catch (err)
	{
		throw new Error( 'Failed to debug :: ' + err.message + ' :: [' + debug.caller);
	}
 }
  
 function JphUtil_Console( modules)
 {
 	this.mrInstance	=	null;
	if (modules)
		this.maModules	=	modules.split(',');
	else
		this.maModules	=	new Array();
 }

 // STATIC
 JphUtil_Console.CreateConsole = function( modules)
 {
	this.mrInstance = new JphUtil_Console( modules);
	this.mrInstance.Init();
 	return this.mrInstance;
 }
 
 JphUtil_Console.GetInstance = function()
 {
 	if (this.mrInstance == null)
		throw new Error('Console not started');
 	return this.mrInstance;
 }
 // STATIC - END
 
 JphUtil_Console.prototype.Init = function()
 {
 	document.write( this._GetStyleHtml());
 }
 
 JphUtil_Console.prototype._GetStyleHtml = function()
 {
	var str			=	new Array();
	str[str.length]	=	'<style>';
	str[str.length]	=	'.console';
	str[str.length]	=	'{';
	str[str.length]	=	'overflow:auto;';
	str[str.length]	=	'border: 2px solid orange;';
	str[str.length]	=	'position: absolute;';
	str[str.length]	=	'left:10px;';
	str[str.length]	=	'background: black;';
	str[str.length]	=	'opacity: 0.70;';
	str[str.length]	=	'font-size: 10px !important;';
	str[str.length]	=	'font-weight: bold;';
	str[str.length]	=	'color: white;';
	str[str.length]	=	'z-index:100;';
	str[str.length]	=	'}';
	str[str.length]	=	'#console';
	str[str.length]	=	'{';
	str[str.length]	=	'width: 300px;';
	str[str.length]	=	'height: 200px;';
	str[str.length]	=	'top:140px;';
	str[str.length]	=	'}';
	str[str.length]	=	'body[orient="landscape"] #console';
	str[str.length]	=	'{';
	str[str.length]	=	'width: 460px;';
	str[str.length]	=	'top: 100px;';
	str[str.length]	=	'height: 100px;';
	str[str.length]	=	'}';
	str[str.length]	=	'</style>';
	
	return str.join('');
 }
 

 JphUtil_Console.prototype.Debug = function( str)
 {
	if (!this._ShouldDebug( str))
		return;
		
	try
	{
		if (navigator.userAgent.indexOf('iPhone') != -1)
			throw new Error('iPhone console is unuable in this case');
		
		var d 	= 	new Date();	
		str		=	d / 1000 + ': ' + str;
		console.log.apply( console, arguments);
	}
	catch(err)
	{
	    var d		=	document.createElement('div');
		d.innerHTML	=	str;
		var c		=	this._GetContainer();
		c.appendChild( d);
		c.scrollTop	=	c.scrollHeight - c.clientHeight;	
	}

 }
  
 JphUtil_Console.prototype._ShouldDebug = function( str)
 {
 	for (var i in this.maModules)
		if (str.indexOf( this.maModules[i] + ':') == 0)
			return true;
 }
 

 JphUtil_Console.prototype._GetContainer = function()
 {
 	var c	=	document.getElementById('console');
 	if (!c)
	{
		c			=	document.createElement('div');
		c.id		=	'console';
		c.className	=	'console';
		
		document.body.appendChild( c);
	}
 	return c;
 }
				
function get_html_attribute( name, value)
 {
	var str			=	new Array();
	str[str.length]	=	' ';
	str[str.length]	=	name;
	str[str.length]	=	'="';
	str[str.length]	=	value;
	str[str.length]	=	'"';
	return str.join('');
 }
 
function set_timeout( obj, method, argsString, timeout)
{
	var id		=	setTimeout(				
		function() 								
		{										
			obj[method]( argsString);
		}, 										
		timeout);								
	return id;
} 

function set_interval( obj, method, argsString, timeout)
{
	var id		=	setInterval(
		function() 					
		{							
			obj[method]( argsString);
		}, 									
		timeout);							
	return id;
} 

function attach_method( master, eventName, obj, method)
{
	if (master == null || master == undefined)
		throw new Error('Empty master object passed ['+eventName+']['+obj+']['+method+']');
		
	master[eventName] = 					
		function( event) 						
		{										
			obj[method]( event);				
		};										
}