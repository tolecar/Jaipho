/******************************************************************************
 *	JAIPHO BETA, version 0.52.00
 *	(c) 2009 jaipho.com
 *
 *	JAIPHO is freely used under the terms of an LGPL license.
 *	For details, see the JAIPHO web site: http://www.jaipho.com/
 ******************************************************************************/
				
function JphSlider_ImageQueue( queueSize)
 {
 	this.maQueueSize	=	queueSize;
 	this.maLruQueue		=	new Array();
 }
 
 JphSlider_ImageQueue.prototype.GetImage	=	function()
 {
	debug('preload2: ['+this+'] GetImage()');
	
	if (this._IsFull())
	{
		debug('preload2: Reusing another');
		return this._ReuseImage();
	}	
	
	debug('preload2: Creating new');
	return this._CreateImage();
 }
 
 
 JphSlider_ImageQueue.prototype.RegisterUsage	=	function( img)
 {
	debug('preload: queue - REGISTER USAGE()');
	
	var arr	=	new Array();
	
	for (var i in this.maLruQueue)
		if (this.maLruQueue[i] != img)
			arr[arr.length]	=	this.maLruQueue[i];
			
	this.maLruQueue	=	arr;
	this.maLruQueue[this.maLruQueue.length]	=	img;
 }
  
 
 JphSlider_ImageQueue.prototype._ReuseImage	=	function()
 {
 	var img	=	this.maLruQueue.shift();
 	img.parentNode.removeChild( img);
 	this.maLruQueue[this.maLruQueue.length]	=	img;
 	return img;
 }
 
 JphSlider_ImageQueue.prototype._CreateImage	=	function()
 {
 	var img	=	document.createElement('img');
 	this.maLruQueue[this.maLruQueue.length]	=	img;
 	return img; 
 }
 
 JphSlider_ImageQueue.prototype._IsFull	=	function( src)
 {
 	if (this.maLruQueue.length >= this.maQueueSize)
 		return true;
 }

 JphSlider_ImageQueue.prototype.toString	=	function()
 {
 	return 'JphSlider_ImageQueue [length='+this.maLruQueue.length+'][max-size='+this.maQueueSize+']';
 }