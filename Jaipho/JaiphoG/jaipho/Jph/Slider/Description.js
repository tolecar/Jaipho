/******************************************************************************
 *	JAIPHO BETA, version 0.52.00
 *	(c) 2009 jaipho.com
 *
 *	JAIPHO is freely used under the terms of an LGPL license.
 *	For details, see the JAIPHO web site: http://www.jaipho.com/
 ******************************************************************************/
				
function JphSlider_Description( app)
 {
 	this.mrApp				=	app;
	
	this.mhDescContainer	=	null;
	this.mhDescTitle		=	null;
	this.mhDescText			=	null;
	
	this.mHidden			=	false;
 }
 

 JphSlider_Description.prototype.Create		=	function()
 {
 	debug('desc: Create()');
 }
 
 
 JphSlider_Description.prototype.Init		=	function()
 {
 	debug('desc: Init()');
	
	var tmp	=	document.createElement('div');
	tmp.innerHTML			=	this.Html();
//	tmp.style.display		=	'none';
	document.body.appendChild( tmp);
	
	this.mhDescContainer	=	document.getElementById('slider-desc-container');		
	this.mhDescTitle		=	document.getElementById('desc-title');
	this.mhDescText			=	document.getElementById('desc-text');	
 }
 
 JphSlider_Description.prototype.Html = function()
 {
 	var str		=	new Array();
	var cnt		=	0;
	
	str[cnt++]	=	'<table id="slider-desc-container" class="slider-text" border="0" style="display: none;">';
	str[cnt++]	=	'<tr>';
	str[cnt++]	=	'	<td valign="bottom">';
	str[cnt++]	=	'		<div id="desc-title">';
	str[cnt++]	=	'		</div>		';
	str[cnt++]	=	'		<div id="desc-text">';
	str[cnt++]	=	'		</div>';
	str[cnt++]	=	'	</td>';
	str[cnt++]	=	'</tr>';
	str[cnt++]	=	'</table>';
				
	return str.join('');
 } 
 
 JphSlider_Description.prototype._OnTouch		=	function( e)
 {
 	debug('desc: _OnTouch()');
	this.mrApp.mrSlider.mrToolbars.Deactivate();
 }
 
 JphSlider_Description.prototype.IsHidden		=	function()
 {
	return this.mHidden;
 }
 
 JphSlider_Description.prototype.Hide			=	function()
 {
 	debug('desc: Hide()');
	this.mhDescContainer.style.display	=	'none';
	this.mHidden						=	true;
 }
 
 JphSlider_Description.prototype.Show			=	function()
 {
 	debug('desc: Show()');
 	try
 	{
		this.mhDescContainer.style.display	=	'table';
	}
	catch(e)
	{
		this.mhDescContainer.style.display	=	'block';
	}
	this.mHidden						=	false;
 }
 

 JphSlider_Description.prototype.SetDescription		=	function( image)
 {
	this.mhDescTitle.innerHTML	=	image.mTitle;
	this.mhDescText.innerHTML	=	image.mDesc;
 }
 
 JphSlider_Description.prototype.ShowDescription	=	function( title, desc)
 {
	this.SetDescription( title, desc);
	this.Show();
 }