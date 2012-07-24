/******************************************************************************
 *	JAIPHO BETA, version 0.52.00
 *	(c) 2009 jaipho.com
 *
 *	JAIPHO is freely used under the terms of an LGPL license.
 *	For details, see the JAIPHO web site: http://www.jaipho.com/
 ******************************************************************************/
				
function JphSlider_ComponentVisibility( slider)
 {
 	this.mrSlider			=	slider;
	
	// defaults
	this.mTextAllreadyUsed	=	false;
	this.mTextAvailable		=	true;
	this.mTextVisible		=	true;
	this.mToolsVisible		=	true;
 }


 JphSlider_ComponentVisibility.prototype.HideAll = function()
 {
 	debug('components: HideAll()');
	this.mrSlider.mrToolbars.Hide();
	this.mrSlider.mrDescription.Hide();
 }
 
 JphSlider_ComponentVisibility.prototype.Show = function()
 {
 	debug('components: Show()');
	this.mrSlider.mrToolbars.Show();
	this.mrSlider.mrDescription.Show();
 }
  
 JphSlider_ComponentVisibility.prototype.ToggleAll = function()
 {
 	debug('components: ToggleAll()');

 	this._Refresh();
 	
 	debug('components: mToolsVisible = ' + this.mToolsVisible);
 	debug('components: mTextAvailable = ' + this.mTextAvailable);
 	debug('components: mTextVisible = ' + this.mTextVisible);
 	
	if (this.mToolsVisible)
	{
		this.mrSlider.mrToolbars.Hide();
		this.mrSlider.mrDescription.Hide();
		
		if (this.mTextAvailable)
		{
			debug('components: setting text allready used	');
			this.mTextAllreadyUsed	=	true;
		}
	}
	else
	{
		this.mrSlider.mrToolbars.Show();
		
		if (this.mTextAvailable)
		{
			debug('components: showing description');
			this.mrSlider.mrDescription.Show();
		}
	}
 }
  
 JphSlider_ComponentVisibility.prototype.FirstTimeTextFix = function()
 {
 	debug('components: FirstTimeTextFix()');
 	this._Refresh();
	var force_desc	=	!this.mTextAllreadyUsed && this.mTextAvailable;
	
	debug('components: mTextAllreadyUsed = ' + (this.mTextAllreadyUsed  ? 'true' : 'false'));
	debug('components: mTextAvailable = ' + (this.mTextAvailable  ? 'true' : 'false'));
	
	if (force_desc)
		this.mrSlider.mrDescription.Show();
 }
  
 JphSlider_ComponentVisibility.prototype.Roll				=	function()
 {
 	debug('components: Roll()');
	this._Refresh();
	
	if (this.mTextAvailable)
	{
		if (!this.mTextAllreadyUsed)
		{
			this.mrSlider.mrDescription.Show();
		}
		
		if (this.mTextVisible && this.mToolsVisible)
		{
			this.mrSlider.mrToolbars.Hide();
		}
		else if ( this.mTextVisible)
		{
			this.mrSlider.mrDescription.Hide();
		}
		else if ( !this.mTextVisible && !this.mToolsVisible)
		{
			this.mrSlider.mrToolbars.Show();
			this.mrSlider.mrDescription.Show();
		}
		else
		{
			this.mrSlider.mrToolbars.Show();
			this.mrSlider.mrDescription.Show();
		}
		
		this.mTextAllreadyUsed	=	true;
	}
	else
	{
		if (this.mToolsVisible)
		{
			this.mrSlider.mrToolbars.Hide();
		}
		else
		{
			this.mrSlider.mrToolbars.Show();
		}
	}
 }
 
 JphSlider_ComponentVisibility.prototype._Refresh 		= 	function()
 {
 	this.mTextAvailable	=	this.mrSlider.mrCurrentSlide.mrImage.HasText();
	
	if (this.mrSlider.mrToolbars.IsHidden())
		this.mToolsVisible	=	false;
	else
		this.mToolsVisible	=	true;
	
	if (this.mrSlider.mrDescription.IsHidden())
		this.mTextVisible	=	false;
	else
		this.mTextVisible	=	true;
		
	if (!this.mTextAvailable)
	{
		this.mTextVisible		=	true;
	}
 }