/******************************************************************************
 *	JAIPHO BETA, version 0.52.00
 *	(c) 2009 jaipho.com
 *
 *	JAIPHO is freely used under the terms of an LGPL license.
 *	For details, see the JAIPHO web site: http://www.jaipho.com/
 ******************************************************************************/
				
function Jph_NaviButton( htmlId)
 {
	this.mHtmlId	=	htmlId;
	this.mhImage;
 }
 
 Jph_NaviButton.prototype.Init		=	function()
 {
	this.mhImage	=	document.getElementById( this.mHtmlId);
 }
 
 Jph_NaviButton.prototype.Hide		=	function()
 {
 	this.mhImage.style.display	=	'none';
 }
 Jph_NaviButton.prototype.Show		=	function()
 {
 	this.mhImage.style.display	=	'block';
 }
 Jph_NaviButton.prototype.Disable	=	function()
 {
 	this.mhImage.style.opacity	=	'0.30';
 }
 Jph_NaviButton.prototype.Enable	=	function()
 {
 	this.mhImage.style.opacity	=	'1.00';
 }