/******************************************************************************
 *	JAIPHO BETA, version 0.52.00
 *	(c) 2009 jaipho.com
 *
 *	JAIPHO is freely used under the terms of an LGPL license.
 *	For details, see the JAIPHO web site: http://www.jaipho.com/
 ******************************************************************************/
				
function JphSlider_ToolbarsManager()
 {
	this.mDeactivation	=	null;
	this.maElements		=	new Array();
	this.mIndex			=	0;
	
	this.mHidden		=	true;
 }
 
 JphSlider_ToolbarsManager.prototype.Register	=	function( elem)
 {
 	this.maElements[this.maElements.length]	=	elem;
 }
 
 // ACTIONS
 JphSlider_ToolbarsManager.prototype.Show	=	function()
 {
 	debug('toolbars: Show()');
	this._RemoveDeactivation();
		
 	for (var i in this.maElements)
		this.maElements[i].style.display	=	'block';
		
	this._SetDeactivation();
	
	this.mHidden	=	false;
 }
 
 JphSlider_ToolbarsManager.prototype.Hide	=	function()
 {
 	debug('toolbars: Hide()');
	this._DeactivateToolbars();
 } 
  
 
 JphSlider_ToolbarsManager.prototype.IsHidden		=	function()
 {
	return this.mHidden;
 }  
 
 JphSlider_ToolbarsManager.prototype._DeactivateToolbars	=	function()
 {
 	debug('toolbars: _DeactivateToolbars()');
	this._RemoveDeactivation();
	
 	for (var i in this.maElements)
		this.maElements[i].style.display	=	'none';
		
	this.mHidden	=	true;
 } 
  
 JphSlider_ToolbarsManager.prototype.Toggle	=	function()
 {
 	debug('toolbars: Toggle()');
 	if (this.mHidden) 	
		this.Show();
	else
		this.Hide();
 }
 
 // TIMER
 JphSlider_ToolbarsManager.prototype._SetDeactivation	=	function()
 {
 	this.mDeactivation		=	set_timeout( this, '_DeactivateToolbars', '', TOOLBARS_HIDE_TIMEOUT);	
 }  

 JphSlider_ToolbarsManager.prototype._RemoveDeactivation	=	function()
 {
 	if (this.mDeactivation)
		clearTimeout( this.mDeactivation);
		
	this.mDeactivation	=	null;
 }