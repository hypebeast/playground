/*	Created by Sebastian Ruml on 1/30/12.
 *	Copyright 2012 __MyCompanyName__. All rights reserved.
 */

#include "poObject.h"

class HelloWorldApp : public poObject {
public:
	HelloWorldApp();
	virtual ~HelloWorldApp();
	
    virtual void update();
    
    virtual void draw();
	
    virtual void eventHandler(poEvent *event);
	
    virtual void messageHandler(const std::string &msg, const poDictionary& dict=poDictionary());
};

