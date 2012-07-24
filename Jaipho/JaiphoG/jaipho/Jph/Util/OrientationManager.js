/******************************************************************************
 *	JAIPHO BETA, version 0.52.00
 *	(c) 2009 jaipho.com
 *
 *	JAIPHO is freely used under the terms of an LGPL license.
 *	For details, see the JAIPHO web site: http://www.jaipho.com/
 ******************************************************************************/
				
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