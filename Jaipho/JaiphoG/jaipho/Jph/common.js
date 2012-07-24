/******************************************************************************
 *	JAIPHO BETA, version 0.52.00
 *	(c) 2009 jaipho.com
 *
 *	JAIPHO is freely used under the terms of an LGPL license.
 *	For details, see the JAIPHO web site: http://www.jaipho.com/
 ******************************************************************************/
				
function get_html_attribute( name, value)
 {
	var str			=	new Array();
	str[str.length]	=	' ';
	str[str.length]	=	name;
	str[str.length]	=	'="';
	str[str.length]	=	value;
	str[str.length]	=	'"';
	return str.join('');
 }
 
function set_timeout( obj, method, argsString, timeout)
{
	var id		=	setTimeout(				
		function() 								
		{										
			obj[method]( argsString);
		}, 										
		timeout);								
	return id;
} 

function set_interval( obj, method, argsString, timeout)
{
	var id		=	setInterval(
		function() 					
		{							
			obj[method]( argsString);
		}, 									
		timeout);							
	return id;
} 

function attach_method( master, eventName, obj, method)
{
	if (master == null || master == undefined)
		throw new Error('Empty master object passed ['+eventName+']['+obj+']['+method+']');
		
	master[eventName] = 					
		function( event) 						
		{										
			obj[method]( event);				
		};										
}