/******************************************************************************
 *	JAIPHO BETA, version 0.52.00
 *	(c) 2009 jaipho.com
 *
 *	JAIPHO is freely used under the terms of an LGPL license.
 *	For details, see the JAIPHO web site: http://www.jaipho.com/
 ******************************************************************************/


function JphSlider_Slider( app)
 {
 	this.mrApp				=	app;
	
 	this.mhSliderTable		=	null;
 	this.mhSliderDiv		=	null;
	this.mhSliderOverlay	=	null;
	

	this.mrToolbars			=	null;	
	this.mrSliderNavi		=	null;
	this.mrSlideshow		=	null;
	this.mrCompnents		=	null;
	
	this.mCurrent			=	0;
	this.mrCurrentSlide		=	null;
	
	this.mInitialized		=	false;
	
	this.maSlides			=	new Array();
	
	this.mhTopBar			=	null;
	this.mhBottomBar		=	null;
	
	this.mrPreloader		=	null;
	this.mrImageQueue		=	null;	
	this.mrBehavior			=	null;
	
	this.mVisible			=	true;
	this.mReverse			=	false;
	
	this.mLeft				=	0;
 }
 

 JphSlider_Slider.prototype.Create		=	function()
 {
 	debug('slider: Create()');
	
	debug('slider: initializing preloader');
	this.mrPreloader			=	new JphUtil_Preloader( MAX_CONCURENT_LOADING_SLIDE);
	this.mrImageQueue			=	new JphSlider_ImageQueue( SLIDE_MAX_IMAGE_ELEMENS);	
 	
	debug('slider: creaiting slides');
	var last_slide	=	null;
	for (var i in this.mrApp.mrDao.maImages)
	{
		var image 	=	this.mrApp.mrDao.maImages[i];
		var slide	=	new JphSlider_Slide( this.mrPreloader, this.mrImageQueue, image);	
		this.maSlides[image.mIndex]	=	slide;
		
		if (last_slide != null)
		{
			last_slide.mrNext 	= 	slide;
			slide.mrPrevious	=	last_slide;	
		}
		
		last_slide	=	slide;
	} 	
	
	this.mhSliderOverlay	=	document.getElementById('slider-overlay');
	this.mhSliderDiv		=	document.getElementById('slider-container');
	
	this.mrSlideshow		=	new JphSlider_SlideShow( this);
	this.mrSliderNavi		=	new JphSlider_SliderControls( this);
	this.mrBehavior			=	new JphSlider_Behavior( this);
	this.mrBehavior.Init();
 }
 
 
 JphSlider_Slider.prototype.Init		=	function()
 {
 	debug('slider: Init()');
	
	this.mhTopBar				=	document.getElementById('slider-toolbar-top');
	this.mhBottomBar			=	document.getElementById('slider-toolbar-bottom');

	this.mrDescription			=	new JphSlider_Description( this.mrApp);
	this.mrDescription.Init();
	
	this.mrToolbars				=	new JphSlider_ToolbarsManager();
	this.mrToolbars.Show();
	
	
	this.mhSliderDiv.innerHTML	=	this._HtmlSlider();
	
	this.mhSliderTable			=	document.getElementById('slider-table');
	//this.mhSliderTable.style.webkitTransitionProperty	=	'margin-left';
	//this.mhSliderTable.style.webkitTransitionDuration	=	SLIDE_SCROLL_DURATION;
	
	//this.mhSliderTable.style.WebkitTransition="-webkit-transform 0.5s ease";
	//this.mhSliderTable.style.WebkitTransition="-webkit-transform 0.5s ease, left 0.5s ease";
	
	this.mhSliderTable.style.width	=	this._GetTotalWidth()+'px';
	
 	this.mrToolbars.Register( this.mhSliderOverlay);
	
	this.mrSliderNavi.Init();
	
	debug('slider: initializing slides');
	for (var i in this.maSlides) 
	{
		this.maSlides[i].Init();
	}
	
	this.mrCurrentSlide		=	this.maSlides[this.mCurrent];	
	
	this.mrCompnents		=	new JphSlider_ComponentVisibility( this);
	
	// TODO: refactor
	var top_tool_touch		= 	new JphUtil_Touches( this.mhTopBar, false);
	top_tool_touch.AttachListener( 'TouchEnd', this.mrBehavior, 'ToolbarTouched');
	top_tool_touch.Init();
	
	var bottom_tool_touch	= 	new JphUtil_Touches( this.mhBottomBar, false);
	bottom_tool_touch.AttachListener( 'TouchEnd', this.mrBehavior, 'ToolbarTouched');
	bottom_tool_touch.Init();
	
	var slider_mover		= 	new JphUtil_Touches( this.mhSliderDiv, true);
	slider_mover.AttachListener( 'TouchEnd', this.mrBehavior, 'SlideTouched');
	slider_mover.AttachListener( 'MovedLeft', this.mrBehavior, 'SlideDraggedLeft');
	slider_mover.AttachListener( 'MovedRight', this.mrBehavior, 'SlideDraggedRight');
	slider_mover.AttachListener( 'Moving', this.mrBehavior, 'SlideDragging');
	slider_mover.AttachListener( 'MoveCancel', this, 'RepaintPosition');
	slider_mover.Init();

	var desc_mover			= 	new JphUtil_Touches( this.mrDescription.mhDescContainer, true);
	desc_mover.AttachListener( 'TouchEnd', this.mrBehavior, 'SlideTouched');	
	desc_mover.AttachListener( 'MovedLeft', this.mrBehavior, 'SlideDraggedLeft');
	desc_mover.AttachListener( 'MovedRight', this.mrBehavior, 'SlideDraggedRight');
	desc_mover.AttachListener( 'Moving', this.mrBehavior, 'SlideDragging');
	desc_mover.AttachListener( 'MoveCancel', this, 'RepaintPosition');
	desc_mover.Init();

	var text_mover			= 	new JphUtil_Touches( this.mrDescription.mhDescTitle, true);
	text_mover.AttachListener( 'TouchEnd', this.mrBehavior, 'DescriptionTouched');	
	text_mover.Init();
	
	var title_mover			= 	new JphUtil_Touches( this.mrDescription.mhDescText, true);
	title_mover.AttachListener( 'TouchEnd', this.mrBehavior, 'DescriptionTouched');	
	title_mover.Init();

	this.mInitialized		=	true;

	debug('slider: Init() - End');
 }


 JphSlider_Slider.prototype._HtmlSlider		=	function()
 {
 	debug('slider: Html()');
 	
 	var str		=	new Array();
	var cnt		=	0;
			
	str[cnt++]	=	'<table id="slider-table" cellspacing="0" cellpadding="0">';
	str[cnt++]	=	'<tr>';
	for (var i in this.maSlides)
	{
		str[cnt++]	=	this.maSlides[i].HtmlSlide();
	} 	
	str[cnt++]	=	'</tr>';
	str[cnt++]	=	'</table>';
	
	return str.join('');
 };
 
 
 /*******************************************/
 /*			SLIDER - NAVIGATION				*/
 /*******************************************/  
 
 // ACTINS
 JphSlider_Slider.prototype.Hide			=	function()
 {
 	debug('slider: Hide()');
	if (!this.mInitialized)
		this.Init();
		
	this.mhSliderDiv.style.display			=	'none';
	this.mhSliderOverlay.style.display		=	'none';
	this.mhSliderTable.style.display		=	'none';
	this.mVisible							=	false;
		
	this.mrDescription.Hide();
	debug('slider: Hide() - End');
 }
 
 JphSlider_Slider.prototype.Show			=	function()
 {
 	debug('slider: Show()');
	if (!this.mInitialized)
		this.Init();
	
	document.body.className					=	'slider';
		
	this.mhSliderDiv.style.display			=	'block';
	this.mhSliderOverlay.style.display		=	'block';
	this.mhSliderTable.style.display		=	'block';
	this.mVisible							=	true;
	
	this.mrCompnents.Show();
	this.mrApp.NormalizeVertical();
	this.SelectSlide( this.mCurrent);
	debug('slider: Show() - End');
 }
 
 JphSlider_Slider.prototype.Previous		=	function()
 {
 	debug('slider: Previous()');
 	if (this.IsFirst())
	{
		this.mrToolbars.Show();
		return ;
	}
	
	this.mReverse	=	true;
	this.SelectSlide( this.mCurrent - 1);
 }
 
 JphSlider_Slider.prototype.Next			=	function()
 {
 	debug('slider: Next()');
 	if (this.IsLast())
	{
		this.mrToolbars.Show();
		return ;
	}
	
	this.mReverse	=	false;
	this.SelectSlide( this.mCurrent + 1);
 }

 JphSlider_Slider.prototype.SelectSlide		=	function( index)
 { 	
	debug('slider: SelectSlide() ['+index+']');
	debug('slider: this.mVisible ['+this.mVisible+']');
		
	if (!this.mInitialized)
		this.Init();
		
 	var last_slide			=	this.mrCurrentSlide;
 	this.mrCurrentSlide		=	this.maSlides[index];	
	this.mCurrent			=	index;

	if (!this.mrCurrentSlide)
		throw Error('Slide not found by index ['+index+']');

	this.mrCurrentSlide.SetActive();
	
	if (last_slide)
		last_slide.SetInactive();
	
	this.RepaintPosition();
	
	this.mrDescription.SetDescription( this.mrCurrentSlide.mrImage);
	this.mrCompnents.FirstTimeTextFix();
	
	this._RepaintInfo();
	this.mrSliderNavi.CheckButons();
	
	this.mrApp.mrHistory.SelectSlide( this.mCurrent);
	this.mrApp.NormalizeVertical();
 }
 
 
// INFO
 JphSlider_Slider.prototype.IsLast	=	function()
 {
 	if ((this.mCurrent + 1) == this.mrApp.mrDao.GetImagesCount())
		return true;	
	return false;
 };
 
 JphSlider_Slider.prototype.IsFirst	=	function()
 {
 	if (this.mCurrent == 0)
		return true;	
	return false;
 };
 
 
 // UTIL

 JphSlider_Slider.prototype.RepaintPosition	=	function()
 {
	this.mLeft	=	this._GetPositionLeft( this.mCurrent);
//	this.mhSliderTable.style.marginLeft	=	left + "px";
 	this.mhSliderTable.style.WebkitTransition	=	"-webkit-transform "+SLIDE_SCROLL_DURATION+" ease";
	this.mhSliderTable.style.WebkitTransform	=	"translate3d( "+this.mLeft + "px,0,0)";
	this.mhSliderTable.style.width	=	this._GetTotalWidth()+'px';
 };
 
 JphSlider_Slider.prototype.MovePosition	=	function( move)
 {
	 var left	=	this.mLeft + move;
	 
	 if (left > MIN_DISTANCE_TO_BE_A_DRAG)
		 return;
	 
	 if (left <  - (this._GetTotalWidth() - this.mrApp.mrOrientation.mWidth + MIN_DISTANCE_TO_BE_A_DRAG))
		 return;	 
	 
	 this.mLeft	=	left;
	 
	 this.mhSliderTable.style.WebkitTransition	=	"";
	 this.mhSliderTable.style.WebkitTransform	=	"translate3d( "+ this.mLeft + 'px'+",0,0)";
 };
 
 JphSlider_Slider.prototype._RepaintInfo		=	function()
 {
 	var count	=	this.mrApp.mrDao.GetImagesCount();
 	var current	=	this.mCurrent + 1;
	this.mrSliderNavi.mhInfo.innerHTML	=	current + ' of ' + count;
 };
 
 JphSlider_Slider.prototype._GetTotalWidth		=	function()
 {
	 var count	=	this.mrApp.mrDao.GetImagesCount();
	 var space	=	SLIDE_SPACE_WIDTH * (count - 1);
	 return count * this.mrApp.mrOrientation.mWidth + space;
 };
 
 JphSlider_Slider.prototype._GetPositionLeft	=	function( index)
 {
	 var width	=	
		 this.mrApp.mrOrientation.mWidth + SLIDE_SPACE_WIDTH;
	 return width * index * -1;
 };
