/******************************************************************************
 *	JAIPHO BETA, version 0.52.00
 *	(c) 2009 jaipho.com
 *
 *	JAIPHO is freely used under the terms of an LGPL license.
 *	For details, see the JAIPHO web site: http://www.jaipho.com/
 ******************************************************************************/
				
function JphSlider_Slide( preloader, queue, image)
 {
 	this.mrPreloader	=	preloader;
 	this.mrImageQueue	=	queue;
 	this.mrImage		=	image;
 	
	this.mActive		=	false;
	this.mrPrevious		=	null;
	this.mrNext			=	null;
	
	this.mhImage		=	null;
	this.mhTd			=	null;
	
	this.maNeighboursDefault	=	new Array();
	this.maNeighboursReverse	=	new Array();
	
	this.mPreloadTimeoutId		=	null;
 }

 JphSlider_Slide.prototype.Init = function()
 {
 	debug('slide: Init() ' + this);
 	this.mhTd			=	document.getElementById( this.GetHtmlId('td'));
 	
 	var indexes			=	SLIDE_PRELOAD_SEQUENCE.split(',');
 	for (var i in indexes)
 	{
 		var distance			=	parseInt( indexes[i]);
 		var sequence_slide		=	this.GetSibling( distance);
 		debug('slide-init: distance: ' + distance + ' sibling next: ' + sequence_slide);
 		if (sequence_slide)
 			this.maNeighboursDefault[this.maNeighboursDefault.length]	=	sequence_slide;
 			
 		var sequence_slide		=	this.GetSibling( -distance);
 		debug('slide-init: distance: ' + distance + ' sibling prev: ' + sequence_slide);
 		if (sequence_slide)
 			this.maNeighboursReverse[this.maNeighboursReverse.length]	=	sequence_slide;
 	}
 	
 	debug('slide: length: default: ' + this.maNeighboursDefault.length + ', reverse: ' + this.maNeighboursReverse.length);
 };
 

 JphSlider_Slide.prototype.HtmlSlide		=	function()
 {
 	var str		=	new Array();
	var cnt		=	0;
	
	str[cnt++]	=	'<td class="slide"';
	str[cnt++]	=	get_html_attribute('id', this.GetHtmlId('td'));
	str[cnt++]	=	'>';
	str[cnt++]	=	'</td>';
	
	if (!this.IsLast() && SLIDE_SPACE_WIDTH > 0)
	{
		str[cnt++]	=	'<td';
		str[cnt++]	=	get_html_attribute('width', SLIDE_SPACE_WIDTH);
		str[cnt++]	=	'>';
		str[cnt++]	=	'</td>';	
	}
				
	return str.join('');
 };
 
 
 JphSlider_Slide.prototype.SetInactive = function()
 {
 	
 }; 
 
 JphSlider_Slide.prototype.SetActive = function()
 {
 	debug('preload2: -----------------------');
 	debug('preload2: ['+this+'] SetActive()');

	this._Load();
	
 	if (this.mPreloadTimeoutId)
 	{
 		debug('preload2: ERROR - _PrepaireNeighbours allready exists');
 		clearTimeout( this.mPreloadTimeoutId);
 		this.mPreloadTimeoutId	=	null;
 	}
 	
	this.mPreloadTimeoutId	=	set_timeout( this, '_PrepaireNeighbours', this.mReverse ? 'true' : '', SLIDE_PRELOAD_TIMEOUT);
 }; 
 
 JphSlider_Slide.prototype._PrepaireNeighbours = function( strReverse)
 {
 	debug('preload2: ['+this+'] _PrepaireNeighbours()');
 	var reverse		=	strReverse == 'true' ? true : false;
 	var slides		=	reverse ? this.maNeighboursReverse : this.maNeighboursDefault;
 	
 	for (var i in slides)
 		slides[i]._Load();
 };
 
 JphSlider_Slide.prototype._Load = function()
 {
 	debug('preload2: ['+this+'] _Load()');
	this.mrPreloader.Load( this._GetImage(), this.mrImage.mSrc);
 }; 
 
 JphSlider_Slide.prototype._GetImage = function()
 {
 	debug('preload2: ['+this+'] _GetImage()');
 	var img		=	this.mhTd.childNodes[0];
 	
 	if (img)
 	{
 		debug('preload2: Image exists.');
 		this.mrImageQueue.RegisterUsage( img); 		
 	}
 	else
 	{
 		debug('preload2: Slide is empty. Fetching and adding image from queue');
		img		=	this.mrImageQueue.GetImage();
		this.mhTd.appendChild( img);
 	}
 	
 	return img;
 };
 
 JphSlider_Slide.prototype.IsLast = function()
 {
	if (this.mrNext == null)
		return true;
 };
 
 JphSlider_Slide.prototype.IsFirst = function()
 {
	if (this.mrPrevious == null)
		return true;
 }; 

 JphSlider_Slide.prototype.GetSibling = function( distance)
 {
	if (distance == 0)
		return this;
	if (this.mrNext && distance > 0)
		return this.mrNext.GetSibling( distance - 1);
	if (this.mrPrevious && distance < 0)
		return this.mrPrevious.GetSibling( distance + 1);		
 }; 

 
 JphSlider_Slide.prototype.GetHtmlId = function( key)
 {
 	return 'slide_' + this.mrImage.mIndex + '_' + key;
 };
 
 JphSlider_Slide.prototype.toString	=	function()
 {
 	return '[JphSlider_Slide ['+this.mrImage.mIndex+']]';
 };