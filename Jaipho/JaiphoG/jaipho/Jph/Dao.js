/******************************************************************************
 *	JAIPHO BETA, version 0.52.00
 *	(c) 2009 jaipho.com
 *
 *	JAIPHO is freely used under the terms of an LGPL license.
 *	For details, see the JAIPHO web site: http://www.jaipho.com/
 ******************************************************************************/
				
function Jph_Dao()
 {
 	this.maImages				=	new Array();
 }
 
 Jph_Dao.prototype.AddImage 	= function( img)
 {
 	this.maImages[img.mIndex]	=	img;
 } 
 
 Jph_Dao.prototype.ReadImages	=	function()
{
	var i=0;
	do
	{
		var id			=	arguments[i++];
		var src			=	arguments[i++];
		var src_thumb	=	arguments[i++];
		var title		=	arguments[i++];
		var desc		=	arguments[i++];
		
		this.AddImage( new Jph_Image( id, src, src_thumb, title, desc));	
	}
	while (i<arguments.length) 
}

 Jph_Dao.prototype.ReadImage		=	function( id, src, thumbSrc, title, desc)
{
// function Jph_Image( index, src, thumbSrc, title, desc)	
	
	var obj			=	new Jph_Image();
	obj.mIndex		=	id;
 	obj.mSrcThumb	=	thumbSrc;
	obj.mSrc		=	src;
	obj.mTitle		=	title;	
	obj.mDesc		=	desc;	

	this.AddImage( obj);	
}

 Jph_Dao.prototype.GetImage			=	function( url)
 {
	for (var i in this.maImages)
	{
		var image		=	this.maImages[i];
		if ( image.src == url)
			return image;
	}

	throw new Error('Image [' + url + '] not found');
 }
 Jph_Dao.prototype.GetImagesCount = function()
 {
 	return this.maImages.length;
 }