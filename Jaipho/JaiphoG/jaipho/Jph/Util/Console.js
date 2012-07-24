/******************************************************************************
 *	JAIPHO BETA, version 0.53.00
 *	(c) 2009 jaipho.com
 *
 *	JAIPHO is freely used under the terms of an LGPL license.
 *	For details, see the JAIPHO web site: http://www.jaipho.com/
 ******************************************************************************/
				
function debug( str) 
 {
	if (!window.DEBUG_MODE)
		return;

	try
	{
		JphUtil_Console.GetInstance().Debug( str);
	}
	catch (err)
	{
		throw new Error( 'Failed to debug :: ' + err.message + ' :: [' + debug.caller);
	}
 }
  
 function JphUtil_Console( modules)
 {
 	this.mrInstance	=	null;
	if (modules)
		this.maModules	=	modules.split(',');
	else
		this.maModules	=	new Array();
 }

 // STATIC
 JphUtil_Console.CreateConsole = function( modules)
 {
	this.mrInstance = new JphUtil_Console( modules);
	this.mrInstance.Init();
 	return this.mrInstance;
 }
 
 JphUtil_Console.GetInstance = function()
 {
 	if (this.mrInstance == null)
		throw new Error('Console not started');
 	return this.mrInstance;
 }
 // STATIC - END
 
 JphUtil_Console.prototype.Init = function()
 {
 	document.write( this._GetStyleHtml());
 }
 
 JphUtil_Console.prototype._GetStyleHtml = function()
 {
	var str			=	new Array();
	str[str.length]	=	'<style>';
	str[str.length]	=	'.console';
	str[str.length]	=	'{';
	str[str.length]	=	'overflow:auto;';
	str[str.length]	=	'border: 2px solid orange;';
	str[str.length]	=	'position: absolute;';
	str[str.length]	=	'left:10px;';
	str[str.length]	=	'background: black;';
	str[str.length]	=	'opacity: 0.70;';
	str[str.length]	=	'font-size: 10px !important;';
	str[str.length]	=	'font-weight: bold;';
	str[str.length]	=	'color: white;';
	str[str.length]	=	'z-index:100;';
	str[str.length]	=	'}';
	str[str.length]	=	'#console';
	str[str.length]	=	'{';
	str[str.length]	=	'width: 300px;';
	str[str.length]	=	'height: 200px;';
	str[str.length]	=	'top:140px;';
	str[str.length]	=	'}';
	str[str.length]	=	'body[orient="landscape"] #console';
	str[str.length]	=	'{';
	str[str.length]	=	'width: 460px;';
	str[str.length]	=	'top: 100px;';
	str[str.length]	=	'height: 100px;';
	str[str.length]	=	'}';
	str[str.length]	=	'</style>';
	
	return str.join('');
 }
 

 JphUtil_Console.prototype.Debug = function( str)
 {
	if (!this._ShouldDebug( str))
		return;
		
	try
	{
		if (navigator.userAgent.indexOf('iPhone') != -1)
			throw new Error('iPhone console is unuable in this case');
		
		var d 	= 	new Date();	
		str		=	d / 1000 + ': ' + str;
		console.log.apply( console, arguments);
	}
	catch(err)
	{
	    var d		=	document.createElement('div');
		d.innerHTML	=	str;
		var c		=	this._GetContainer();
		c.appendChild( d);
		c.scrollTop	=	c.scrollHeight - c.clientHeight;	
	}

 }
  
 JphUtil_Console.prototype._ShouldDebug = function( str)
 {
 	for (var i in this.maModules)
		if (str.indexOf( this.maModules[i] + ':') == 0)
			return true;
 }
 

 JphUtil_Console.prototype._GetContainer = function()
 {
 	var c	=	document.getElementById('console');
 	if (!c)
	{
		c			=	document.createElement('div');
		c.id		=	'console';
		c.className	=	'console';
		
		document.body.appendChild( c);
	}
 	return c;
 }