/******************************************************************************
 *	JAIPHO BETA, version 0.53.00
 *	(c) 2009,2010 jaipho.com
 *
 *	JAIPHO is freely used under the terms of an LGPL license.
 *	For details, see the JAIPHO web site: http://www.jaipho.com/
 ******************************************************************************/
				
var GALLERY_STARTUP_THUMBNAILS	=	'thumbs';
 var GALLERY_STARTUP_SLIDER		=	'slider';
 var GALLERY_STARTUP_SLIDE_SHOW	=	'slideshow';


 function Jph_Application( dao, orientation, splash)
 {
	this.mrDao				=	dao;	
	this.mrOrientation		=	orientation;
	this.mhSplash			=	splash;
	
	this.mrSlider			=	null;
	this.mrThumbnails		=	null;

	this.mrHistory			=	null;
	
	this.mDefaultMode		=	DEFAULT_STARTUP_MODE;
 }
 /*******************************************/
 /*			INIT							*/
 /*******************************************/
 Jph_Application.prototype.Init		=	function()
 {
	this.mrSlider		=	new JphSlider_Slider( this, 0);
	this.mrSlider.Create();

	this.mrThumbnails	=	new JphThumbs_Manager( this);
	this.mrThumbnails.Create();
	
	if (ENABLE_SAFARI_HISTORY_PATCH)
		this.mrHistory		=	new Jph_SafariHistory( this);
	else
		this.mrHistory		=	new Jph_History( this);
		
	this.mrHistory.Init();
	
	this.mrHistory.AttachListener( 'LocationChanged', this, '_OnLocationChanged');
	
 }
 
 Jph_Application.prototype.Run		=	function()
 {
 	debug('--------------------------');
 	debug('app: Run[' + this.mrHistory.mMode + '][' + this.mrHistory.mIndex + ']');
	 	
	if (GALLERY_STARTUP_THUMBNAILS == this.mrHistory.mMode)
	{
		this.ShowThumbsAction();
	}
	else if (GALLERY_STARTUP_SLIDER == this.mrHistory.mMode)
	{	
		this.mrSlider.Init();
		this.mrSlider.mrToolbars.Show();
		this.ShowSliderAction( this.mrHistory.mIndex);
	}
	else if (GALLERY_STARTUP_SLIDE_SHOW == this.mrHistory.mMode)
	{	
		this.mrSlider.Init();
		this.mrSlider.mrToolbars.Show();
		this.StartSlideshw( this.mrHistory.mIndex);
	}
	else
	{
		throw new Error('Invalid mode ['+this.mrHistory.mMode+']');	
	}
 } 

 /*******************************************/
 /*			EVENTS							*/
 /*******************************************/  
 Jph_Application.prototype._OnLocationChanged = function()
 {
 	this.Run();
 }

 /*******************************************/
 /*			ACTIONS							*/
 /*******************************************/
 Jph_Application.prototype.ShowThumbsAction		=	function()
 {
 	debug('app: ShowThumbsAction()');
	this.NormalizeVertical();
		
	this.mrSlider.Hide();
	this.mrSlider.mrSlideshow.StopSlideshow();		
	
	this.mrThumbnails.Show();	
	this.mrHistory.SelectThumbnails();
 }
 
 Jph_Application.prototype.ShowSliderAction		=	function( index)
 { 	
	debug('app: ShowSliderAction( '+this.mrHistory.mIndex+')');
	index	=	parseInt(index);
	
	this.NormalizeVertical();
	this.mrThumbnails.Hide();
	
	this.mrSlider.SelectSlide( index);
	this.mrSlider.Show();
	
 }
 
 Jph_Application.prototype.StartSlideshw		=	function( index)
 { 	
	debug('app: StartSlideshw( '+index+')');
	this.ShowSliderAction( index);
	this.mrSlider.mrSlideshow.TogglePlay();
 }
 
 
 /*******************************************/
 /*			UTIL							*/
 /*******************************************/  
  
 Jph_Application.prototype.NormalizeVertical = function()
 {
 	debug('app: NormalizeVertical()');
	setTimeout('scrollTo(0,1)',100);
 }