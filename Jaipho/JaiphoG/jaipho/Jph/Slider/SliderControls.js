/******************************************************************************
 *	JAIPHO BETA, version 0.52.00
 *	(c) 2009 jaipho.com
 *
 *	JAIPHO is freely used under the terms of an LGPL license.
 *	For details, see the JAIPHO web site: http://www.jaipho.com/
 ******************************************************************************/
				
function JphSlider_SliderControls( slider)
 {
 	this.mrSlider	=	slider;
	
 	this.mhInfo;
	
 	this.mrPrev;
	this.mrPlay;
	this.mrPause;
	this.mrNext;
 }
 
 JphSlider_SliderControls.prototype.Init		=	function()
 {
 	this.mhInfo		=	document.getElementById('navi-info');

	this.mrPrev		=	new Jph_NaviButton( 'navi-prev');
	this.mrPrev.Init();
	var mover		= 	new JphUtil_Touches( this.mrPrev.mhImage, false);
	mover.AttachListener( 'TouchEnd', this.mrSlider.mrBehavior, 'PreviousPressed');	
	mover.Init();

	
	this.mrPlay		=	new Jph_NaviButton( 'navi-play');
	this.mrPlay.Init();
	var mover		= 	new JphUtil_Touches( this.mrPlay.mhImage, false);
	mover.AttachListener( 'TouchEnd', this.mrSlider.mrBehavior, 'PlayPressed');	
	mover.Init();
	
	
	this.mrPause	=	new Jph_NaviButton( 'navi-pause');
	this.mrPause.Init();
	var mover		= 	new JphUtil_Touches( this.mrPause.mhImage, false);
	mover.AttachListener( 'TouchEnd', this.mrSlider.mrBehavior, 'PausePressed');	
	mover.Init();
	
		
	this.mrNext		=	new Jph_NaviButton( 'navi-next');
	this.mrNext.Init();
	var mover		= 	new JphUtil_Touches( this.mrNext.mhImage, false);
	mover.AttachListener( 'TouchEnd', this.mrSlider.mrBehavior, 'NextPressed');	
	mover.Init();
		
 }
 
 JphSlider_SliderControls.prototype.CheckButons = function()
 {
 	debug('slider-controls: CheckButons()');
 	debug('slider-controls: is slideshow active ' + this.mrSlider.mrSlideshow.IsActive());
	
	if (this.mrSlider.mrSlideshow.IsActive())
	{
		this.mrPlay.Hide();
		this.mrPause.Show();
	}
	else
	{
		this.mrPlay.Show();
		this.mrPause.Hide();
	}
	
	if (this.mrSlider.IsFirst())
		this.mrPrev.Disable();
	else
		this.mrPrev.Enable();

	if (this.mrSlider.IsLast())
		this.mrNext.Disable();
	else
		this.mrNext.Enable();
 }

// EVENT HANDLER
 JphSlider_SliderControls.prototype.OnSlideChanged = function( e)
 {
	this.CheckButons();
 }