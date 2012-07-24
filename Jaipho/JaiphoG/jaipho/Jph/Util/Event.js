/******************************************************************************
 *	JAIPHO BETA, version 0.52.00
 *	(c) 2009 jaipho.com
 *
 *	JAIPHO is freely used under the terms of an LGPL license.
 *	For details, see the JAIPHO web site: http://www.jaipho.com/
 ******************************************************************************/
				
function JphUtil_Event( name, source, e)
 {
	this.mName	=	name;
 	this.mrSource	=	source;
 	this.mrEvent	=	e;
 }
 
 function implement_events( obj)
 {
	obj.maListeners		=	new Array();
	
	obj.AttachListener	=	function( name, o, method, argument)
	{
		if (o == null || o == undefined)
			throw new Error('Empty object passed');
			
		debug( 'events: AttachListener() ' + name + ' ' + typeof( o) + ' ' + method);
		var arr					= 	this.maListeners[name] || (this.maListeners[name] = []);
		var index				=	arr.length;
		arr[index]				=	new Array();
		arr[index]['master']	=	o;
		arr[index]['method']	=	method;
		arr[index]['argument']	=	argument;
	}
	
	obj.FireEvent			=	function( name, originalEvent)
	{
		if (typeof name == 'string') {
			var e		=	new JphUtil_Event( name, obj, originalEvent);
		} else {
			var e		=	name;
		}
		
		name		=	e.mName;
		
		var arr		= 	this.maListeners[name] || (this.maListeners[name] = []);
		
		debug('events: Fire'+name + ' - ' + arr.length + ' listeners');
		
		for (var i in arr)
		{
			var master		=	arr[i]['master'];
			var method		=	arr[i]['method'];
			var argument	=	arr[i]['argument'];

			var ret = master[method](e, argument);
			
			if (ret == undefined)
				ret = null;

			if (ret)
				return;
		}
	}
 }