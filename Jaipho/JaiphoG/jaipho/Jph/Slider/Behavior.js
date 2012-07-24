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

 
 function JphSlider_Behavior( slider)
 {
	this.mrSlider	=	slider;
 }
 
 
 
 JphSlider_Behavior.prototype.Init					=	function()
 {
	this.mrSlider.mrApp.mrOrientation.AttachListener( 'OrientationChanged', this, '_OrientationChanged');
 }
 
 // DRAG
 JphSlider_Behavior.prototype.SlideDraggedLeft		=	function( e)
 {
 	debug('behavior: -------------');
 	debug('behavior: SlideDraggedLeft()');
	
 	if (this.mrSlider.mrSlideshow.IsActive())
	 	this.mrSlider.mrSlideshow.StopSlideshow();
 	this.mrSlider.Next();
 }
 
 JphSlider_Behavior.prototype.SlideDraggedRight		=	function( e)
 {
 	debug('behavior: -------------');
 	debug('behavior: SlideDraggedRight()');
	
 	if (this.mrSlider.mrSlideshow.IsActive())
	 	this.mrSlider.mrSlideshow.StopSlideshow();
		
	this.mrSlider.Previous();
 }
 
 JphSlider_Behavior.prototype.SlideDragging		=	function( e)
 {
	 debug('behavior: -------------');
	 debug('behavior: SlideDragging()');
	 
	 if (this.mrSlider.mrSlideshow.IsActive())
		 this.mrSlider.mrSlideshow.StopSlideshow();
	 
//	 this.mrSlider.SetPosition( e.mScrollX);
	 this.mrSlider.MovePosition( e.mScroll);
 }

 // TOUCH
 JphSlider_Behavior.prototype.SlideTouched			=	function( e)
 {
 	debug('behavior: -------------');
 	debug('behavior: SlideTouched()');
	
	this.mrSlider.mrCompnents.ToggleAll();
 }
  
 JphSlider_Behavior.prototype.DescriptionTouched	=	function( e)
 {
 	debug('behavior: -------------');
 	debug('behavior: DescriptionTouched()');
	this.mrSlider.mrCompnents.Roll();
	if (e.mrEvent)
		e.mrEvent.cancelBubble = true
 }
  
 JphSlider_Behavior.prototype.ToolbarTouched		=	function( e)
 {
 	debug('behavior: -------------');
 	debug('behavior: ToolbarTouched()');
 	this.mrSlider.mrToolbars.Show();
 }

 // BUTTONS
 JphSlider_Behavior.prototype.NextPressed			=	function( e)
 {
 	debug('behavior: -------------');
 	debug('behavior: NextPressed()');
	
 	if (this.mrSlider.mrSlideshow.IsActive())
	 	this.mrSlider.mrSlideshow.StopSlideshow();
		
 	this.mrSlider.Next();
 }
 
 JphSlider_Behavior.prototype.PreviousPressed		=	function( e)
 {
 	debug('behavior: -------------');
 	debug('behavior: PreviousPressed()');	
	
 	if (this.mrSlider.mrSlideshow.IsActive())
	 	this.mrSlider.mrSlideshow.StopSlideshow();
		
 	this.mrSlider.Previous();
 }
 
 JphSlider_Behavior.prototype.PlayPressed			=	function( e)
 {
 	debug('behavior: -------------');
 	debug('behavior: PlayPressed()');
	
	this.mrSlider.mrSlideshow.TogglePlay();
 }
 
 JphSlider_Behavior.prototype.PausePressed			=	function( e)
 {
 	debug('behavior: -------------');
 	debug('behavior: PausePressed()');
	
	this.mrSlider.mrSlideshow.TogglePlay();
 }
 
 // ORIENTATION
 JphSlider_Behavior.prototype._OrientationChanged	=	function( e)
 {
 	debug('behavior: -------------');
	debug('behavior: _OrientationChanged()');
	
	if (this.mrSlider.mVisible)
	{
		this.mrSlider.Hide();
		set_timeout( this.mrSlider, 'Show', '', 100);
	}	
	this.mrSlider.RepaintPosition();

 }