/******************************************************************************
 *	JAIPHO BETA, version 0.52.00
 *	(c) 2009 jaipho.com
 *
 *	JAIPHO is freely used under the terms of an LGPL license.
 *	For details, see the JAIPHO web site: http://www.jaipho.com/
 ******************************************************************************/
				
function JphThumbs_Manager( app)
 {
 	this.mrApp				=	app;
	
 	this.mhThumbnails		=	null;
 	this.mhThumbsTopBar		=	null;
 	this.mhThumbsContainer	=	null;
 	this.mhThumbsCount		=	null;
	
 	this.mrBehavior			=	null;
	this.mrPreloader			=	null;
	
	this.mInitialzed		=	false;
	
	this.maThumbnails		=	new Array();
 }
 
 // INIT
 JphThumbs_Manager.prototype.Create		=	function()
 {
	this.mhThumbsTopBar		=	document.getElementById('thumbs-toolbar-top');
	this.mhThumbnails		=	document.getElementById('thumbs-images-container');
	this.mhThumbsContainer	=	document.getElementById('thumbs-container');
	this.mhThumbsCount		=	document.getElementById('thumbs-count-text');	
	
	this.mrBehavior			=	new JphThumbs_Behavior( this);
	
	for (var i in this.mrApp.mrDao.maImages)
	{
		this.maThumbnails[this.maThumbnails.length]	=	
				new JphThumbs_Item( this.mrApp, this.mrApp.mrDao.maImages[i]);
	} 	
	
	this.mrPreloader				=	new JphUtil_Preloader( MAX_CONCURENT_LOADING_THUMBNAILS);
 }
 
 JphThumbs_Manager.prototype.Init			=	function()
 {
 	this.mrBehavior.Init();
	
 	this.mhThumbnails.innerHTML		=	this._HtmlThumbs();
	this.mhThumbsCount.innerHTML	=	this._HtmlCount();
	
	for (var i in this.maThumbnails)
	{
		this.maThumbnails[i].Init();
		
		var mover	= new JphUtil_Touches( this.maThumbnails[i].mhDiv, false);
		mover.AttachListener( 'TouchStart', this.mrBehavior, 'ThumbTouched', this.maThumbnails[i]);	
		mover.AttachListener( 'TouchEnd', this.mrBehavior, 'ThumbSelected', this.maThumbnails[i]);	
		mover.Init();
	}
	
	this.mInitialized	=	true;
 }

 
 JphThumbs_Manager.prototype._HtmlThumbs	=	function()
 {
 	var str	=	new Array();
	var cnt	=	0;
	
	for (var i in this.maThumbnails)
		str[cnt++]	=	this.maThumbnails[i].Html();
	
	return str.join('');
 }
 
 JphThumbs_Manager.prototype._HtmlCount		=	function()
 {
	var count	=	this.mrApp.mrDao.maImages.length;
	var text	=	count + ' photos';
	if (count == 1)
		text	=	count + ' photo';
			
	return text;
 }

 // ACTIONS
 JphThumbs_Manager.prototype.Show			=	function()
 {
	if (!this.mInitialized)
		this.Init();
		
	this.mhThumbsTopBar.style.display		=	'block';
	this.mhThumbnails.style.display			=	'block';
	this.mhThumbsContainer.style.display	=	'block';
	
	document.body.className	=	'thumbs';
	this.mrPreloader.Play();
 }
 
 
 JphThumbs_Manager.prototype.Hide			=	function()
 {
	this.mhThumbsTopBar.style.display		=	'none';
	this.mhThumbnails.style.display			=	'none';
	this.mhThumbsContainer.style.display	=	'none';
	this.mrPreloader.Pause();
 }