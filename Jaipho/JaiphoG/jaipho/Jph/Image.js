/******************************************************************************
 *	JAIPHO BETA, version 0.52.00
 *	(c) 2009 jaipho.com
 *
 *	JAIPHO is freely used under the terms of an LGPL license.
 *	For details, see the JAIPHO web site: http://www.jaipho.com/
 ******************************************************************************/
				
function Jph_Image( index, src, thumbSrc, title, desc)
 {
 	if (title==undefined)
		title =	'';
 	if (desc==undefined)
		desc =	'';
			
 	this.mIndex		=	index;
 	this.mSrcThumb	=	thumbSrc;
	this.mSrc		=	src;
	this.mTitle		=	title;	
	this.mDesc		=	desc;	
	
 }
 
 
 Jph_Image.prototype.HasText		=	function()
 {
 	if (this.mTitle == '' && this.mDesc == '')
		return false;
	return true;
 }