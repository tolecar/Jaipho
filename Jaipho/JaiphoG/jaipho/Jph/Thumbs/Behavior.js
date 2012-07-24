/******************************************************************************
 *	JAIPHO BETA, version 0.52.00
 *	(c) 2009 jaipho.com
 *
 *	JAIPHO is freely used under the terms of an LGPL license.
 *	For details, see the JAIPHO web site: http://www.jaipho.com/
 ******************************************************************************/
				
var TOOLS_MODE_ALL_HIDDEN	=	'ALL_HIDDEN';
 var TOOLS_MODE_TOOLBARS_ON	=	'TOOLBARS_ON';
 var TOOLS_MODE_TEXT_ON		=	'TEXT_ON';
 var TOOLS_MODE_BOTH_ON		=	'VISIBLE_ON';

 
 function JphThumbs_Behavior( thumbs)
 {
	this.mrThumbs	=	thumbs;
	
	this.mrLastSelectedThumb	=	null;
 }
 
 
 
 JphThumbs_Behavior.prototype.Init					=	function()
 {
 }

 
 JphThumbs_Behavior.prototype.ThumbTouched		=	function( e, thumbItem)
 {
 	debug('behavior: -------------');
 	debug('behavior: ThumbSelected()');
	
	if (this.mrLastSelectedThumb)
	{
		this.mrLastSelectedThumb.DeselectThumb();
		this.mrLastSelectedThumb	=	null;
	}
	
	
	thumbItem.SelectThumb();
	
	this.mrLastSelectedThumb	=	thumbItem;
 } 
 
 
 JphThumbs_Behavior.prototype.ThumbSelected		=	function( e, thumbItem)
 {
 	debug('behavior: -------------');
 	debug('behavior: ThumbSelected()');
	thumbItem.SelectSlide();
	thumbItem.DeselectThumb();
 }