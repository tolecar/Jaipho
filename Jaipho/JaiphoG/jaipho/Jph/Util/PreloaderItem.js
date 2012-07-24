/******************************************************************************
 *	JAIPHO BETA, version 0.52.00
 *	(c) 2009 jaipho.com
 *
 *	JAIPHO is freely used under the terms of an LGPL license.
 *	For details, see the JAIPHO web site: http://www.jaipho.com/
 ******************************************************************************/
				
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