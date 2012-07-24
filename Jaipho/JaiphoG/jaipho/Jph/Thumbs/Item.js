/******************************************************************************
 *	JAIPHO BETA, version 0.52.00
 *	(c) 2009 jaipho.com
 *
 *	JAIPHO is freely used under the terms of an LGPL license.
 *	For details, see the JAIPHO web site: http://www.jaipho.com/
 ******************************************************************************/
				
function JphThumbs_Item( app, image)
 {
 	this.mrApp		=	app;
 	this.mrImage	=	image;
	this.mhDiv		=	null;
	this.mhImage	=	null;
 }
 
 JphThumbs_Item.prototype.Init		=	function()
 {
 	this.mhDiv		=	document.getElementById( this.GetHtmlId('thumb_div'));
 	this.mhImage	=	document.getElementById( this.GetHtmlId('thumb_img'));
 	this.mrApp.mrThumbnails.mrPreloader.Load( this.mhImage, this.mrImage.mSrcThumb);
 }

 JphThumbs_Item.prototype.SelectSlide = function()
 {
 	debug('thumb-item: _SelectSlide()');
 	this.mrApp.ShowSliderAction( this.mrImage.mIndex);
 	//this.mrApp.mrSlider.Show();
 }
 JphThumbs_Item.prototype.SelectThumb = function()
 {
 	debug('thumb-item: _SelectThumb()');
 	this.mhDiv.style.opacity	=	'.50';
 }
 JphThumbs_Item.prototype.DeselectThumb = function()
 {
 	debug('thumb-item: _DeselectThumb()');
 	this.mhDiv.style.opacity	=	'1.0';
 }
 
 JphThumbs_Item.prototype.Html				=	function()
 {
 	var str		=	new Array();
	var cnt		=	0;
	
	str[cnt++]	=	'<div class="thumbnail"';
	str[cnt++]	=	get_html_attribute("id", this.GetHtmlId('thumb_div'));
	str[cnt++]	=	'>';
	str[cnt++]	=	'<img';
	str[cnt++]	=	get_html_attribute("id", this.GetHtmlId('thumb_img'));
	str[cnt++]	=	get_html_attribute('title', this.mrImage.mTitle);
	str[cnt++]	=	get_html_attribute('src', BASE_URL + 'dummy.gif');
	str[cnt++]	=	'/>';
	str[cnt++]	=	'</div>';
	
	
	return str.join('');
 }
 
 
 JphThumbs_Item.prototype.GetHtmlId = function( key)
 {
 	return this.mrImage.mIndex + '_' + key;
 }